import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/category.service';
import { ToastService } from '../../../core/services/toast.service';
import { Category } from '../../../core/models/category.model';
import { CategoryFormModal } from '../category-form-modal/category-form-modal';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-category-list',
  imports: [CategoryFormModal, ConfirmDialog],
  templateUrl: './category-list.html',
  styleUrl: './category-list.css'
})
export class CategoryList implements OnInit {
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService);

  // State signals
  categories = signal<Category[]>([]);
  isLoading = signal(false);

  // Modal state
  isModalOpen = signal(false);
  selectedCategory = signal<Category | null>(null);
  isEditing = computed(() => this.selectedCategory() !== null);

  // Delete confirmation state
  isDeleteDialogOpen = signal(false);
  categoryToDelete = signal<Category | null>(null);

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.isLoading.set(true);
    this.categoryService.getAll().subscribe({
      next: (data) => {
        this.categories.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.toastService.error('Error al cargar categorías');
        this.isLoading.set(false);
      }
    });
  }

  // Métodos para el modal
  openCreateModal() {
    this.selectedCategory.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(category: Category) {
    this.selectedCategory.set(category);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedCategory.set(null);
  }

  onSaveCategory(category: Category) {
    if (this.isEditing() && this.selectedCategory()?.id) {
      this.categoryService.update(this.selectedCategory()!.id!, category).subscribe({
        next: () => {
          this.toastService.success('Categoría actualizada correctamente');
          this.loadCategories();
          this.closeModal();
        },
        error: () => this.toastService.error('Error al actualizar la categoría')
      });
    } else {
      this.categoryService.create(category).subscribe({
        next: () => {
          this.toastService.success('Categoría creada correctamente');
          this.loadCategories();
          this.closeModal();
        },
        error: () => this.toastService.error('Error al crear la categoría')
      });
    }
  }

  // Métodos para eliminar
  openDeleteDialog(category: Category) {
    this.categoryToDelete.set(category);
    this.isDeleteDialogOpen.set(true);
  }

  closeDeleteDialog() {
    this.isDeleteDialogOpen.set(false);
    this.categoryToDelete.set(null);
  }

  confirmDelete() {
    const category = this.categoryToDelete();
    if (category?.id) {
      this.categoryService.delete(category.id).subscribe({
        next: () => {
          this.toastService.success('Categoría eliminada correctamente');
          this.loadCategories();
          this.closeDeleteDialog();
        },
        error: () => this.toastService.error('Error al eliminar la categoría')
      });
    }
  }
}

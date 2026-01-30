import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { ToastService } from '../../../core/services/toast.service';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';
import { ProductFormModal } from '../product-form-modal/product-form-modal';
import { ConfirmDialog } from '../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-product-list',
  imports: [ProductFormModal, ConfirmDialog],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css'
})
export class ProductList implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private toastService = inject(ToastService);

  // State signals
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);
  isLoading = signal(false);

  // Modal state
  isModalOpen = signal(false);
  selectedProduct = signal<Product | null>(null);
  isEditing = computed(() => this.selectedProduct() !== null);

  // Delete confirmation state
  isDeleteDialogOpen = signal(false);
  productToDelete = signal<Product | null>(null);

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
  }

  loadProducts() {
    this.isLoading.set(true);
    this.productService.getAll().subscribe({
      next: (data) => {
        this.products.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.toastService.error('Error al cargar productos');
        this.isLoading.set(false);
      }
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) => this.categories.set(data),
      error: () => this.toastService.error('Error al cargar categorías')
    });
  }

  // Métodos para el modal
  openCreateModal() {
    this.selectedProduct.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(product: Product) {
    this.selectedProduct.set(product);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.selectedProduct.set(null);
  }

  onSaveProduct(product: Product) {
    if (this.isEditing() && this.selectedProduct()?.id) {
      this.productService.update(this.selectedProduct()!.id!, product).subscribe({
        next: () => {
          this.toastService.success('Producto actualizado correctamente');
          this.loadProducts();
          this.closeModal();
        },
        error: () => this.toastService.error('Error al actualizar el producto')
      });
    } else {
      this.productService.create(product).subscribe({
        next: () => {
          this.toastService.success('Producto creado correctamente');
          this.loadProducts();
          this.closeModal();
        },
        error: () => this.toastService.error('Error al crear el producto')
      });
    }
  }

  // Métodos para eliminar
  openDeleteDialog(product: Product) {
    this.productToDelete.set(product);
    this.isDeleteDialogOpen.set(true);
  }

  closeDeleteDialog() {
    this.isDeleteDialogOpen.set(false);
    this.productToDelete.set(null);
  }

  confirmDelete() {
    const product = this.productToDelete();
    if (product?.id) {
      this.productService.delete(product.id).subscribe({
        next: () => {
          this.toastService.success('Producto eliminado correctamente');
          this.loadProducts();
          this.closeDeleteDialog();
        },
        error: () => this.toastService.error('Error al eliminar el producto')
      });
    }
  }

  // Helper para obtener nombre de categoría
  getCategoryName(product: Product): string {
    return product.category?.name ?? 'Sin categoría';
  }
}

import { Component, input, output, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-category-form-modal',
  imports: [FormsModule],
  templateUrl: './category-form-modal.html',
  styleUrl: './category-form-modal.css'
})
export class CategoryFormModal {
  isOpen = input<boolean>(false);
  category = input<Category | null>(null);

  save = output<Category>();
  close = output<void>();

  // Form state
  name = signal('');
  description = signal('');

  isEditing = computed(() => this.category() !== null);
  modalTitle = computed(() => this.isEditing() ? 'Editar Categoría' : 'Nueva Categoría');

  constructor() {
    // Effect para cargar datos cuando se abre el modal en modo edición
    effect(() => {
      const cat = this.category();
      if (cat) {
        this.name.set(cat.name);
        this.description.set(cat.description);
      } else {
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.name.set('');
    this.description.set('');
  }

  onSubmit() {
    const categoryData: Category = {
      name: this.name(),
      description: this.description()
    };

    this.save.emit(categoryData);
  }

  onClose() {
    this.resetForm();
    this.close.emit();
  }
}

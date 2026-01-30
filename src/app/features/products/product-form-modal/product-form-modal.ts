import { Component, input, output, signal, computed, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Product } from '../../../core/models/product.model';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-product-form-modal',
  imports: [FormsModule],
  templateUrl: './product-form-modal.html',
  styleUrl: './product-form-modal.css'
})
export class ProductFormModal {
  isOpen = input<boolean>(false);
  product = input<Product | null>(null);
  categories = input<Category[]>([]);

  save = output<Product>();
  close = output<void>();

  // Form state
  name = signal('');
  price = signal<number>(0);
  stock = signal<number>(0);
  categoryId = signal<number | null>(null);

  isEditing = computed(() => this.product() !== null);
  modalTitle = computed(() => this.isEditing() ? 'Editar Producto' : 'Nuevo Producto');

  constructor() {
    // Effect para cargar datos cuando se abre el modal en modo edición
    effect(() => {
      const prod = this.product();
      if (prod) {
        this.name.set(prod.name);
        this.price.set(prod.price);
        this.stock.set(prod.stock);
        this.categoryId.set(prod.category?.id ?? null);
      } else {
        this.resetForm();
      }
    });
  }

  resetForm() {
    this.name.set('');
    this.price.set(0);
    this.stock.set(0);
    this.categoryId.set(null);
  }

  onSubmit() {
    const selectedCategory = this.categories().find(c => c.id === this.categoryId());

    const productData: Product = {
      name: this.name(),
      price: this.price(),
      stock: this.stock(),
      category: selectedCategory
    };

    this.save.emit(productData);
  }

  onClose() {
    this.resetForm();
    this.close.emit();
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.categoryId.set(value ? Number(value) : null);
  }
}

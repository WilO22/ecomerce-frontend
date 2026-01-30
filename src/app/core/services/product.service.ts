import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private http = inject(HttpClient);
    private apiUrl = `${environment.apiUrl}/products`;

    getAll() {
        return this.http.get<Product[]>(this.apiUrl);
    }

    getById(id: number) {
        return this.http.get<Product>(`${this.apiUrl}/${id}`);
    }

    create(product: Product) {
        return this.http.post<Product>(this.apiUrl, product);
    }

    update(id: number, product: Product) {
        return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
    }

    delete(id: number) {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}

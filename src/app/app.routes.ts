import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/admin-layout/admin-layout').then(m => m.AdminLayout),
        children: [
            { path: '', redirectTo: 'products', pathMatch: 'full' },
            {
                path: 'products',
                loadComponent: () => import('./features/products/product-list/product-list').then(m => m.ProductList)
            },
            {
                path: 'categories',
                loadComponent: () => import('./features/categories/category-list/category-list').then(m => m.CategoryList)
            }
        ]
    }
];

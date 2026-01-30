import { Component, signal, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { Header } from '../../shared/components/header/header';
import { BottomNav } from '../../shared/components/bottom-nav/bottom-nav';
import { Toast } from '../../shared/components/toast/toast';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, Sidebar, Header, BottomNav, Toast],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {
  private router = inject(Router);

  isDrawerOpen = signal(false);

  // Computed para el título dinámico basado en la ruta actual
  get pageTitle(): string {
    const url = this.router.url;
    if (url.includes('categories')) return 'Categorías';
    return 'Gestión de Productos';
  }

  toggleDrawer() {
    this.isDrawerOpen.update(v => !v);
  }
}

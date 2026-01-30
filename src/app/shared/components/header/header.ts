import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  pageTitle = input<string>('Gestión de Productos');

  menuClick = output<void>();

  onMenuClick() {
    this.menuClick.emit();
  }
}

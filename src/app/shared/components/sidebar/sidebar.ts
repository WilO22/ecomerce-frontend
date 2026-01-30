import { Component, output, signal, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  currentView = input<string>('products');
  viewChange = output<string>();

  navigateTo(view: string) {
    this.viewChange.emit(view);
  }
}

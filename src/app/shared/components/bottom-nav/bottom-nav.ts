import { Component, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-bottom-nav',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './bottom-nav.html',
  styleUrl: './bottom-nav.css'
})
export class BottomNav {
  menuClick = output<void>();

  onMenuClick() {
    this.menuClick.emit();
  }
}

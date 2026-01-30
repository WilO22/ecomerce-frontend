import { Component, inject, computed } from '@angular/core';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css'
})
export class Toast {
  private toastService = inject(ToastService);

  toast = this.toastService.toast;

  isVisible = computed(() => this.toast() !== null);

  message = computed(() => this.toast()?.message ?? '');

  type = computed(() => this.toast()?.type ?? 'success');

  iconName = computed(() => {
    switch (this.type()) {
      case 'success': return 'check';
      case 'error': return 'error';
      case 'info': return 'info';
      default: return 'check';
    }
  });

  iconBgClass = computed(() => {
    switch (this.type()) {
      case 'success': return 'bg-green-100 text-green-500';
      case 'error': return 'bg-red-100 text-red-500';
      case 'info': return 'bg-blue-100 text-blue-500';
      default: return 'bg-green-100 text-green-500';
    }
  });
}

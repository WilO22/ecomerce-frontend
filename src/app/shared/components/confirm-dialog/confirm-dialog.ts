import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  imports: [],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css'
})
export class ConfirmDialog {
  isOpen = input<boolean>(false);
  title = input<string>('¿Eliminar elemento?');
  message = input<string>('Esta acción no se puede deshacer. El elemento será eliminado permanentemente del sistema.');

  confirm = output<void>();
  cancel = output<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}

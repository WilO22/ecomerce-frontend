import { Injectable, signal } from '@angular/core';

export interface ToastMessage {
    message: string;
    type: 'success' | 'error' | 'info';
}

@Injectable({ providedIn: 'root' })
export class ToastService {
    private _toast = signal<ToastMessage | null>(null);
    readonly toast = this._toast.asReadonly();

    show(message: string, type: 'success' | 'error' | 'info' = 'success') {
        this._toast.set({ message, type });
        setTimeout(() => this._toast.set(null), 3000);
    }

    success(message: string) {
        this.show(message, 'success');
    }

    error(message: string) {
        this.show(message, 'error');
    }

    info(message: string) {
        this.show(message, 'info');
    }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-message',
  template: `
    <div class="error-message" *ngIf="error">
      <div class="error-icon">⚠️</div>
      <div class="error-text">
        <h4>Error</h4>
        <p>{{ error }}</p>
      </div>
      <button class="retry-btn" (click)="onRetry.emit()" *ngIf="showRetry">
        Retry
      </button>
    </div>
  `,
  styleUrls: ['./error-message.component.scss'],
})
export class ErrorMessageComponent {
  @Input() error: string | null = null;
  @Input() showRetry: boolean = true;

  @Output() onRetry = new EventEmitter<void>();
}

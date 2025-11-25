import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardWidget } from '../../../models/dashboard-widget.interface';

/**
 * Reusable Widget Card Component
 * 
 * Design principles:
 * - Single Responsibility: Only displays widget data
 * - Open/Closed: Extensible through inputs, closed for modification
 * - DRY: Reusable across dashboard
 */
@Component({
  selector: 'app-widget-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './widget-card.component.html',
  styleUrls: ['./widget-card.component.scss']
})
export class WidgetCardComponent {
  @Input({ required: true }) widget!: DashboardWidget;

  /**
   * Formats number with thousand separators
   * Utility method following DRY principle
   */
  formatValue(value: number): string {
    return new Intl.NumberFormat('en-US').format(value);
  }

  /**
   * Formats percentage change
   */
  formatChange(change?: number): string {
    if (change === undefined) {
      return 'N/A';
    }
    const sign = change > 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  }
}

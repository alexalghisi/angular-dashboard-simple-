import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, takeUntil } from 'rxjs';
import { DashboardService } from '../core/services/dashboard.service';
import { DashboardWidget } from '../models/dashboard-widget.interface';
import { WidgetCardComponent } from '../shared/components/widget-card/widget-card.component';

/**
 * Dashboard Component
 * 
 * Architecture decisions:
 * - Standalone component for modern Angular approach
 * - OnDestroy pattern for proper cleanup (memory leak prevention)
 * - Error handling with user-friendly messages
 * - Loading states for better UX
 * 
 * Following SOLID:
 * - Single Responsibility: Manages dashboard view and data loading
 * - Dependency Inversion: Depends on service abstraction
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, WidgetCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  widgets: DashboardWidget[] = [];
  isLoading = true;
  error: string | null = null;
  
  private readonly destroy$ = new Subject<void>();

  constructor(private readonly dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  /**
   * Loads dashboard data with proper error handling
   * Robust error handling as per senior-level requirements
   */
  private loadDashboardData(): void {
    this.isLoading = true;
    this.error = null;

    this.dashboardService.getWidgets()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (widgets: DashboardWidget[]) => {
          this.widgets = widgets;
          this.isLoading = false;
        },
        error: (error: unknown) => {
          console.error('Dashboard loading error:', error);
          this.error = error instanceof Error 
            ? error.message 
            : 'Failed to load dashboard data. Please try again later.';
          this.isLoading = false;
        }
      });
  }

  /**
   * Retry mechanism for failed data loads
   * Improves user experience
   */
  retry(): void {
    this.loadDashboardData();
  }
}

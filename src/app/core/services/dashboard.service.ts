import { Injectable } from '@angular/core';
import { Observable, of, delay, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { DashboardStats, DashboardWidget } from '../../models/dashboard-widget.interface';

/**
 * Dashboard Service
 * 
 * Responsibilities:
 * - Fetch and manage dashboard data
 * - Transform raw data into widget-ready format
 * - Handle errors gracefully
 * - Provide mock data for development
 * 
 * Following SOLID principles:
 * - Single Responsibility: Only handles dashboard data operations
 * - Dependency Inversion: Uses interfaces for data contracts
 */
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private readonly MOCK_DELAY_MS = 500;

  /**
   * Fetches dashboard statistics
   * In production, this would call a real API endpoint
   */
  getDashboardStats(): Observable<DashboardStats> {
    // Simulate API call with delay
    return of(this.generateMockStats()).pipe(
      delay(this.MOCK_DELAY_MS),
      catchError((error: unknown) => {
        console.error('Error fetching dashboard stats:', error);
        return throwError(() => new Error('Failed to load dashboard statistics'));
      })
    );
  }

  /**
   * Transforms dashboard stats into widget format
   * Separation of concerns: Service handles data transformation
   */
  getWidgets(): Observable<DashboardWidget[]> {
    return this.getDashboardStats().pipe(
      map((stats: DashboardStats) => this.transformStatsToWidgets(stats)),
      catchError((error: unknown) => {
        console.error('Error transforming widgets:', error);
        return throwError(() => new Error('Failed to load dashboard widgets'));
      })
    );
  }

  /**
   * Transforms raw stats into widget-ready format
   * DRY principle: Centralized transformation logic
   */
  private transformStatsToWidgets(stats: DashboardStats): DashboardWidget[] {
    return [
      {
        id: 'users',
        title: 'Total Users',
        value: stats.totalUsers,
        change: stats.userGrowth,
        changeType: this.getChangeType(stats.userGrowth),
        icon: '👥',
        color: '#3b82f6'
      },
      {
        id: 'revenue',
        title: 'Total Revenue',
        value: stats.totalRevenue,
        change: stats.revenueGrowth,
        changeType: this.getChangeType(stats.revenueGrowth),
        icon: '💰',
        color: '#10b981'
      },
      {
        id: 'orders',
        title: 'Total Orders',
        value: stats.totalOrders,
        change: stats.orderGrowth,
        changeType: this.getChangeType(stats.orderGrowth),
        icon: '📦',
        color: '#f59e0b'
      },
      {
        id: 'products',
        title: 'Total Products',
        value: stats.totalProducts,
        change: stats.productGrowth,
        changeType: this.getChangeType(stats.productGrowth),
        icon: '🛍️',
        color: '#8b5cf6'
      }
    ];
  }

  /**
   * Determines change type based on percentage
   * Simple, readable logic following KISS principle
   */
  private getChangeType(change?: number): 'increase' | 'decrease' | 'neutral' {
    if (change === undefined || change === 0) {
      return 'neutral';
    }
    return change > 0 ? 'increase' : 'decrease';
  }

  /**
   * Generates mock statistics for development
   * In production, this would be replaced with real API calls
   */
  private generateMockStats(): DashboardStats {
    return {
      totalUsers: 12450,
      totalRevenue: 284750,
      totalOrders: 3420,
      totalProducts: 156,
      userGrowth: 12.5,
      revenueGrowth: 8.3,
      orderGrowth: -2.1,
      productGrowth: 5.7
    };
  }
}

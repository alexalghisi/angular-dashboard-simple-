/**
 * Widget data model for dashboard components
 * Ensures type safety across the application
 */
export interface DashboardWidget {
  id: string;
  title: string;
  value: number;
  change?: number;
  changeType?: 'increase' | 'decrease' | 'neutral';
  icon?: string;
  color?: string;
}

/**
 * Dashboard statistics model
 */
export interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  userGrowth: number;
  revenueGrowth: number;
  orderGrowth: number;
  productGrowth: number;
}

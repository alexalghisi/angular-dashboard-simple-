import { Routes } from '@angular/router';

/**
 * Application Routes
 * Clean routing configuration
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

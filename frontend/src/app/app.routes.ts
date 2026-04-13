import { Routes } from '@angular/router';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/login/login.page').then(m => m.LoginPage)
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadComponent: () => import('./features/home/home.page').then(m => m.HomePage)
  },
  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { 
        path: 'dashboard', 
        loadComponent: () => import('./features/dashboard/dashboard.page').then(m => m.DashboardPage) 
      },
      { 
        path: 'attacks', 
        loadComponent: () => import('./features/attacks/pages/list.page').then(m => m.AttacksListPage) 
      },
      { 
        path: 'attacks/:id', 
        loadComponent: () => import('./features/attacks/pages/details.page').then(m => m.AttackDetailsPage) 
      },
      { 
        path: 'live', 
        loadComponent: () => import('./features/live/live.page').then(m => m.LiveMonitoringPage) 
      },
      { 
        path: 'statistics', 
        loadComponent: () => import('./features/statistics/statistics.page').then(m => m.StatisticsPage) 
      },
      { 
        path: 'settings', 
        loadComponent: () => import('./features/settings/settings.page').then(m => m.SettingsPage) 
      }
    ]
  },
  { 
    path: 'not-found', 
    loadComponent: () => import('./features/not-found/not-found.page').then(m => m.NotFoundPage) 
  },
  { path: '**', redirectTo: 'not-found' }
];

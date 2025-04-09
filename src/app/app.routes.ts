import { Routes } from '@angular/router';
import { privateGuard, publicGuard } from './core/auth.guard';

export const routes: Routes = [
    {        
        path: 'mapa',
        loadComponent: () => import('./home/home.component'),
        loadChildren: () => import('./home/home.routes'),
    },
    {
        canActivateChild: [publicGuard()],
        path: 'auth',
        loadChildren: () => import('./auth/features/auth.routes'),
    }, 
    /*{
        canActivateChild: [privateGuard()],
        path: 'tasks',
        loadComponent: () => import('./task/features/task-list/task-list.component'),
        loadChildren: () => import('./task/features/task.routes'),
    },*/
    {
        canActivateChild: [privateGuard()],
        path: 'dashboard',
        loadComponent: () => import('./shared/ui/layout.component'),
        loadChildren: () => import('./dashboard/features/dashboard.routes'),
    },
    {
        path: '**',
        redirectTo: '',
    }    
];

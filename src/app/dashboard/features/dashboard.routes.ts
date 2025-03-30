import { Routes } from "@angular/router";

export default[
    
    {
        path: 'home', 
        loadComponent: () => import('./dashboard.component'),
    }
    
] as Routes;
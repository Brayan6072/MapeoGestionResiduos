import { Routes } from "@angular/router";
import { Path } from "leaflet";

export default[
    {
        path: '',
        loadComponent: () => import("./dashboard.component")
    },  
    {
        path: "home",
        loadComponent: () => import("../../auth/ui/last-week-reports/last-week-reports.component")
    },
    {
        path: "last-month",
        loadComponent: () => import("../../auth/ui/last-month-reports/last-month-reports.component")
    }
    
    
] as Routes;
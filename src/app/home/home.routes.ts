import { Routes } from "@angular/router";


export default[
    
    {
        path: "index",
        loadComponent: () => import("../auth/ui/mapa/mapa.component")
    },
    {
        path: "reportes",
        loadComponent: () => import("./reportes/reportes.component")
    }
    
    
] as Routes;
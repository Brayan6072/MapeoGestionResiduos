import { Routes } from "@angular/router";


export default[
    
    {
        path: "",
        
        loadComponent: () => import("../auth/ui/mapa/mapa.component")
    },
    {
        path: "reportes/:contenedor",
        loadComponent: () => import("./reportes/reportes.component")
    }
    
    
] as Routes;
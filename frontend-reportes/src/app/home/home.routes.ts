import { Routes } from "@angular/router";


export default[
    
    {
        path: "",
        
        loadComponent: () => import("../auth/ui/home/mapa/mapa.component")
    },
    {
        path: "reportes/:contenedor",
        loadComponent: () => import("./reportes/reportes.component")
    },
    {
        path: "infografias",
        loadComponent: () => import("./infografias/infografias.component")
    },
    {
        path: "about-us",
        loadComponent: () => import("./aboutus/aboutus.component")
    }


] as Routes;
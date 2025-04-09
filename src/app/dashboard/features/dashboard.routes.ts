import { Routes } from "@angular/router";
import { Path } from "leaflet";

export default[
    {
        path: '',
        loadComponent: () => import("./dashboard.component")
    },    
    {
        path: "historico",
        loadComponent: () => import("./historico/historico.component")
    }
    
    
] as Routes;
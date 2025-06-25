import { Component, OnInit, AfterViewInit, inject, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import * as L from 'leaflet';
import { ReportesService } from '../../data-access/reportes.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import ClasificacionesComponent from '../clasificaciones/clasificaciones.component';
import { toast } from 'ngx-sonner';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';



@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ClasificacionesComponent],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export default class MapaComponent implements AfterViewInit{
  private _reporteService = inject(ReportesService);
    private _sanitazer: DomSanitizer = inject(DomSanitizer);
  @ViewChild('bottom-gallery-wrapper', { static: false }) clasificaciones_div!: ElementRef<HTMLDivElement>;
  
  hide: boolean;/*ocultar clasificaciones */

  private map!: L.Map /*mapa */
  private watchId: any; /*ubicacion */
  private markeruser!: L.Marker;
  
  
  clasificacion: any/*almacena y comparte las clasificaciones */
  residuos: any[] = [];/* clasificaciones consumida del api*/
  
  markers: L.Marker[] = [
    L.marker([20.566736996117946, -103.22846090067654])
  ];

  constructor() { 
    this.hide = false;
    
  }
  ngOnDestroy(): void {
    if (this.watchId) {
      navigator.geolocation.clearWatch(this.watchId);
    }
    if (this.map) {
      this.map.remove();
    }
  }

  usericon = L.icon({
    iconUrl: '/Images/icons/map.webp',
    iconSize: [25, 35],
    iconAnchor: [18, 34],
    popupAnchor: [0, -32]
  });
  ngAfterViewInit() {
    this.initMap();
    
  }
  
  locateUser():void{
    if(!navigator.geolocation){
      toast.success("Tu navegador no tiene soporte para obtener tu ubicación");
      return;
    }
    
    if(this.watchId){
      navigator.geolocation.clearWatch(this.watchId);
    }

    this.watchId = navigator.geolocation.watchPosition(
    (position) => {
      const latlng = L.latLng(position.coords.latitude, position.coords.longitude);
      
      if (!this.markeruser) {
        
        this.markeruser = L.marker(latlng, { icon: this.usericon })
          .addTo(this.map)
          .bindPopup("Tu ubicación")
          .openPopup();
        
        this.map.setView(latlng, this.map.getZoom());
      } else {
        this.markeruser.setLatLng(latlng);
        this.map.setView(latlng);
      }
    },
    (error) => {
      toast.error(`Error al obtener ubicación: ${error.message}`);
    },
    {
      enableHighAccuracy: true,
      maximumAge: 10000,
      timeout: 5000
    }
  );

    
  }

  private initMap() {
    const baseMapURl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    this.map = L.map('mapa-del-cut');
    L.tileLayer(baseMapURl,{maxZoom: 25,
      minZoom: 17.5}).addTo(this.map);
    this.map.zoomControl.setPosition('bottomright');

    
    const grupoPapel = L.layerGroup();
    const grupoMetal = L.layerGroup();
    const grupoVidrio = L.layerGroup();
    const grupoPlasticos = L.layerGroup();
    const grupoDificilReciclaje = L.layerGroup();
    const grupoOrganicos = L.layerGroup();

    this.map.zoomControl.remove();
    const customIcon = L.icon({
      iconUrl: '/Images/marker.webp',
      iconSize: [34, 34],
      iconAnchor: [18, 34],
      popupAnchor: [0, -32]
    });

    
    this._reporteService.getUbicaciones().subscribe({
      next: (data: any[]) => {
        const punteros: L.Marker[] = [];
        console.log('Datos obtenidos:', data);

        data.forEach(async (marcador) => {
          
          const puntero = L.marker([marcador[1], marcador[2]], { icon: customIcon });
          punteros.push(puntero);

          const residuos = marcador[4].split(",").map((r: string) => r.trim());

          residuos.forEach((grupo: string) => {
            switch (grupo) {
              case "Papel":
                puntero.addTo(grupoPapel);
                break;
              case "Dificil Reciclaje":
                puntero.addTo(grupoDificilReciclaje);
                break;
              case "Organicos":
                puntero.addTo(grupoOrganicos);
                break;
              case "Plasticos":
                puntero.addTo(grupoPlasticos);
                break;
              case "Vidrio":
                puntero.addTo(grupoVidrio);
                break;
              case "Metal":
                puntero.addTo(grupoMetal);
                break;
            }
          });
          

          puntero.bindPopup(
            `<div class="flex items-start bg-white p-4 rounded-lg">
              <img 
                class="w-[180px] h-[200px] object-cover rounded-lg mr-4 "                 
                src="${this.getSafeUrl(marcador[3])  as string}"
              /> 
              <div class="flex flex-col"> 
                <h3 class="m-0 font-semibold text-[#2c3e50] text-xl">
                  ${marcador[0]}
                </h3>  
                <p class="text-sm mt-2 p-2 bg-[#f8f9fa] rounded border-l-4 border-[#31827C] text-[#666]">
                  Con coordenadas: ${marcador[1]}, ${marcador[2]}
                </p>
                <a href="/mapa/reportes/${marcador[0]}">
                  <button                     
                    class="mt-2 px-4 py-2 bg-[#31827C] text-white border-0 rounded text-sm cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#2a6f69]"
                  >
                    Reportar
                  </button>
                </a>
              </div>
            </div>`
          , { minWidth: 415 }).on('click', () => this.getimg(residuos));
            
        });
        
        
        
        grupoOrganicos.addTo(this.map);
        grupoPapel.addTo(this.map);
        grupoMetal.addTo(this.map);
        grupoVidrio.addTo(this.map);
        grupoPlasticos.addTo(this.map);
        grupoDificilReciclaje.addTo(this.map);

        
        const overlayMaps = {
          "Organicos": grupoOrganicos,
          "Papel": grupoPapel,
          "Metal": grupoMetal,
          "Vidrio": grupoVidrio,
          "Plasticos": grupoPlasticos,
          "Dificil Reciclaje": grupoDificilReciclaje
        };

        L.control.layers(undefined, overlayMaps, { position: 'topleft' }).addTo(this.map);
       
        
        if (punteros.length > 0) {
          const bounds = L.latLngBounds(punteros.map(marker => marker.getLatLng()));
          this.map.fitBounds(bounds);
        } else {
          
          const defaultBounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
          this.map.fitBounds(defaultBounds);
        } 


      },
      error: (err) => {
        console.error('Error:', err);
       
        const defaultBounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
        this.map.fitBounds(defaultBounds);
      }
    });
  }



  getimg(residuos: any[]) {
    this.residuos = residuos;
    this.hide = false;
    return residuos;
  }

  hideclass(){
    this.hide = true;
  }
  
  getSafeUrl(base64Image: string): string {
  if (!base64Image) return '';
  
  if (base64Image.startsWith('data:image')) {
    return base64Image;
  }
  return `data:image/jpeg;base64,${base64Image}`;
}
  

  
}



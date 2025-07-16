import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, inject, Input, Optional, Output, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import L from 'leaflet';
import { ReportesService } from '../../../data-access/reportes.service';
import { toast } from 'ngx-sonner';

@Component({
  selector: 'app-ubicaciones',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './ubicaciones.component.html',
  styleUrl: './ubicaciones.component.css'
})
export default class UbicacionesComponent implements AfterViewInit{
  private _reporteService = inject(ReportesService);    

  private map!: L.Map  
  private marker!: L.Marker;
  @Output() coordsEvent = new EventEmitter<string[]>();
  clasificacion: any
  residuos: any[] = [];

  markers: L.Marker[] = [
    L.marker([20.566736996117946, -103.22846090067654])
  ];
  addmarker = L.icon({ /*puntero para que el usuario seleccione un punto en el mapa*/
      iconUrl: '/Images/icons/map.webp',
      iconSize: [25, 35],
      iconAnchor: [18, 34],
      popupAnchor: [0, -32]
  });

  constructor() { 
    
    
  }


  ngAfterViewInit() {
    this.initMap();
    
  }
  
  private initMap() {
    const baseMapURl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    this.map = L.map('mapa-ubicaciones');
    L.tileLayer(baseMapURl,{maxZoom: 25,
      minZoom: 17.5}).addTo(this.map);
      

    this.map.zoomControl.remove();
    
    
    
    this._reporteService.getUbicaciones().subscribe({
      next: (data: any[]) => {
        const punteros: L.Marker[] = [];        

        data.forEach((marcador) => {
          const customIcon = L.divIcon({
          className: 'custom-div-icon',
          html: `            
            <div>
              <img src="/Images/marker.webp" style="width: 34px; height: 34px;"/>
              <span>${marcador[0]}</span>
            </div>
          `,
          iconUrl: '/Images/marker.webp',
          iconSize: [34, 34],
          iconAnchor: [18, 34],
          popupAnchor: [0, -32]
        });
          
          const puntero = L.marker([marcador[1], marcador[2]], { icon: customIcon });
          punteros.push(puntero);
          puntero.addTo(this.map);

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
          , { minWidth: 415 });
          
        });
      
               
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

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const lat = e.latlng.lat.toFixed(6);
      const lng = e.latlng.lng.toFixed(6);

      if (this.marker) {
        this.marker.setLatLng(e.latlng);
      } else {
        this.marker = L.marker(e.latlng, {icon: this.addmarker}).addTo(this.map);
      }

      this.marker.bindPopup(`Lat: ${lat}<br>Lng: ${lng}`).openPopup(); 
      
      this.coordsEvent.emit([lat, lng]);
      
      
    });



  }
  getSafeUrl(base64Image: string): string {
  if (!base64Image) return '';
  
  if (base64Image.startsWith('data:image')) {
    return base64Image;
  }
  return `data:image/jpeg;base64,${base64Image}`;
}
  

  

}

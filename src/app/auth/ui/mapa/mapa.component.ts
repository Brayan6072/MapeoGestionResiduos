import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import * as L from 'leaflet';
import { ReportesService } from '../../data-access/reportes.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-mapa',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mapa.component.html',
  styleUrl: './mapa.component.css'
})
export default class MapaComponent implements OnInit, AfterViewInit{
  private _reporteService = inject(ReportesService);
  private map!: L.Map
  markers: L.Marker[] = [
    L.marker([20.566736996117946, -103.22846090067654])
  ];

  constructor() { }

  ngOnInit() {
    
    
  }

  ngAfterViewInit() {
    this.initMap();
    
  }
  private initMap() {
    const baseMapURl = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png';
    this.map = L.map('mapa-del-cut');
    L.tileLayer(baseMapURl).addTo(this.map);
    this.map.zoomControl.setPosition('bottomright');

    // Initialize layer groups
    const grupoPapel = L.layerGroup();
    const grupoMetal = L.layerGroup();
    const grupoVidrio = L.layerGroup();
    const grupoPlasticos = L.layerGroup();
    const grupoDificilReciclaje = L.layerGroup();
    const grupoOrganicos = L.layerGroup();

    const customIcon = L.icon({
      iconUrl: '/Images/marker.webp',
      iconSize: [34, 34],
      iconAnchor: [18, 34],
      popupAnchor: [0, -32]
    });

    // Get data from service and process it
    this._reporteService.getUbicaciones().subscribe({
      next: (data: any[]) => {
        const punteros: L.Marker[] = [];
        console.log(data);
        data.forEach((marcador) => {
          
          const puntero = L.marker([marcador[1], marcador[2]], { icon: customIcon });
          punteros.push(puntero);

          const residuos = marcador[3].split(",").map((r: string) => r.trim());

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
            `<img id='imgbt' src='/Images/Botes/Contenedores.webp' onload='getimg(${JSON.stringify(residuos)})';/> 
            <div id='content'>
              <h3 id='etiqueta_contenedor'>${marcador[0]}</h3>  
              <p id='coordenadas_contenedor'>Con coordenadas: ${marcador[1]}, ${marcador[2]}</p>
              <a href='/contenedores/ubicaciones/reporte/${marcador[0]}'>
                <button id='btn-reportar'>Reportar</button>
              </a>
            </div>`
          , {className: 'my-custom-popup'});

          

          
        });

        // Add all layer groups to the map
        grupoOrganicos.addTo(this.map);
        grupoPapel.addTo(this.map);
        grupoMetal.addTo(this.map);
        grupoVidrio.addTo(this.map);
        grupoPlasticos.addTo(this.map);
        grupoDificilReciclaje.addTo(this.map);

        // Add layer control
        const overlayMaps = {
          "Organicos": grupoOrganicos,
          "Papel": grupoPapel,
          "Metal": grupoMetal,
          "Vidrio": grupoVidrio,
          "Plasticos": grupoPlasticos,
          "Dificil Reciclaje": grupoDificilReciclaje
        };

        L.control.layers(undefined, overlayMaps, { position: 'bottomleft' }).addTo(this.map);

        // Center the map on all markers
        if (punteros.length > 0) {
          const bounds = L.latLngBounds(punteros.map(marker => marker.getLatLng()));
          this.map.fitBounds(bounds);
        } else {
          // Fallback to default bounds if no markers
          const defaultBounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
          this.map.fitBounds(defaultBounds);
        }
      },
      error: (err) => {
        console.error('Error:', err);
        // Handle error case, maybe show default map
        const defaultBounds = L.latLngBounds(this.markers.map(marker => marker.getLatLng()));
        this.map.fitBounds(defaultBounds);
      }
    });
  }

  

}

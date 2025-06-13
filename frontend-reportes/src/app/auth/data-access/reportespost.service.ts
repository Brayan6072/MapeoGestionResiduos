import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { options } from 'ionicons/icons';
import { Observable, catchError, throwError } from 'rxjs';

interface ReportarContenedor {  
  etiquetau: String,
  clasificacion: String,
  estado: String
}

export interface Contenedores{
  nombre: String,
  longitud: String,
  latitud: String
}
export interface LocalizacionDTO{  
  clasificacion_id: number[],
}
export interface UbicacionDTO{
  contenedores: Contenedores,
  localizacionDTO: LocalizacionDTO
}

@Injectable({
  providedIn: 'root'
})
export class ReportespostService {
  private http = inject(HttpClient);  
  private host = 'https://mcsv-reportes-backend-latest.onrender.com'; 
  //private host = 'http://localhost:8099'; 
  private reportarUrl = this.host + '/reportes/reportar'; 
  private deleteurl = this.host + '/contenedores/ubicaciones/deleteUbicacion/'
  private addurl = this.host + '/contenedores/ubicaciones/addContenedores';
  constructor() { }


  ReportarContenedor(reporte: ReportarContenedor): Observable<any> {
    return this.http.post<any>(this.reportarUrl, reporte).pipe(
      catchError((error) => {
        console.error('Error reporting container:', error);
        return throwError(error);
      })
    );
  }

  DeleteUbicacion(id: String): Observable<unknown> {
    return this.http.delete<any>(this.deleteurl+id).pipe(
      catchError((error) => {
        console.error('Error al eliminar:', error);
        return throwError(error);
      })
    );
  }
  AddUbiacation(ubicacion: UbicacionDTO): Observable<any> {
    return this.http.post<any>(this.addurl, ubicacion).pipe(
      catchError((error) => {
        console.error('Error reporting container:', error);
        return throwError(error);
      })
    );
  }

  
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { options } from 'ionicons/icons';
import { Observable, catchError, throwError } from 'rxjs';
import { FileHandle } from '../../dashboard/features/form-ubicaciones/form-ubicaciones.component';

interface ReportarContenedor {
  localizacionContenedores: {
    id: Number
  },
  estatus: String,
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
  //private host = 'https://mcsv-reportes-backend-latest.onrender.com'; 
  private host = 'http://localhost:8099'; 
  private reportarUrl = this.host + '/reportes/reportar'; 
  private deleteurl = this.host + '/ubicaciones/deleteUbicacion/'
  private addurl = this.host + '/ubicaciones/addContenedores';
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
  AddUbication(ubicacion: UbicacionDTO, fileHandle: FileHandle): Observable<any> {
  
  const formData = new FormData();  
  
  const ubicacionBlob = new Blob([JSON.stringify(ubicacion)], {
    type: 'application/json'
  });
  formData.append('ubicacionDTO', ubicacionBlob);  
  
  if (fileHandle?.file) {
    formData.append('imgFile', fileHandle.file, fileHandle.file.name);
  }

  return this.http.post<any>(this.addurl, formData).pipe(
    catchError((error) => {
      console.error('Error reporting container:', error);
      return throwError(() => new Error(error.message || 'Server error'));
    })
  );
}

  
}

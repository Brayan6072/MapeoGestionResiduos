import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

interface ReporteUpdate {
  id: String,  
} 

interface ReportarContenedor {  
  etiquetau: String,
  clasificacion: String,
  estado: String
}
@Injectable({
  providedIn: 'root'
})
export class ReportespostService {
  private http = inject(HttpClient); 
  private apiUrl = 'http://localhost:8099/reportes';
  private reportarUrl = 'http://localhost:8099/reportes/reportar'; 
  constructor() { }

  UpdateStatus(reporte: ReporteUpdate): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/`+ reporte.id, reporte).pipe(
      catchError((error) => {
        console.error('Error updating status:', error);
        return throwError(error);
      })
    );
  }

  ReportarContenedor(reporte: ReportarContenedor): Observable<any> {
    return this.http.post<any>(this.reportarUrl, reporte).pipe(
      catchError((error) => {
        console.error('Error reporting container:', error);
        return throwError(error);
      })
    );
  }
}

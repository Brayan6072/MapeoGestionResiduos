import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

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
  private reportarUrl = 'http://localhost:8099/reportes/reportar'; 
  constructor() { }


  ReportarContenedor(reporte: ReportarContenedor): Observable<any> {
    return this.http.post<any>(this.reportarUrl, reporte).pipe(
      catchError((error) => {
        console.error('Error reporting container:', error);
        return throwError(error);
      })
    );
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private http = inject(HttpClient);  
  private urlApi = 'http://localhost:8099/reportes/search-estatus/Verde';
  private urlLastWeek = 'http://localhost:8099/reportes/CountLastWeek';
  private urlUbicaciones = 'http://localhost:8099/contenedores/ubicaciones/clasificaciones';
  private urlLastMonth = 'http://localhost:8099/reportes/CountLastMonth';
  
  getReportesByEstatus(): Observable<any> {
    return this.http.get(this.urlApi).pipe(
      catchError((error) => {
        console.error('Error al obtener reportes:', error);
        return throwError(() => new Error('Error en la solicitud HTTP'));
      }),
    );
  }

  getReportesLastWeek(): Observable<any> {
    return this.http.get(this.urlLastWeek).pipe(
      catchError((error) => {
        console.error('Error al obtener reportes:', error);
        return throwError(() => new Error('Error en la solicitud HTTP'));
      }),
    );
  }

  getReportesLastMonth(): Observable<any> {
    return this.http.get(this.urlLastMonth).pipe(
      catchError((error) => {
        console.error('Error al obtener reportes:', error);
        return throwError(() => new Error('Error en la solicitud HTTP'));
      }),
    );
  }
  
  getUbicaciones(): Observable<any> {
    return this.http.get(this.urlUbicaciones).pipe(
      catchError((error) => {
        console.error('Error al obtener reportes:', error);
        return throwError(() => new Error('Error en la solicitud HTTP'));
      }),
    );
  }

}

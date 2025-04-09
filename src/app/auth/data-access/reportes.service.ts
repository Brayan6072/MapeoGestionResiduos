import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private http = inject(HttpClient);  
  private host = 'http://localhost:8099';
  private urlApi = this.host + '/reportes/search-estatus/';
  private urlLastWeek = this.host +'/reportes/CountLastWeek';
  private urlUbicaciones = this.host +'/contenedores/ubicaciones/clasificaciones';
  private urlLastMonth = this.host +'/reportes/CountLastMonth';
  private apiUrl = this.host +'/reportes';
  
  
  getReportesByEstatus(status: String): Observable<any> {
    return this.http.get(this.urlApi + status).pipe(
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
    
    UpdateStatus(id: String): Observable<any> {
      return this.http.get<any>(`${this.apiUrl}/update/`+ id).pipe(
        catchError((error) => {
          console.error('Error updating status:', error);
          return throwError(error);
        })
      );
    }

}

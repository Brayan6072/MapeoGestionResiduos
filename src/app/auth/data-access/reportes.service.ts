import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private http = inject(HttpClient);  
  private urlApi = 'http://localhost:8099/reportes/search-estatus/Verde';
  
  getReportesByEstatus(): Observable<any> {
    return this.http.get(this.urlApi).pipe(
      catchError((error) => {
        console.error('Error al obtener reportes:', error);
        return throwError(() => new Error('Error en la solicitud HTTP'));
      }),
    );
  }
}

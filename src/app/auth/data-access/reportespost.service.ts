import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';

interface ReporteUpdate {
  id: String,  
} 
@Injectable({
  providedIn: 'root'
})
export class ReportespostService {
  private http = inject(HttpClient); 
  private apiUrl = 'http://localhost:8099/reportes';

  constructor() { }

  UpdateStatus(reporte: ReporteUpdate): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/update/`+ reporte.id, reporte).pipe(
      catchError((error) => {
        console.error('Error updating status:', error);
        return throwError(error);
      })
    );
  }
}

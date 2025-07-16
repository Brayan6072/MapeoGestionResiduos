import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, retry, throwError } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private http = inject(HttpClient); 
  private host = 'https://mcsv-reportes-backend-latest.onrender.com';
  //private host = 'http://localhost:8099'; 
  private urlApi = this.host + '/reportes/search-estatus/';
  private urlLastWeek = this.host +'/reportes/CountLastWeek';
  private urlUbicaciones = this.host +'/ubicaciones/clasificaciones';
  private urlLastMonth = this.host +'/reportes/CountLastMonth';
  private apiUrl = this.host +'/reportes';
  private urlfindcontainers = this.host + '/contenedores/findContainers';  
  private urlgetIdLocalizacion = this.host + '/ubicaciones/UbicacionContenedor';
  private urlCountByContenedor = this.host + '/contenedores/CountReportsByContainer';
  private urlgetContainerById = this.host + '/contenedores/getContainerById';
  private urlgetImgByName = this.host + '/contenedores/getImg';
  private urlgetrankingContainer = this.host + '/reportes/rankingContainer';

  
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

    getClasificacionesByNombre(contenedor: String): Observable<any> {
      return this.http.get<any>(`${this.host}/ubicaciones/clasificaciones/`+contenedor).pipe(
        catchError((error) => {
          console.error('Error al obtener reportes:', error);
          return throwError(() => new Error('Error en la solicitud HTTP'));
        }),
      );
    }

    findContainers():Observable<any>{
      return this.http.get<any>(this.urlfindcontainers).pipe(
        catchError((error)=>{
          console.error('Error al obtener los contenedors');
          return throwError(() => new Error('Error en la solicitud HTTP'));
        }),
      )      
    }

    getUbicacionContenedor(etiqueta: String): Observable<any> {
      return this.http.get<any>(`${this.urlgetIdLocalizacion}/` + etiqueta).pipe(
        catchError((error) => {
          console.error('Error al obtener la localización del contenedor:', error);
          return throwError(() => new Error('Error en la solicitud HTTP'));
        }),
      );
    }
    CountReportsByContainer(contenedorName:String): Observable<any> {
      return this.http.get<any>(`${this.urlCountByContenedor}/` + contenedorName).pipe(
        catchError((error) => {
          console.error('Error al obtener el conteo de reportes por contenedor:', error);
          return throwError(() => new Error('Error en la solicitud HTTP'));
        }),
      );
    }

    getContainerById(id: String): Observable<any> {
      return this.http.get<any>(this.urlgetContainerById+ "/" + id).pipe(
        catchError((error) => {
          console.error('Error al obtener el contenedor por ID:', error);
          return throwError(() => new Error('Error en la solicitud HTTP'));
        }),
      );
    }
    getImgByName(name: String): Observable<any> {
      return this.http.get<any>(this.urlgetImgByName + "/" + name).pipe(
        catchError((error) => {
          console.error('Error al obtener la imagen por nombre:', error);
          return throwError(() => new Error('Error en la solicitud HTTP'));
        }),
      );
    }


    getRankingContainer():Observable<any>{
      return this.http.get<any> (this.urlgetrankingContainer).pipe(
        catchError((error) => {
          console.error('Error al obtener el ranking');
          return throwError(() => new Error('Error en la solicitud HTTP') );
        })
      )
    }
    
   
}

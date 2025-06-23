import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { catchError, Observable, throwError } from 'rxjs';

export interface FileHandle {
  file?: File,
  url?: SafeUrl,
}

export interface Contenedores{
  nombre: String,
  longitud: String,
  latitud: String,
  is_available: String
}

@Injectable({
  providedIn: 'root'
})
export class ReportesputService {

  constructor() { }

  private http = inject(HttpClient);  
  //private host = 'https://mcsv-reportes-backend-latest.onrender.com'; 
  private host = 'http://localhost:8099'; 
  private urlUpdateContainer = this.host + '/contenedores/UpdateContainer'; 


  UpdateContainer(id:number, is_available: String, contenedor: Contenedores, fileHandle: FileHandle): Observable<any> {

    const formData = new FormData();  
    
    const contenedoresBlob = new Blob([JSON.stringify(contenedor)], {
      type: 'application/json'
    });
    formData.append('contenedores', contenedoresBlob);  
    
    if (fileHandle?.file) {
      formData.append('imgFile', fileHandle.file, fileHandle.file.name);
    }
    
    return this.http.put<any>(this.urlUpdateContainer+ '/'+id + '/'+is_available, formData).pipe(
      catchError((error) => {
        console.error('Error updating container:', error);
        return throwError(error);
      })
    );
  }




}

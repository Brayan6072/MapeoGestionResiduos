import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, QueryList, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportesService } from '../../../auth/data-access/reportes.service';
import MapaComponent from "../../../auth/ui/mapa/mapa.component";
import { ReportespostService } from '../../../auth/data-access/reportespost.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import UbicacionesComponent from "../../../auth/ui/ubicaciones/ubicaciones.component";
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

export interface formdelete{
  id: FormControl<String | null>
}
export interface container{
  name: FormControl<String | null>
  latitud: FormControl<String | null>
  longitud: FormControl<String | null>
  clasificaciones: FormControl<boolean | null> 

}

@Component({
  selector: 'app-form-ubicaciones',
  imports: [CommonModule, ReactiveFormsModule, UbicacionesComponent],
  templateUrl: './form-ubicaciones.component.html',
  styleUrl: './form-ubicaciones.component.scss'
})
export default class FormUbicacionesComponent implements OnInit{
  private _reportesService = inject(ReportesService);
  private _reportesPostService = inject(ReportespostService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);

  @ViewChild('checkboxes', { static: false }) checkboxes!: QueryList<ElementRef<HTMLInputElement>>;

  
  selectedValues: String[]= [];
  data: any[] = [];  
  errorMessage: string | null = null;
  loading = signal<boolean>(false);
  
  checkbox = [
    {
      id: '1',
      name: 'Organicos',     
    },
    {
      id: '2',
      name: 'Papel',      
    },
    {
      id: '3',
      name: 'Dificil Reciclaje',     
    },
    {
      id: '4',
      name: 'Plasticos',      
    },
    {
      id: '5',
      name: 'Vidrio',      
    },
    {
      id: '6',
      name: 'Metal',      
    }
  ]
  ngOnInit(): void {
    this.getContainers();
    
  }

  async getContainers(){
    this.loading.set(true);
    this.errorMessage = null;

    await this._reportesService.findContainers().subscribe({
      next: (data) => {
        this.data = data;
        this.loading.set(false);
        console.log(this.data)
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos';
        this.loading.set(false);
        console.error('Error:', err);
      },
    });
  }

  form = this._formBuilder.group<formdelete>({
    id: this._formBuilder.control('', Validators.required)
  });

  addform = this._formBuilder.group<container>({
    name: this._formBuilder.control('', Validators.required),
    latitud: this._formBuilder.control('', Validators.required),
    longitud: this._formBuilder.control('', Validators.required),
    clasificaciones: this._formBuilder.control(false,Validators.required),

  })
  

   async delete() {
    
      if (this.form.invalid) return; 
      
      try{
        
        const {id} = this.form.value; 
        console.log(id);
        if(!id) return;
      
        await this._reportesPostService.DeleteUbicacion(id).subscribe();
        toast.success('Ubicacion eliminada');
        this.loading.set(false);
      }catch(error){
        this.loading.set(false);
        toast.error('Error al eliminar la ubicacion');
      }


    }

    async add() {
      if (this.addform.invalid || this.selectedValues.length === 0) {
        toast.error('Completa todos los campos y selecciona al menos una clasificación');
        return;
      }
    
      try {
        toast.success("load")
        this.loading.set(true);
        const { name, latitud, longitud } = this.addform.value;
    
        
        if (!name || !latitud || !longitud) {
          toast.error('Nombre, latitud y longitud son obligatorios');
          return;
        }
    
        
        const payload: UbicacionDTO = {
          contenedores: {
            nombre: name,
            latitud: latitud,
            longitud: longitud,
          },
          localizacionDTO: {            
            clasificacion_id: this.selectedValues.map(v => Number(v)),
          },
        };
        console.log(payload);
        
        await this._reportesPostService.AddUbiacation(payload).subscribe({
          next: () => {
            toast.success('Ubicación añadida correctamente');           
          },
          error: (err) => {
            toast.error("Probablemente ya exista una ubicación");
            
          },
        });
    
      } catch (error) {
        toast.error('Error inesperado');        
      }finally{
        
        this.loading.set(false);
      }
    }
    
    getValueOfCheckbox(event: Event) {
      const checkbox = event.target as HTMLInputElement;
      if (checkbox.checked) {
        this.selectedValues.push(checkbox.value);
      }else {
        this.selectedValues = this.selectedValues.filter(v => v !== checkbox.value);
      }
      console.log(this.selectedValues);
    }
}

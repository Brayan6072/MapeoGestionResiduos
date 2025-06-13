import { normalize } from '@amcharts/amcharts5/.internal/core/util/Animation';
import { CommonModule } from '@angular/common';
import { Component, effect, inject, input, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { ReportespostService } from '../../auth/data-access/reportespost.service';
import { Router } from '@angular/router';
import { ReportesService } from '../../auth/data-access/reportes.service';


export interface FormReportes {
  clasificacion: FormControl<string | null>;
  estado: FormControl<string | null>;
}  
@Component({
  selector: 'app-reportes',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.scss'
})
export default class ReportesComponent {
  private _formBuilder = inject(FormBuilder);
  private _reportespostService = inject(ReportespostService);
  private _reportesService = inject(ReportesService);
  private _router = inject(Router);
   data: any [] = [];

  contenedor = input.required<string>();
  loading = false;  

  constructor() {
     
  }

  ngOnInit() {
    this._reportesService.getClasificacionesByNomnre(this.contenedor()).subscribe({
      next: (data: any[]) => {
        this.data = data;
        
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  


  form = this._formBuilder.group<FormReportes>({    
    clasificacion: this._formBuilder.control('', Validators.required),
    estado: this._formBuilder.control('', Validators.required),
  });
  
  async submit() {
    if (this.form.valid) {   
        
      const { clasificacion, estado } = this.form.value;
      console.log({etiquetau:this.contenedor(), clasificacion, estado});
      
      if (!clasificacion || !estado) {
        toast.error('Por favor completa todos los campos!');
        return;
      }
  
      try {   
        this.loading = true;
       
         this._reportespostService.ReportarContenedor({          
          etiquetau: this.contenedor(), 
          clasificacion, 
          estado 
        }).subscribe({
          next: () => {
            this.loading = false;
            toast.success('Contenedor Reportado con exito!');            
          },
          error: (error) => {
            this.loading = false;
            console.error(error);
            toast.error('Este contenedor ya ha sido reportado!');
            
          },
          
        });
       
        
      } catch (error) {
        
        toast.error('Error inesperado al reportar el contenedor!');
      }
    } else {
      toast.error('Por favor completa todos los campos!');
    }
    setTimeout(() => {this._router.navigateByUrl('/mapa');}, 2200);       
  }


}

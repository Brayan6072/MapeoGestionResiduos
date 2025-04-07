import { normalize } from '@amcharts/amcharts5/.internal/core/util/Animation';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toast } from 'ngx-sonner';
import { ReportespostService } from '../../auth/data-access/reportespost.service';

export interface FormReportes {
  etiquetau: FormControl<string | null>;
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
  category = [
    {
      id: '1',
      name: 'Papel',
      img: '/Images/contenedores/Papel.webp',
    },
    {
      id: '2',
      name: 'Vidrio',
      img: '/Images/contenedores/Vidrio.webp',
    },
    {
      id: '3',
      name: 'Organicos',
      img: '/Images/contenedores/Organicos.webp',
    },
    {
      id: '4',
      name: 'Dificil Reciclaje',
      img: '/Images/contenedores/Dificil Reciclaje.webp',
    },
    {
      id: '5',
      name: 'Metal',
      img: '/Images/contenedores/Metal.webp',
    },
    {
      id: '6',
      name: 'Plasticos',
      img: '/Images/contenedores/Plasticos.webp',
    },
  ];

  form = this._formBuilder.group<FormReportes>({
    etiquetau: this._formBuilder.control('', Validators.required),
    clasificacion: this._formBuilder.control('', Validators.required),
    estado: this._formBuilder.control('', Validators.required),
  });
  
  async submit() {
    if (this.form.valid) {      
      const { etiquetau, clasificacion, estado } = this.form.value;
      console.log({etiquetau, clasificacion, estado});
      
      if (!etiquetau || !clasificacion || !estado) {
        toast.error('Por favor completa todos los campos!');
        return;
      }
  
      try {
        // Suscríbete al observable
        this._reportespostService.ReportarContenedor({ 
          etiquetau, 
          clasificacion, 
          estado 
        }).subscribe({
          next: () => {
            toast.success('Contenedor Reportado con exito!');
            this.form.reset(); 
          },
          error: () => {
            toast.error('Error al reportar el contenedor!');
          }
        });
      } catch (error) {
        console.error(error);
        toast.error('Error inesperado al reportar el contenedor!');
      }
    } else {
      toast.error('Por favor completa todos los campos!');
    }
  }


}

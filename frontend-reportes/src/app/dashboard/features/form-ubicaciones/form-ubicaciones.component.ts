import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, Input, OnInit, QueryList, signal, ViewChild } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReportesService } from '../../../auth/data-access/reportes.service';
import MapaComponent from "../../../auth/ui/mapa/mapa.component";
import { ReportespostService } from '../../../auth/data-access/reportespost.service';
import { toast } from 'ngx-sonner';
import { Router } from '@angular/router';
import UbicacionesComponent from "../../../auth/ui/ubicaciones/ubicaciones.component";
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ReportesputService } from '../../../auth/data-access/reportesput.service';
export interface Contenedores{
  nombre: String,
  longitud: String,
  latitud: String,  
  is_available?: String
}
export interface LocalizacionDTO{  
  clasificacion_id: number[]
}
export interface UbicacionDTO{
  contenedores: Contenedores,
  localizacionDTO: LocalizacionDTO
}

export interface formDelete{
  id: FormControl<String | null>
}

export interface formDataUpdate{
  id: FormControl<String | null>
}

export interface container{
  name: FormControl<String | null>
  latitud: FormControl<String | null>
  longitud: FormControl<String | null>
  clasificaciones: FormControl<boolean | null> 
  
}

export interface FileHandle {
  file?: File,
  url?: SafeUrl,
}


export interface ContenedoresUpdate{
  nombre: FormControl<String | null>,
  longitud: FormControl<String | null>,
  latitud: FormControl<String | null>,
  imgFile: FormControl<File | null>,
  is_available?: FormControl<String | null>  
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
  private _reportesPutService = inject(ReportesputService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  private _sanitazer: DomSanitizer = inject(DomSanitizer);

  selectedContainer: string = '';
  coords: string[] = [];
  @ViewChild('checkboxes', { static: false }) checkboxes!: QueryList<ElementRef<HTMLInputElement>>;
  @ViewChild('latitud', { static: false }) latitudinput!: ElementRef<HTMLInputElement>;
  @ViewChild('longitud', { static: false }) longitudinput!: ElementRef<HTMLInputElement>;


  constructor(){
    
  }
  idcontainer: String = '';
  urlpreview?: string;

  urlpreviewUpdate?: SafeUrl;
  selectedValues: String[]= [];
  data: any[] = [];  
  containerupdate: any[] = [];
  errorMessage: string | null = null;
  loading = signal<boolean>(false);
  stateupdate = signal<boolean>(false);
  fileHandle?: FileHandle;

  checkbox = [
    {
      id: '1',
      name: 'Papel',     
    },
    {
      id: '2',
      name: 'Vidrio',      
    },
    {
      id: '3',
      name: 'Dificil Reciclaje',     
    },
    {
      id: '4',
      name: 'Metal',      
    },
    {
      id: '5',
      name: 'Organicos',      
    },
    {
      id: '6',
      name: 'Plasticos',      
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
        
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos';
        this.loading.set(false);
        console.error('Error:', err);
      },
    });
  }

  form = this._formBuilder.group<formDelete>({
    id: this._formBuilder.control('', Validators.required)
  });
  formDataUpdate = this._formBuilder.group<formDataUpdate>({
    id: this._formBuilder.control('', Validators.required)
  });

  UpdateForm = this._formBuilder.group<ContenedoresUpdate>({
  nombre: this._formBuilder.control('', Validators.required),
  latitud: this._formBuilder.control('', Validators.required),
  longitud: this._formBuilder.control('', Validators.required),
  imgFile: this._formBuilder.control<File | null>(null) 
  
})


  addform = this._formBuilder.group<container>({
    name: this._formBuilder.control('', Validators.required),
    latitud: this._formBuilder.control('', Validators.required),
    longitud: this._formBuilder.control('', Validators.required),
    clasificaciones: this._formBuilder.control(false,Validators.required)    
  })




   async delete() {
    
      if (this.form.invalid) return; 
      
      try{
        
        const {id} = this.form.value; 

        if(!id) return;
        this.idcontainer = id;
      
        await this._reportesPostService.DeleteUbicacion(id).subscribe();
        toast.success('Ubicacion eliminada');
        this.Refrespage();
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
        
        this.loading.set(true);
        toast.success("Creando..")
        const { name, latitud, longitud} = this.addform.value;
        
        
        if (!name || !latitud || !longitud ) {
          toast.error('Nombre, latitud y longitud son obligatorios');
          return;
        }else if(!this.fileHandle){
          toast.error('Debes seleccionar una imagen');
          return;
        }
       

        
        const payload: UbicacionDTO = {
          contenedores: {
            nombre: name,
            latitud: latitud,
            longitud: longitud,
            is_available: 'Activo'
          },
          localizacionDTO: {            
            clasificacion_id: this.selectedValues.map(v => Number(v)),
          },
        };
        
        
        await this._reportesPostService.AddUbication(payload, this.fileHandle ).subscribe({
          next: () => {
            this.Refrespage();
            toast.success('Ubicación añadida correctamente');           
          },
          error: (err) => {
             if (err.status === 409) {
              toast.error("Ya existe una ubicación con ese nombre");
            } else {
              toast.error("Error al agregar la ubicación");
            }            
            
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
      
    }

    getCoords(data: string[]){
      this.coords = data;
      this.addform.get('latitud')?.setValue(this.coords[0]);
      this.addform.get('longitud')?.setValue(this.coords[1]);      
      
    }


    Refrespage(){
      this._router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
        this._router.navigate(['/dashboard']);
      });
    }
    

    onFileSelected(event: any) {
    

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {    
        this.urlpreview = e.target?.result as string;        
      };
      
      reader.readAsDataURL(file); 
      this.fileHandle = {
        file: file,
        url: this._sanitazer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      };    
          
    } else {
      this.urlpreview = ''; 
     
    }
    
  }


  onFileSelectedForUpdate(event: any) {
    

    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      
      reader.onload = (e) => {    
        this.urlpreviewUpdate  = e.target?.result as string;        
      };
      
      reader.readAsDataURL(file); 
      this.fileHandle = {
        file: file,
        url: this._sanitazer.bypassSecurityTrustUrl(window.URL.createObjectURL(file))
      };    
          this.UpdateForm.get('imgFile')?.setValue(file);
    } else {
      this.urlpreviewUpdate  = ''; 
     
    }
    
  }

  cancelPreview() {
    this.urlpreview = '';  
    this.urlpreviewUpdate = '';
    this.fileHandle = undefined;
  
  }
  
async getDataUpdate() {
  this.cancelPreview();
  if (this.formDataUpdate.invalid) return;
    
  try {
    const {id} = this.formDataUpdate.value;         
    if(!id) return;
    this.idcontainer = id;
  
    this.loading.set(true);
    await this._reportesService.getContainerById(id).subscribe({
      next: async (containerupdate) => {
        this.containerupdate = containerupdate;
        this.UpdateForm.patchValue({
          nombre: containerupdate.nombre ?? '',
          latitud: containerupdate.latitud ?? '',
          longitud: containerupdate.longitud ?? ''         
        });

        
        if (containerupdate.img) {
          this.urlpreviewUpdate = this.getSafeUrl(containerupdate.img);
          
          
          const file = await this.base64ToFile(containerupdate.img, `contenedor_${id}.jpg`);
          
          this.fileHandle = {
            file: file,
            url: this._sanitazer.bypassSecurityTrustUrl(URL.createObjectURL(file))
          };
          
          this.UpdateForm.get('imgFile')?.setValue(file);
        }
        
        this.loading.set(false);
        this.stateupdate.set(true);
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos';
        this.loading.set(false);
        console.error('Error:', err);
      },
    });
  } catch(error) {        
    toast.error('Error al cargar datos de contenedor');
    this.loading.set(false);
  }
}

  getSafeUrl(base64Image: string): SafeUrl {
  if (!base64Image) return '';
  
  return this._sanitazer.bypassSecurityTrustUrl(
    `data:image/jpeg;base64,${base64Image}`
  );
}

  

  async UpdateContainer() {
  if (this.UpdateForm.invalid) {
    toast.error('Completa todos los campos');
    return;
  }
  
  const { nombre, latitud, longitud } = this.UpdateForm.value;
  
  if (!nombre || !latitud || !longitud) {
    toast.error('Todos los campos son obligatorios');
    return;
  }
  
  this.loading.set(true);
  
  
  const fileToSend = this.fileHandle ? this.fileHandle : {};
  
  await this._reportesPutService.UpdateContainer(
    Number(this.idcontainer), 
    "Activo",  
    { nombre, latitud, longitud, is_available: "Activo" }, 
    fileToSend
  ).subscribe({
    next: () => {
      toast.success('Contenedor actualizado correctamente');      
      this.loading.set(false);
      this.stateupdate.set(false);
      this.Refrespage();
    },
    error: (err) => {
      toast.error('Error al actualizar el contenedor');
      console.error(err);
      this.loading.set(false);
    }
  });
  
}


async base64ToFile(base64: string, filename: string): Promise<File> {
  const res = await fetch(`data:image/jpeg;base64,${base64}`);
  const blob = await res.blob();
  return new File([blob], filename, { type: 'image/jpeg' });
}
}  

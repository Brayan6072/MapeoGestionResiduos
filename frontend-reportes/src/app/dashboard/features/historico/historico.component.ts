import { Component, inject, OnInit } from '@angular/core';
import { ReportesService } from '../../../auth/data-access/reportes.service';
import { toast } from 'ngx-sonner';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-historico',
  imports: [CommonModule, ReactiveFormsModule, NgxPaginationModule ],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.css'
})
export default class HistoricoComponent implements OnInit {
  private reportesService = inject(ReportesService);   
  
  data: any[] = [];  
  errorMessage: string | null = null;
  isLoading = true; 

  p: number = 1;
  total: number = 0;

  constructor(){
    
  }
  ngOnInit(): void {
    this.fillData();
  }

  fillData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.reportesService.getReportesByEstatus("Verde").subscribe({
      next: (data) => {
        this.data = data;
        this.total = data.length;
        this.isLoading = false;
        
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos';
        this.isLoading = false;
        toast.error('Error:', err);
      },
    });
  }

  pageChangeEvent(event: number){
      this.p = event;
      this.fillData();
  }
}

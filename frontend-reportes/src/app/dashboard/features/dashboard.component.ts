import { Component, OnInit , effect, inject, input, signal} from '@angular/core';
import { ReportesService } from '../../auth/data-access/reportes.service';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule} from '@angular/forms';
import LastWeekReportsComponent from "../../auth/ui/last-week-reports/last-week-reports.component";
import LastMonthReportsComponent from "../../auth/ui/last-month-reports/last-month-reports.component";
import { toast } from 'ngx-sonner';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LastWeekReportsComponent, LastMonthReportsComponent, NgxPaginationModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  
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

    this.reportesService.getReportesByEstatus("Rojo").subscribe({
      next: (data) => {
        this.data = data;
        this.total = data.length;
        this.isLoading = false;
        console.log('Datos cargados:', this.data);
        
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos';
        this.isLoading = false;
        console.error('Error:', err);
      },
    });

    
  }

  updateStatus(id: String): void {
    this.isLoading = true;
    this.reportesService.UpdateStatus(id).subscribe({
      next: () => {        
        this.fillData();
        this.isLoading = false;
        toast.success('Estatus actualizado correctamente');         
      },
      error: (err) => {
        toast.error('Error updating status:', err);
        
      },
    });

  }

  pageChangeEvent(event: number){
      this.p = event;
      this.fillData();
  }

}

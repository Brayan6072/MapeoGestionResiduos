import { Component, OnInit , inject} from '@angular/core';
import { ReportesService } from '../../auth/data-access/reportes.service';
import { ReportespostService } from '../../auth/data-access/reportespost.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export default class DashboardComponent implements OnInit {
  
  private reportesService = inject(ReportesService); 
  private ReportespostService = inject(ReportespostService);
  private _formBuilder = inject(FormBuilder);
  private _router = inject(Router);
  
  data: any[] = [];
  errorMessage: string | null = null;
  isLoading = true; 

  ngOnInit(): void {
    this.fillData();
  }

  fillData(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.reportesService.getReportesByEstatus().subscribe({
      next: (data) => {
        this.data = data;
        this.isLoading = false;
        console.log('Data:', data);
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos';
        this.isLoading = false;
        console.error('Error:', err);
      },
    });
  }

  

}

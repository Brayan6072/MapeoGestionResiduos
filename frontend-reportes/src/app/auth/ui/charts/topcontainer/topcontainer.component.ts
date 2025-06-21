import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, NgZone, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { ReportesService } from '../../../data-access/reportes.service';
import { Form, FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Dataviz from '@amcharts/amcharts5/themes/Dataviz';

export interface formChart {
  contenedorName: FormControl<string | null>; 
}

@Component({
  selector: 'app-topcontainer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './topcontainer.component.html',
  styleUrl: './topcontainer.component.css'
})
export default class TopcontainerComponent implements OnInit {
  private _reportesService = inject(ReportesService)
  private _formBuilder = inject(FormBuilder);
  
  data: any[] = []; 
  countdata: any[] = []; 
  errorMessage: string | null = null;
  loading = signal<boolean>(false);
  private root!: am5.Root;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.getContainers();    
  }

  private browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  form = this._formBuilder.group<formChart>({
    contenedorName: this._formBuilder.control('', Validators.required)
  });

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

  async CountReportsByContainer(contenedorName: string) {
    this.loading.set(true);
    this.errorMessage = null;

    await this._reportesService.CountReportsByContainer(contenedorName).subscribe({
      next: (countdata) => {
        this.countdata = countdata;
        this.loading.set(false);
        this.createChart();
        console.log('Count data:', this.countdata);
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos';
        this.loading.set(false);
        console.error('Error:', err);
      },
    });
  }

  ShowChart() {

    if (this.form.valid) {  
      
      const {contenedorName} = this.form.value;
      console.log('Selected container:', contenedorName);
      if(!contenedorName) return;
      
      this.CountReportsByContainer(contenedorName);
    } 
  }

    private createChart(): void {
      this.browserOnly(() => {
        
        if (this.root) {
          this.root.dispose();
        }
  
        
        this.root = am5.Root.new("chartdiv");
        this.root.setThemes([am5themes_Dataviz.new(this.root)]);
  
        const chart = this.root.container.children.push(
          am5xy.XYChart.new(this.root, {
            panY: false,
            layout: this.root.verticalLayout
          })
        );
  
        
        const chartData = this.countdata.map(item => ({
          category: item[1],  
          value: item[2]     
        }));
  
       
        const yAxis = chart.yAxes.push(
          am5xy.ValueAxis.new(this.root, {
            renderer: am5xy.AxisRendererY.new(this.root, {})
          })
        );
  
        const xAxis = chart.xAxes.push(
          am5xy.CategoryAxis.new(this.root, {
            renderer: am5xy.AxisRendererX.new(this.root, {}),
            categoryField: "category"
          })
        );
        xAxis.data.setAll(chartData);
  
        
        const series = chart.series.push(
          am5xy.ColumnSeries.new(this.root, {
            name: "Reportes de los ultimos dos meses",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            categoryXField: "category",
            tooltip: am5.Tooltip.new(this.root, {
              labelText: "{categoryX} {valueY}"
            })
          })
        );
        series.data.setAll(chartData);
  
        
        const legend = chart.children.push(am5.Legend.new(this.root, {}));
        legend.data.setAll(chart.series.values);
  
       
        chart.set("cursor", am5xy.XYCursor.new(this.root, {}));
      });
    }
  
    ngOnDestroy() {
      
      this.browserOnly(() => {
        if (this.root) {
          this.root.dispose();
        }
      });
    }
}

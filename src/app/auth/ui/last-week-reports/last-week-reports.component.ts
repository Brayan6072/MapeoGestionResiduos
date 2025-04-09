import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import am5themes_Dataviz from '@amcharts/amcharts5/themes/Dataviz';
import { ReportesService } from '../../data-access/reportes.service';

@Component({
  selector: 'app-last-week-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-week-reports.component.html',
  styles: ''
})
export default class LastWeekReportsComponent implements OnInit {
  private _reporteService = inject(ReportesService);
  dataLastWeek: any[] = []; 
  errorMessage: string | null = null;
  isLoading = true; 
  private root!: am5.Root;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadChartData();
  }

  
  private browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }


  private loadChartData(): void {
    this._reporteService.getReportesLastWeek().subscribe({
      next: (data) => {
        this.dataLastWeek = data;
        this.isLoading = false;
        console.log('Datos de la última semana:', this.dataLastWeek);
        this.createChart();
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los datos';
        this.isLoading = false;
        console.error('Error:', err);
      },
    });
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

      
      const chartData = this.dataLastWeek.map(item => ({
        category: item[0],  
        value: item[1]     
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
          name: "Reportes de la ultima semana",
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "category",
          tooltip: am5.Tooltip.new(this.root, {
            labelText: "{valueY}"
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
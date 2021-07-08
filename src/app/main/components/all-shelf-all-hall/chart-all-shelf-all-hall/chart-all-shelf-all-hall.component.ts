import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart-all-shelf-all-hall',
  templateUrl: './chart-all-shelf-all-hall.component.html',
  styleUrls: ['./chart-all-shelf-all-hall.component.scss']
})
export class ChartAllShelfAllHallComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartColors: Color[] = [
    { backgroundColor: '#FF9F10' }
  ];
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Alertas' }
  ];
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
    this.data.forEach(element => {
      this.barChartLabels.push(`Pasillo ${element.id_pasillotienda ? element.id_pasillotienda : ''}`);
      this.barChartData[0].data.push(element.total_alertas_faltantes);
    });
  }

}

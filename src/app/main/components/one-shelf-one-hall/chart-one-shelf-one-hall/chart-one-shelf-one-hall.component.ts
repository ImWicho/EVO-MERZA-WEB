import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart-one-shelf-one-hall',
  templateUrl: './chart-one-shelf-one-hall.component.html',
  styleUrls: ['./chart-one-shelf-one-hall.component.scss']
})
export class ChartOneShelfOneHallComponent implements OnInit {
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
    this.barChartLabels.push(`Anaquel ${this.data?.id_estante ? this.data.id_estante : ''}`);
    this.barChartData[0].data.push(this.data.total_alertas_faltantes);
  }

}

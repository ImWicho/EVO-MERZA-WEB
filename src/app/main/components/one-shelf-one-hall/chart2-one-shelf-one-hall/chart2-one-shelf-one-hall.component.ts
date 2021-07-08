import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart2-one-shelf-one-hall',
  templateUrl: './chart2-one-shelf-one-hall.component.html',
  styleUrls: ['./chart2-one-shelf-one-hall.component.scss']
})
export class Chart2OneShelfOneHallComponent implements OnInit {
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
    { backgroundColor: '#2f6eb8' },
    { backgroundColor: '#FF9F10' }
  ];
  public barChartLabels: Label[] = [];
  public barChartData: ChartDataSets[] = [
    { data: [], label: 'Correctas' },
    { data: [], label: 'Faltantes' }
  ];
  @Input() data: any;
  constructor() { }

  ngOnInit(): void {
    this.barChartLabels.push(`Anaquel ${this.data?.id_estante ? this.data.id_estante : ''}`);
    this.barChartData[0].data.push(this.data.total_alertas_correctas);
    this.barChartData[1].data.push(this.data.total_alertas_faltantes);
  }

}

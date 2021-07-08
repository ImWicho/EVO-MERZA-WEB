import { Component, Input, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart2-all-shelf-one-hall',
  templateUrl: './chart2-all-shelf-one-hall.component.html',
  styleUrls: ['./chart2-all-shelf-one-hall.component.scss']
})
export class Chart2AllShelfOneHallComponent implements OnInit {
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
    this.data.forEach(element => {
      this.barChartLabels.push(`Anaquel ${element.id_estante}`);
      this.barChartData[0].data.push(element.total_alertas_correctas);
      this.barChartData[1].data.push(element.total_alertas_faltantes);
    });
  }

}

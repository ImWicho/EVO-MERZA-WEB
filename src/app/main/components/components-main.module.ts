import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ChartsModule } from 'ng2-charts';
import { OneShelfOneHallComponent } from './one-shelf-one-hall/one-shelf-one-hall.component';
import { ChartOneShelfOneHallComponent } from './one-shelf-one-hall/chart-one-shelf-one-hall/chart-one-shelf-one-hall.component';
import { CardOneShelfOneHallComponent } from './one-shelf-one-hall/card-one-shelf-one-hall/card-one-shelf-one-hall.component';
import { AllShelfOneHallComponent } from './all-shelf-one-hall/all-shelf-one-hall.component';
import { CardAllShelfOneHallComponent } from './all-shelf-one-hall/card-all-shelf-one-hall/card-all-shelf-one-hall.component';
import { ChartAllShelfOneHallComponent } from './all-shelf-one-hall/chart-all-shelf-one-hall/chart-all-shelf-one-hall.component';
import { AllShelfAllHallComponent } from './all-shelf-all-hall/all-shelf-all-hall.component';
import { ChartAllShelfAllHallComponent } from './all-shelf-all-hall/chart-all-shelf-all-hall/chart-all-shelf-all-hall.component';
import { CardAllShelfAllHallComponent } from './all-shelf-all-hall/card-all-shelf-all-hall/card-all-shelf-all-hall.component';
import { Chart2AllShelfAllHallComponent } from './all-shelf-all-hall/chart2-all-shelf-all-hall/chart2-all-shelf-all-hall.component';
import { Chart2AllShelfOneHallComponent } from './all-shelf-one-hall/chart2-all-shelf-one-hall/chart2-all-shelf-one-hall.component';
import { Chart2OneShelfOneHallComponent } from './one-shelf-one-hall/chart2-one-shelf-one-hall/chart2-one-shelf-one-hall.component';



@NgModule({
  declarations: [
    OneShelfOneHallComponent,
    ChartOneShelfOneHallComponent,
    CardOneShelfOneHallComponent,
    AllShelfOneHallComponent,
    CardAllShelfOneHallComponent,
    ChartAllShelfOneHallComponent,
    AllShelfAllHallComponent,
    ChartAllShelfAllHallComponent,
    CardAllShelfAllHallComponent,
    Chart2AllShelfAllHallComponent,
    Chart2AllShelfOneHallComponent,
    Chart2OneShelfOneHallComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ChartsModule
  ],
  exports: [OneShelfOneHallComponent, AllShelfOneHallComponent, AllShelfAllHallComponent]
})
export class ComponentsMainModule { }

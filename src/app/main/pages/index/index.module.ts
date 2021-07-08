import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index/index.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from '../main/main.component';
import { ComponentsMainModule } from '../../components/components-main.module';
import { NotificationService } from 'src/app/shared/services/notification.service';


@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    IndexRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsMainModule
  ],
  providers: [NotificationService]
})
export class IndexModule { }

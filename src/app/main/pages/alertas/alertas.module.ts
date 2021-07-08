import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertasRoutingModule } from './alertas-routing.module';
import { AlertasComponent } from './alertas/alertas.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/shared/modules/material.module';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ComponentsMainModule } from '../../components/components-main.module';


@NgModule({
  declarations: [AlertasComponent],
  imports: [
    CommonModule,
    AlertasRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    MaterialModule,
    ComponentsMainModule
  ],
  providers: [NotificationService]
})
export class AlertasModule { }

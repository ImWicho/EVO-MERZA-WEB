import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { MaterialModule } from './modules/material.module';
import { NotificationComponent } from './components/notification/notification.component';
import { HeaderComponent } from './components/header/header.component';
import { ImageDialogComponent } from './components/image-dialog/image-dialog.component';



@NgModule({
  declarations: [ToolbarComponent, FooterComponent, NotificationComponent, HeaderComponent, ImageDialogComponent],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [ToolbarComponent, FooterComponent, HeaderComponent, ImageDialogComponent],
  entryComponents: [ImageDialogComponent]
})
export class SharedModule { }

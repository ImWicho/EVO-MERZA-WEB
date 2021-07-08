import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { NotificationComponent } from '../components/notification/notification.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private dialog: MatDialog) { }

  onOpenNotifcation(data: {width?: string, height?: string, type: string, text: string}): Observable<any>{
    return this.dialog.open(NotificationComponent, {
      width: data.width || '500px',
      height : data.height || 'auto',
      disableClose: true,
      data : { type: data.type, text: data.text }
    }).afterClosed();
  }
}

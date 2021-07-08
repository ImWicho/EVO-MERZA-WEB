import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ImageDialogComponent } from 'src/app/shared/components/image-dialog/image-dialog.component';

@Component({
  selector: 'app-card-all-shelf-one-hall',
  templateUrl: './card-all-shelf-one-hall.component.html',
  styleUrls: ['./card-all-shelf-one-hall.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CardAllShelfOneHallComponent implements OnInit {
  details = false;
  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[] = ['tag', 'ok', 'missing', 'totals', 'details'];
  expandedElement: any;
  @Input() data: any;
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.setData();
  }

  onOpenDetails(): void{
    this.details = !this.details;
  }

  setData(): void{
    this.dataSource = new MatTableDataSource();
    this.dataSource.data = this.data.Productos;
  }

  onOpenSnapshot(base64: string): void{
    this.dialog.open(ImageDialogComponent, {
      disableClose: true,
      width: 'auto',
      height: 'auto',
      data: { image: base64 }
    });
  }

}

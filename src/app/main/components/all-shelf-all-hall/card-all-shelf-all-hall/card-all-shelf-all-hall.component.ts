import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/main/interfaces/data-response';
import { ImageDialogComponent } from 'src/app/shared/components/image-dialog/image-dialog.component';

@Component({
  selector: 'app-card-all-shelf-all-hall',
  templateUrl: './card-all-shelf-all-hall.component.html',
  styleUrls: ['./card-all-shelf-all-hall.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CardAllShelfAllHallComponent implements OnInit {
  details = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<any>;
  columnsToDisplay: string[] = ['name', 'tag', 'ok', 'missing', 'totals', 'details'];
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
    this.dataSource.paginator = this.paginator;
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

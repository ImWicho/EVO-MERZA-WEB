import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-all-shelf-all-hall',
  templateUrl: './all-shelf-all-hall.component.html',
  styleUrls: ['./all-shelf-all-hall.component.scss']
})
export class AllShelfAllHallComponent implements OnInit {
  @Input() range: boolean;
  @Input() data: any;
  constructor(private excelSvc: ExcelService) { }

  ngOnInit(): void {
  }

  onGetExcel(): void{
    this.excelSvc.onGenerateExcelAlltoAll(this.data);
  }
}

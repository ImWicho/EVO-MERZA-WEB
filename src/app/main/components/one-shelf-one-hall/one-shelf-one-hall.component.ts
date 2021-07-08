import { Component, Input, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/shared/services/excel.service';

@Component({
  selector: 'app-one-shelf-one-hall',
  templateUrl: './one-shelf-one-hall.component.html',
  styleUrls: ['./one-shelf-one-hall.component.scss']
})
export class OneShelfOneHallComponent implements OnInit {
  @Input() range: boolean;
  @Input() data: any;
  constructor(private excelSvc: ExcelService) { }

  ngOnInit(): void {
  }

  onGetExcel(): void{
    this.excelSvc.onGenerateExcelOnetoOne(this.data);
  }

}

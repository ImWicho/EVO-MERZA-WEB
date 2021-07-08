import { Component, Input, OnInit } from '@angular/core';
import { ExcelService } from 'src/app/shared/services/excel.service';
import { DataService } from '../../interfaces/data-response';

@Component({
  selector: 'app-all-shelf-one-hall',
  templateUrl: './all-shelf-one-hall.component.html',
  styleUrls: ['./all-shelf-one-hall.component.scss']
})
export class AllShelfOneHallComponent implements OnInit {
  @Input() range: boolean;
  @Input() data: DataService;
  constructor(private excelSvc: ExcelService) { }

  ngOnInit(): void {
  }

  onGetExcel(): void{
    this.excelSvc.onGenerateExcelOnetoAll(this.data);
  }

}

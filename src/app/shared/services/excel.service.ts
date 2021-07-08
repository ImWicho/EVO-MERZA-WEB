import { Injectable } from '@angular/core';
import * as Excel from 'exceljs/dist/exceljs.min.js';
import * as FileSaver from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXT = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  onGenerateExcelOnetoOne(report: any): void{
    console.log(report);
    
    const header = [
      'Tienda',
      'Pasillo',
      'Anaquel',
      'Producto',
      'Fecha',
      'Alertas Faltantes',
      'Alertas Correctas'
    ];

    const workBook = new Excel.Workbook();
    const workSheet = workBook.addWorksheet(`Reporte del ${report.fecha_inicial} al ${report.fecha_final}`);
    const titleRow = workSheet.addRow([`Reporte del ${report.fecha_inicial} al ${report.fecha_final}`]);
    const titleRow2 = workSheet.addRow([`${report.nombre_tienda} - Pasillo ${report.id_pasillotienda} - Anaquel ${report.id_estante}`]);
    titleRow.font = { name : 'Arial black', family : 4, size: 16};
    titleRow2.font = { name : 'Arial black', family : 4, size: 16};
    workSheet.addRow([]);
    workSheet.addRow([]);
    workSheet.columns = [
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
    ];
    workSheet.mergeCells('A1:C1');
    workSheet.mergeCells('A2:C2');

    const headerRow = workSheet.addRow(header);
    headerRow.eachCell((cell, num) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'f3f3f3' },
      };
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.font = {
        name: 'Arial Black',
        color: { argb: '000000' },
        family: 2,
        size: 10,
        bold: true,
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };

    });

    report.Productos.forEach(product => {

      const row = workSheet.addRow([
        report.nombre_tienda,
        `Pasillo ${report.id_pasillotienda}`,
        `Anaquel ${report.id_estante}`,
        product.nombre_producto,
        product.Snapshots ? product.Snapshots[product.Snapshots?.length - 1]?.fecha_hora : '',
        product.alertas_faltantes,
        product.alertas_correctas
      ]);
      row.eachCell((cell, num) => {
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      });


    });

    workBook.xlsx.writeBuffer().then((data) => {
      this.saveAs(data, `Reporte ${report.nombre_tienda} - Pasillo ${report.id_pasillotienda} - Anaquel ${report.id_estante}`);
    });
  }

  onGenerateExcelOnetoAll(report: any): void{
    const header = [
      'Tienda',
      'Pasillo',
      'Anaquel',
      'Producto',
      'Fecha',
      'Alertas Faltantes',
      'Alertas Correctas'
    ];

    const workBook = new Excel.Workbook();
    const workSheet = workBook.addWorksheet(`Reporte del ${report[0]?.fecha_inicial} al ${report[0]?.fecha_final}`);
    const titleRow = workSheet.addRow([`Reporte del ${report[0]?.fecha_inicial} al ${report[0]?.fecha_final}`]);
    const titleRow2 = workSheet.
      addRow([`${report[0].nombre_tienda} - Pasillo ${report[0]?.id_pasillotienda} - Todos los anaqueles`]);
    titleRow.font = { name : 'Arial black', family : 4, size: 16};
    titleRow2.font = { name : 'Arial black', family : 4, size: 16};
    workSheet.addRow([]);
    workSheet.addRow([]);
    workSheet.columns = [
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
    ];

    workSheet.mergeCells('A1:C1');
    workSheet.mergeCells('A2:C2');

    report.forEach(anaquel => {
      const a = workSheet.addRow([`Anaquel ${anaquel.id_estante}`]);
      a.font = { name: 'Arial black', family: 4, size: 14 };
      const headerRow = workSheet.addRow(header);
      headerRow.eachCell((cell, num) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'f3f3f3' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.font = {
          name: 'Arial Black',
          color: { argb: '000000' },
          family: 2,
          size: 10,
          bold: true,
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });

      anaquel.Productos.forEach(product => {
        const row = workSheet.addRow([
          report[0]?.nombre_tienda,
          `Pasillo ${anaquel.id_pasillotienda}`,
          `Anaquel ${anaquel.id_estante}`,
          product.nombre_producto,
          product.Snapshots ? product.Snapshots[product.Snapshots.length - 1]?.fecha_hora : '',
          product.alertas_faltantes,
          product.alertas_correctas
        ]);
        row.eachCell((cell, num) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      });
      workSheet.addRow([]);
      workSheet.addRow([]);
    });

    workBook.xlsx.writeBuffer().then((data) => {
      this.saveAs(data, `${report[0].nombre_tienda} - Pasillo ${report[0]?.id_pasillotienda} - Todos los anaqueles`);
    });
  }

  onGenerateExcelAlltoAll(report: any): void{
    const header = [
      'Tienda',
      'Pasillo',
      'Anaquel',
      'Producto',
      'Fecha',
      'Alertas Faltantes',
      'Alertas Correctas'
    ];

    const workBook = new Excel.Workbook();
    const workSheet = workBook.addWorksheet(`Reporte del ${report[0]?.fecha_inicial} al ${report[0]?.fecha_final}`);
    const titleRow = workSheet.addRow([`Reporte del ${report[0]?.fecha_inicial} al ${report[0]?.fecha_final}`]);
    const titleRow2 = workSheet.addRow([`${report[0]?.nombre_tienda} - Todos los pasillos`]);
    titleRow.font = { name : 'Arial black', family : 4, size: 16};
    titleRow2.font = { name : 'Arial black', family : 4, size: 16};
    workSheet.addRow([]);
    workSheet.addRow([]);
    workSheet.columns = [
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
      { width: 25 },
    ];
    workSheet.mergeCells('A1:C1');
    workSheet.mergeCells('A2:C2');

    report.forEach(pasillo => {
      const a = workSheet.addRow([`Pasillo ${pasillo.id_pasillotienda}`]);
      a.font = { name: 'Arial black', family: 4, size: 14 };
      const headerRow = workSheet.addRow(header);
      headerRow.eachCell((cell, num) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'f3f3f3' },
        };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
        cell.font = {
          name: 'Arial Black',
          color: { argb: '000000' },
          family: 2,
          size: 10,
          bold: true,
        };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
      });
      pasillo.Productos.forEach(product => {
        const row = workSheet.addRow([
          report[0]?.nombre_tienda,
          `Pasillo ${pasillo.id_pasillotienda}`,
          `Anaquel ${product.id_estante}`,
          product.nombre_producto,
          product.Snapshots ? product.Snapshots[product.Snapshots.length - 1]?.fecha_hora : '',
          product.alertas_faltantes,
          product.alertas_correctas
        ]);
        row.eachCell((cell, num) => {
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      });
      workSheet.addRow([]);
      workSheet.addRow([]);
    });

    workBook.xlsx.writeBuffer().then((data) => {
      this.saveAs(data, `${report[0]?.nombre_tienda} - Todos los pasillos`);
    });
  }

  private saveAs(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${EXCEL_EXT}`);
  }
}

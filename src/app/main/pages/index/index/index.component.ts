import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import * as dayjs from 'dayjs';
import { Aisle, Shelf, Store } from 'src/app/main/interfaces/store';
import { MainService } from 'src/app/main/services/main.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  form!: FormGroup;
  range = false;
  rangeFalse = false;
  title: string;
  desc: string;
  showInfo = false;
  allaisles = false;
  allshelfs = false;
  stores: Store[] = [];
  aisles: Aisle[] = [];
  shelfs: Shelf[] = [];
  data: any;
  loading = false;
  camera = '';
  constructor(private fb: FormBuilder,
              private notificationSvc: NotificationService,
              private mainSvc: MainService) { this.onBuildForm(); }

  ngOnInit(): void {
    this.onToggleValidators(this.range);
    this.onGetStores();
    this.getCamera();
  }

  onBuildForm(): void{
    this.form = this.fb.group({
      option: [1, [Validators.required]],
      date: ['', []],
      startDate: ['', []],
      endDate: ['', []],
      id_tienda: ['', [Validators.required]],
      id_pasillotienda: ['', [Validators.required]],
      id_estante: ['', [Validators.required]],
      allaisles: [false],
      allshelfs: [false],
    });
  }

  onChangeOption(value): void{
    // this.showInfo = false;
    this.rangeFalse = value === 2;
    this.onToggleValidators(this.rangeFalse);
  }

  onApplyFilters(): void{
    if (this.form.invalid) {
      this.notificationSvc
        .onOpenNotifcation({type: 'error', text: 'Verifica que hayas seleccionado la fecha o filtros de ubicacíon'});
      return;
    }
    this.onGetData();
  }


  onToggleValidators(range: boolean): void{
    if (range){

      this.form.get('startDate').setValidators([Validators.required]);
      this.form.get('startDate').updateValueAndValidity();

      this.form.get('endDate').setValidators([Validators.required]);
      this.form.get('endDate').updateValueAndValidity();

      this.form.get('date').clearValidators();
      this.form.get('date').updateValueAndValidity();
    }else{
      this.form.get('date').setValidators([Validators.required]);
      this.form.get('date').updateValueAndValidity();

      this.form.get('startDate').clearValidators();
      this.form.get('startDate').updateValueAndValidity();

      this.form.get('endDate').clearValidators();
      this.form.get('endDate').updateValueAndValidity();
    }
  }

  onGetData(): void{
    this.allaisles = this.form.get('allaisles').value;
    this.allshelfs = this.form.get('allshelfs').value;
    this.data = undefined;
    const dates = this.onFilterDates();
    this.loading = true;
    if (!this.allaisles && !this.allshelfs){
      this.mainSvc.onGetInfoOnetoOne(this.form.get('id_estante').value, dates.startDate, dates.endDate).subscribe((data) => {
        this.range = this.rangeFalse;
        this.data = data;
        this.loading = false;
        this.onShowData();
      }, errr => {
        this.loading = false;
      });
    }else if (!this.allaisles && this.shelfs){
      this.mainSvc.onGetInfoOnetoAll(this.form.get('id_pasillotienda').value, dates.startDate, dates.endDate).subscribe((data) => {
        this.range = this.rangeFalse;
        this.data = data;
        this.loading = false;
        this.onShowData();
      }, errr => {
        this.loading = false;
      });
    }else if (this.allaisles && this.allshelfs){
      this.mainSvc.onGetInfoAlltoAll(this.form.get('id_tienda').value, dates.startDate, dates.endDate).subscribe((data) => {
        this.range = this.rangeFalse;
        const datax = [];
        data.forEach(element => {
          let totalOk = 0;
          let totalMissing = 0;
          const products = [];
          const pass = {
            nombre_tienda : data[0]?.nombre_tienda,
            fecha_inicio : data[0]?.fecha_inicial,
            fecha_final : data[0]?.fecha_final,
            total_alertas_correctas: 0,
            total_alertas_faltantes: 0,
            id_pasillotienda: 0,
            Productos: []
          };
          element.Pasillos.forEach(pasillo => {
            totalOk += pasillo.total_alertas_correctas;
            totalMissing += pasillo.total_alertas_faltantes;
            pass.id_pasillotienda = pasillo.id_pasillotienda;
            pasillo.Productos.forEach(product => {
              products.push(product);
            });
          });
          pass.total_alertas_correctas = totalOk;
          pass.total_alertas_faltantes = totalMissing;
          pass.Productos = products;

          datax.push(pass);
        });
        this.data = datax;
        this.loading = false;
        this.onShowData();
      }, errr => {
        this.loading = false;
      });
    }

  }

  onChangeTexts(): void{
    if (this.range){
      this.title = 'Alertas por rango de fecha';
      this.desc = 'Se mostrarán el total de alertas emitidas durante el periodo de tiempo seleccionado, así como la gráfica comparativa del porcentaje total de correctas y faltantes.';
    }else{
      this.title = 'Alertas en 1 Día';
      this.desc = 'Se mostrarán el total de alertas emitidas durante el día seleccionado, así como la snapshot del momento en el que se disparó la alerta de un faltante.';
    }
  }

  onFilterDates(): any{
    if (this.rangeFalse){
      return { startDate: this.onFormatDate(this.form.get('startDate').value), endDate: this.onFormatDate(this.form.get('endDate').value) };
    }else{
      return { startDate : this.onFormatDate(this.form.get('date').value), endDate: this.onFormatDate(this.form.get('date').value) };
    }
  }

  onShowData(): void{
    this.showInfo = true;
    this.onChangeTexts();
    this.formGroupDirective.resetForm();
    this.onAllAisles(false);
    this.aisles = [];
    this.shelfs = [];
  }

  onFormatDate(date: Date): string{
    return dayjs(date).format('YYYY-MM-DD');
  }

  onGetStores(): void{
    this.mainSvc.onGetStores().subscribe((data) => {
      this.stores = data;
    });
  }

  onGetAisles(storeId: number): void{
    this.mainSvc.onGetAisles(storeId).subscribe((data) => {
      this.aisles = data;
    });
  }

  onGetShelfs(aisleId: number): void{
    this.mainSvc.onGetShelfs(aisleId).subscribe((data) => {
      this.shelfs = data;
    });
  }

  onAllAisles(value: boolean): void{
    if (value){
      this.form.get('id_pasillotienda').setValue(null);
      this.form.get('id_pasillotienda').clearValidators();
      this.form.get('id_pasillotienda').disable();

      this.form.get('allshelfs').setValue(true);
    }else{
      this.form.get('id_pasillotienda').enable();
      this.form.get('id_pasillotienda').setValidators([Validators.required]);
      this.form.get('allshelfs').setValue(false);
    }
    this.form.get('allshelfs').updateValueAndValidity();
    this.form.get('id_pasillotienda').updateValueAndValidity();
    this.onAllShelfs(value);
  }

  onAllShelfs(value: boolean): void{

    if (this.form.get('allaisles').value){
      this.form.get('allshelfs').setValue(true);
      value = this.form.get('allshelfs').value;
    }
    if (value){
      this.form.get('id_estante').setValue(null);
      this.form.get('id_estante').clearValidators();
      this.form.get('id_estante').disable();
    }else{
      this.form.get('id_estante').enable();
      this.form.get('id_estante').setValidators([Validators.required]);
    }
    this.form.get('id_estante').updateValueAndValidity();
  }

  getCamera():void{
    this.mainSvc.getCamera().subscribe((data) => {
      this.camera = data;
    })
  }

  onOpenCamera(): void{
    window.open(this.camera, '_blank');
  }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import * as dayjs from 'dayjs';
import { LocationFormComponent } from 'src/app/main/components/location-form/location-form.component';
import { DataService } from 'src/app/main/interfaces/data-response';
import { Aisle, Shelf, Store } from 'src/app/main/interfaces/store';
import { MainService } from 'src/app/main/services/main.service';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent implements OnInit {
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;
  form!: FormGroup;
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
              private notiSvc: NotificationService,
              private mainSvc: MainService) { this.onBuildForm(); }

  ngOnInit(): void {
    this.onGetStores();
  }

  onBuildForm(): void{
    this.form = this.fb.group({
      id_tienda: ['', [Validators.required]],
      id_pasillotienda: ['', [Validators.required]],
      id_estante: ['', [Validators.required]],
      allaisles: [false],
      allshelfs: [false],
    });
  }

  onApplyFilters(): void{
    if (this.form.invalid){
      this.notiSvc.onOpenNotifcation({ type: 'error', text: 'Veirifca que hayas seleccionado los filtos correctamente.' });
      return;
    }
    this.onGetData();
  }

  onGetData(): void{
    this.allaisles = this.form.get('allaisles').value;
    this.allshelfs = this.form.get('allshelfs').value;
    this.data = undefined;
    this.loading = true;
    const dates = this.onFilterDates();
    if (!this.allaisles && !this.allshelfs){
      this.mainSvc.onGetInfoOnetoOne(this.form.get('id_estante').value, dates.startDate, dates.endDate).subscribe((data) => {
        this.data = data;
        this.loading = false;
        this.onShowData();
      }, errr => {
        this.loading = false;
      });
    }else if (!this.allaisles && this.shelfs){
      this.mainSvc.onGetInfoOnetoAll(this.form.get('id_pasillotienda').value, dates.startDate, dates.endDate).subscribe((data) => {
        this.data = data;
        this.loading = false;
        this.onShowData();
      }, errr => {
        this.loading = false;
      });
    }else if (this.allaisles && this.allshelfs){
      this.mainSvc.onGetInfoAlltoAll(this.form.get('id_tienda').value, dates.startDate, dates.endDate).subscribe((data) => {
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

  onFilterDates(): any{
      return { startDate: this.onFormatDate(), endDate: this.onFormatDate() };
  }

  onShowData(): void{
    this.showInfo = true;
    this.formGroupDirective.resetForm();
    this.form.reset();
    this.onAllAisles(false);
    this.aisles = [];
    this.shelfs = [];
  }

  onFormatDate(): string{
    return dayjs().format('YYYY-MM-DD');
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

    // this.onAllShelfs(true);
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

  getCamera(): void{
    this.mainSvc.getCamera().subscribe((data) => {
      this.camera = data;
    });
  }

  onOpenCamera(): void{
    window.open(this.camera, '_blank');
  }

}

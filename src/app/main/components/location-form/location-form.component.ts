import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Aisle, Shelf, Store } from '../../interfaces/store';
import { MainService } from '../../services/main.service';

@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.scss']
})
export class LocationFormComponent implements OnInit {
  form!: FormGroup;
  stores: Store[] = [];
  aisles: Aisle[] = [];
  shelfs: Shelf[] = [];
  constructor(private fb: FormBuilder,
              private dialog: MatDialogRef<LocationFormComponent>,
              private mainSvc: MainService) { this.onBuildForms(); }

  ngOnInit(): void {
    this.onGetStores();
  }

  onResetForms(): void{
    this.form.get('anaquel').enable();
    this.form.get('pasillo').enable();
    this.form.reset();
  }

  onSendDataForms(): void{
    this.dialog.close(this.form.value);
  }

  onBuildForms(): void{
    this.form = this.fb.group({
      id_tienda: ['', [Validators.required]],
      id_pasillotienda: ['', [Validators.required]],
      id_estante: ['', [Validators.required]],
      allaisles: [false],
      allshelfs: [false],
    });
  }

  onAllShelfs(value: boolean): void{
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

  onAllAisles(value: boolean): void{
    if (value){
      this.form.get('id_pasillotienda').setValue(null);
      this.form.get('id_pasillotienda').clearValidators();
      this.form.get('id_pasillotienda').disable();
    }else{
      this.form.get('id_pasillotienda').enable();
      this.form.get('id_pasillotienda').setValidators([Validators.required]);
    }
    this.form.get('id_pasillotienda').updateValueAndValidity();
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

}

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceService } from '../../services/resource.service';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {
  image = '';
  loading = true;
  constructor(private resourceSvc: ResourceService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.resourceSvc.getImage(this.data.image).subscribe((data) => {
      this.loading = false;
      this.image = this.resourceSvc.generateResource(data, 'png');
    })
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileInfo, fileTypes } from '../interfaces/media';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private http: HttpClient) { }

  generateResource(image: any, extension: any): any {
    const { type } = this.getFileType(extension);
    const file = `data:${type};base64,${image}`;
    return file;
  }

  getFileType(extension: string): FileInfo {
    return fileTypes[extension];
  }

  getImage(path:string): Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/dashboard/bring/snapshot/${path}/`)
  }
}

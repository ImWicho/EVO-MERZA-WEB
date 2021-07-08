import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DataService } from '../interfaces/data-response';
import { Aisle, Shelf, Store } from '../interfaces/store';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  constructor(private http: HttpClient) { }


  onGetStores(): Observable<Store[]>{
    return this.http.get<Store[]>(`${environment.apiUrl}/dashboard/stores/`);
  }

  onGetAisles(storeId: number): Observable<Aisle[]>{
    return this.http.get<Aisle[]>(`${environment.apiUrl}/dashboard/store/${storeId}/aisles/`);
  }

  onGetShelfs(aisleId: number): Observable<Shelf[]>{
    return this.http.get<Shelf[]>(`${environment.apiUrl}/dashboard/aisle/${aisleId}/shelfs/`);
  }

  onGetInfoOnetoOne(shelfId: number, startDate: string, endDate: string): Observable<DataService>{
    return this.http.get<DataService>(`${environment.apiUrl}/dashboard/shelf/${shelfId}/history/${startDate}/${endDate}/`);
  }

  onGetInfoAlltoAll(storeId: number, startDate: string, endDate: string): Observable<any>{
    return this.http.get<any>
      (`${environment.apiUrl}/dashboard/store/${storeId}/all/aisles/shelfs/history/${startDate}/${endDate}/`);
  }

  onGetInfoOnetoAll(asileId: number, startDate: string, endDate: string): Observable<DataService>{
    return this.http.get<DataService>(`${environment.apiUrl}/dashboard/aisle/${asileId}/all/shelfs/history/${startDate}/${endDate}/`);
  }

  getCamera():Observable<string>{
    return this.http.get<string>(`${environment.apiUrl}/dashboard/show/camera/stream/`);
  }
}

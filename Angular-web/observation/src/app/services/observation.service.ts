// ===== services/data.service.ts =====
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { RootObject } from '../models/observation.model';

@Injectable({
  providedIn: 'root'
})
export class ObservationService {
  private baseUrl = 'https://localhost:7183/api/Observation';
  

  constructor(private http: HttpClient) {}

  getData(): Observable<RootObject[]> {
    return this.http.get<RootObject[]>(this.baseUrl);
  }

  saveData(data: RootObject): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
}

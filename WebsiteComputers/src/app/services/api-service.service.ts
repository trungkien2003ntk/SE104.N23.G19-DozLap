import { Injectable } from '@angular/core';
import {HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufacturer } from './manufacturer';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  baseUrl = "http://localhost:3000/";


  constructor(private http: HttpClient) { }

  getData(data:any): Observable<any> {
    return this.http.get(this.baseUrl + data);
  }

}

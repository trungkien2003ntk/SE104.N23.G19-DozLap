import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {


  apiurlChart='http://localhost:3000/sales';
  constructor(private http:HttpClient) { }
  

  Getchartinfo(){
    return this.http.get(this.apiurlChart);
  }
  
}

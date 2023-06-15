import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    })
  }
  
  baseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { }

  getData(link:any): Observable<any> {
    return this.http.get(this.baseUrl + link);
  }

  public postData(link: any, payload : any) : Observable<any>{
    const url = `${this.baseUrl}`+ link;
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  
  deleteData(link: any, id: number): Observable<any> {
    console.log("This is link!", this.baseUrl + link + '/' + id);
    return this.http.delete(this.baseUrl + link + '/' + id, this.httpOptions);
  }
}

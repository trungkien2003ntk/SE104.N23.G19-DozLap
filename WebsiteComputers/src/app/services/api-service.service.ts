import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  private httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    })
  }

  // public products:any;
  public products$: BehaviorSubject<any> = new BehaviorSubject(null);
  
  baseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient) { 
    this.initProduct();
  }

  // initProduct()
  // {
  //   const url = `${this.baseUrl}`+ 'product';
  //   this.http.get(url).subscribe((result:any) =>
  //     {
  //       this.products = result;
  //       console.log('this is all products!', this.products);
  //     }
  //   )
  // }

  initProduct() {
    const url = `${this.baseUrl}product`;
    this.http
      .get(url)
      .pipe(
        tap((result: any) => {
          this.products$.next(result);
        })
      )
      .subscribe((result: any) => {
        console.log('this is all products!', result);
      });
  }

  getProduct()
  {
    // return this.products;
    return this.products$.asObservable();
  }

  getData(link:any): Observable<any> {
    return this.http.get(this.baseUrl + link);
  }

  postData(link: any, payload : any) : Observable<any>{
    const url = `${this.baseUrl}`+ link;
    return this.http.post<any>(url, payload, this.httpOptions);
  }

  putData(link: any, id: number, payload: any): Observable<any> {
    const url = `${this.baseUrl}${link}/${id}`;
    return this.http.put(url, payload, this.httpOptions);
  }
  
  deleteData(link: any, id: number): Observable<any> {
    console.log("This is link!", this.baseUrl + link + '/' + id);
    return this.http.delete(this.baseUrl + link + '/' + id, this.httpOptions);
  }
}

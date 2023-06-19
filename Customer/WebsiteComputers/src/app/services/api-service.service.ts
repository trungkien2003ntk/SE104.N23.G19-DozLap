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
  public category$: BehaviorSubject<any> = new BehaviorSubject(null);
  public orderItem$: BehaviorSubject<any> = new BehaviorSubject(null);
  rate = <any>[];
  countProduct = 0;
  baseUrl = "https://dozlapapiasia.azurewebsites.net/api/";

  constructor(private http: HttpClient) { 
    this.initProduct();
    this.initCategory();
  }

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
        this.countProduct = result.length;
        // console.log('This is length' , this.countProduct);
        this.rate = result.map((product: any) => ({
          'id' : product.id,
          'rate': 0,
          'number' : 0
        }));
        this.initOrderItem();
      });
  }

  initCategory() {
    const url = `${this.baseUrl}product_category`;
    this.http
      .get(url)
      .pipe(
        tap((result: any) => {
          this.category$.next(result);
        })
      )
      .subscribe((result: any) => {
      });
  }

  // initOrderItem(){
  //   const url = `${this.baseUrl}order_item`;
  //   this.http
  //     .get(url)
  //     .pipe(
  //       tap((result: any) => {
  //         this.orderItem$.next(result);
  //       })
  //     )
  //     .subscribe((result: any) => {
  //       const index = this.rate.findIndex((rate:any) => rate.id === result.product_id);
  //       if (index !== -1) {
  //         this.rate[index].rate += result.rate;
  //       }
        
  //     });
  // }

  initOrderItem(){
    const url = `${this.baseUrl}order_item`;
    this.http
      .get(url)
      .pipe(
        tap((result: any) => {
          this.orderItem$.next(result);
        })
      )
      .subscribe((result: any[]) => {
        result.forEach((item:any) => {
          const index = this.rate.findIndex((rate:any) => {
            return rate.id === item.product_id}
          );
          
          if (index !== -1) {
            if (item.rate != 0){
              this.rate[index].rate += item.rate;
              this.rate[index].number += 1;
              // console.log('Rate id', this.rate[index].id);
              // console.log('Rate rate', this.rate[index].rate);
              // console.log('Rate number', this.rate[index].number);
            }
          }
        });
      }, (error: any) => {
        console.log(error);
      }, () => {
        this.setRate();
      });
  }

  setRate(){
    const products = this.products$.getValue();
    this.rate.forEach((rate: any) => {
      // console.log('Rate id', rate.id);
      // console.log('Rate rate', rate.rate);
      // console.log('Rate number', rate.number);
      const product = products.find((p: any) => p.id === rate.id);
      if (product) {
        if (rate.number != 0){

          product.rate = rate.rate / rate.number;
        }
        else{
          product.rate = 0
        }
      }
    });
    this.products$.next(products);
    // console.log('this is product array', this.products$);
  }

  getProduct()
  {
    return this.products$.asObservable();
  }

  getCategory()
  {
    return this.category$.asObservable();
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
    // console.log('This is put link', url);
    return this.http.put(url, payload, this.httpOptions);
  }
  
  deleteData(link: any, id: number): Observable<any> {
    // console.log("This is delete link!", this.baseUrl + link + '/' + id);
    return this.http.delete(this.baseUrl + link + '/' + id, this.httpOptions);
  }
}

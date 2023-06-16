import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private _http: HttpClient) { }

  apiurlCategory='http://localhost:3000/category';
  apiurlProduct='http://localhost:3000/product';
  apiurlOrder='http://localhost:3000/order';
  apiurlCustomer='http://localhost:3000/customer';

  apiurl='http://localhost:3000/manufacturer';
  


  addManu(data: any): Observable<any>{
    return this._http.post(this.apiurl, data);
  }

  updateManu(id:number, data: any): Observable<any>{
    return this._http.put(`${this.apiurl}/${id}`, data);
  }

  getManuList(): Observable<any>{
    return this._http.get(this.apiurl);
  }

  deleteManu(id: number): Observable<any>{
    return this._http.delete(`${this.apiurl}/${id}`);
  }

  //Category

  addCate(data: any): Observable<any>{
    return this._http.post(this.apiurlCategory, data);
  }

  updateCate(id:number, data: any): Observable<any>{
    return this._http.put(`${this.apiurlCategory}/${id}`, data);
  }

  getCateList(): Observable<any>{
    return this._http.get(this.apiurlCategory);
  }

  deleteCate(id: number): Observable<any>{
    return this._http.delete(`${this.apiurlCategory}/${id}`);
  }

  //Product

  addProd(data: any): Observable<any>{
    return this._http.post(this.apiurlProduct, data);
  }

  updateProd(id:number, data: any): Observable<any>{
    return this._http.put(`${this.apiurlProduct}/${id}`, data);
  }

  getProdList(): Observable<any>{
    return this._http.get(this.apiurlProduct);
  }

  deleteProd(id: number): Observable<any>{
    return this._http.delete(`${this.apiurlProduct}/${id}`);
  }

  //Customer
  addCust(data: any): Observable<any>{
    return this._http.post(this.apiurlCustomer, data);
  }

  updateCust(id:number, data: any): Observable<any>{
    return this._http.put(`${this.apiurlCustomer}/${id}`, data);
  }

  getCustList(): Observable<any>{
    return this._http.get(this.apiurlCustomer);
  }

  deleteCust(id: number): Observable<any>{
    return this._http.delete(`${this.apiurlCustomer}/${id}`);
  }

  //Order
  addOrder(data: any): Observable<any>{
    return this._http.post(this.apiurlOrder, data);
  }

  updateOrder(id:number, data: any): Observable<any>{
    return this._http.put(`${this.apiurlOrder}/${id}`, data);
  }

  getOrderList(): Observable<any>{
    return this._http.get(this.apiurlOrder);
  }

  deleteOrder(id: number): Observable<any>{
    return this._http.delete(`${this.apiurlOrder}/${id}`);
  }

}

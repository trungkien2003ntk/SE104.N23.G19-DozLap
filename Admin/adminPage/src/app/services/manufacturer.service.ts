import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, forkJoin, switchMap, of, catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private _http: HttpClient) { }

  // apiurlCategory='http://localhost:3000/category';
  // apiurlProduct='http://localhost:3000/product';
  // apiurlOrder='http://localhost:3000/orders';
  // apiurlCustomer='http://localhost:3000/customer';
  // apiurlOrderItem='http://localhost:3000/order_item';
  // apiurlAddress='http://localhost:3000/address';
  // apiurlProvince='http://localhost:3000/province';

  apiurlCategory='https://dozlapapiasia.azurewebsites.net/api/product_category';
  apiurlProduct='https://dozlapapiasia.azurewebsites.net/api/product';
  apiurlOrder='https://dozlapapiasia.azurewebsites.net/api/orders';
  apiurlCustomer='https://dozlapapiasia.azurewebsites.net/api/customer';
  apiurlOrderItem='https://dozlapapiasia.azurewebsites.net/api/order_item';
  apiurlAddress='https://dozlapapiasia.azurewebsites.net/api/address';
  apiurlProvince='https://dozlapapiasia.azurewebsites.net/api/province';
  



  apiurl='http://localhost:3000/manufacturer';
  

  addOrderDetail(data: any): Observable<any>{
    return this._http.post(this.apiurlOrderItem, data);
  }

  getOrderItemsByOrderId(orderId: number): Observable<any> {
    // return this._http.get(`${this.apiurlOrderItem}?order_id=${orderId}`);
    return this._http.get(`${this.apiurlOrderItem}/order/${orderId}`);
  }
  

  updateOrderDetail(id:number, data: any): Observable<any>{
    return this._http.put(`${this.apiurlOrderItem}/${id}`, data);
  }

  getOrderdetail(): Observable<any>{
    return this._http.get(this.apiurlOrderItem);
  }

  deleteOrderDetail(id: number): Observable<any>{
    return this._http.delete(`${this.apiurlOrderItem}/${id}`);
  }

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

  getCateIdList(): Observable<number[]> {
    return this._http.get<any[]>(`${this.apiurlCategory}`).pipe(
      map(categories => categories.map(category => category.id))
    );
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

  getRecentOrders(limit: number = 5): Observable<any> {
    return this._http.get(`${this.apiurlOrder}?_sort=id&_order=desc&_limit=${limit}`);
  }

  getOrderById(id: any): Observable<any> {
    return this._http.get(`${this.apiurlOrder}/${id}`);
  }

  getOrderQuantity(): Observable<number> {
    return this._http.get<any[]>(`${this.apiurlOrder}`).pipe(
      map(orders => orders.length)
    );
  }
  getProdQuantity(): Observable<number> {
    return this._http.get<any[]>(`${this.apiurlProduct}`).pipe(
      map(products => products.length)
    );
  }

  getCustQuantity(): Observable<number> {
    return this._http.get<any[]>(`${this.apiurlCustomer}`).pipe(
      map(customs => customs.length)
    );
  }

  getTotalOrdersPrice(): Observable<number> {
    return this._http.get<any[]>(`${this.apiurlOrder}`).pipe(
      map(orders => orders.reduce((sum, order) => sum + Number(order.total_price), 0))
    );
  }

  getTotalPricesByYear(year: number): Observable<number[]> {
    // Gửi yêu cầu HTTP GET đến API để lấy danh sách order
    return this._http.get(this.apiurlOrder).pipe(
      map((response: any) => {
        const totalPriceByMonth = new Array(12).fill(0); // Khởi tạo mảng chứa tổng total_price theo từng tháng
  
        // Lặp qua danh sách order
        response.forEach((order: any) => {
          const orderDate = new Date(order.created_on_utc);
          if (orderDate.getFullYear() === year) {
            const month = orderDate.getMonth();
            totalPriceByMonth[month] += Number(order.total_price); // Cộng total_price vào tháng tương ứng
          }
        });
  
        return totalPriceByMonth;
      })
    );
  }


  getCategoryNames(): Observable<string[]> {
    return this._http.get<any[]>(this.apiurlCategory).pipe(
      map(categories => categories.map(category => category.name))
    );
  }

  getCategoryCounts(): Observable<number[]> {
    return this._http.get<any[]>(this.apiurlProduct).pipe(
      map(products => {
        const categoryCountsMap = new Map<number, number>();
  
        products.forEach(product => {
          const categoryId = product.category_id;
          if (categoryId) {
            categoryCountsMap.set(categoryId, (categoryCountsMap.get(categoryId) ?? 0) + 1);
          }
        });
  
        const categoryCounts: number[] = Array.from(categoryCountsMap.values());
  
        return categoryCounts;
      })
    );
  }

  getTopPurchasedProducts(): Observable<{ name: string, quantity: number }[]> {
    const orderItems$ = this._http.get<any[]>(this.apiurlOrderItem);
    const products$ = this._http.get<any[]>(this.apiurlProduct);
  
    return forkJoin([orderItems$, products$]).pipe(
      map(([orderItems, products]) => {
        const productMap = new Map<number, string>();
        const productQuantityMap = new Map<number, number>();
  
        orderItems.forEach((orderItem: any) => {
          const productId = orderItem.product_id;
          const quantity = orderItem.quantity;
  
          if (productQuantityMap.has(productId)) {
            productQuantityMap.set(productId, productQuantityMap.get(productId) + quantity);
          } else {
            productQuantityMap.set(productId, quantity);
          }
        });
  
        products.forEach((product: any) => {
          const productId = product.id;
          const productName = product.name;
  
          productMap.set(productId, productName);
        });
  
        const topProducts: { name: string, quantity: number }[] = [];
  
        productQuantityMap.forEach((quantity, productId) => {
          const productName = productMap.get(productId);
  
          if (productName) {
            topProducts.push({ name: productName, quantity: quantity });
          }
        });
  
        topProducts.sort((a, b) => b.quantity - a.quantity);
        return topProducts.slice(0, 5);
      })
    );
  }

  updateTotalPrice(orderId: number, totalPrice: number): Observable<any> {
    const data = { total_price: totalPrice };
    console.log(data);
    return this._http.patch(`${this.apiurlOrder}/${orderId}`, data);
  }  

  getShipFee(addressId: number): Observable<number> {
    return this._http.get<any>(`${this.apiurlAddress}/${addressId}`).pipe(
      switchMap((address: any) => {
        const provinceId = address.province_id;
        return this._http.get<any>(`${this.apiurlProvince}/${provinceId}`).pipe(
          map((province: any) => province.shipping_charge),
          catchError(() => of(0)) // Trả về 0 nếu có lỗi trong quá trình lấy giá ship của province
        );
      }),
      catchError(() => of(0)) // Trả về 0 nếu có lỗi trong quá trình lấy địa chỉ
    );
  }
  
  calculateOrderTotalPrice(orderId: number): Observable<number> {
    return this._http.get<any[]>(`${this.apiurlOrderItem}/order/${orderId}`).pipe(
      switchMap((orderItems: any[]) => {
        if (orderItems.length === 0) {
          return of(0); // Trả về 0 nếu không có order items nào
        }
        
        const productIds = orderItems.map(orderItem => orderItem.product_id);
        console.log(productIds);
        
        const requests = productIds.map(productId => this._http.get<any>(`${this.apiurlProduct}/${productId}`));
  
        return forkJoin(requests).pipe(
          map((products: any[]) => {
            console.log(products);
            let totalPrice = 0;
            orderItems.forEach((orderItem, index) => {
              const product = products[index];
              if (product) {
                totalPrice += Number(product.price) * Number(orderItem.quantity);
              }
            });
            return totalPrice;
          })
        );
      })
    );
  }
  
  
  
}

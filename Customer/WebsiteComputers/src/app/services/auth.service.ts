import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  apiurl = 'https://dozlapapiasia.azurewebsites.net/api/customer/';

  registerUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata);
  }
  getUserbyCode(id: any) {
    return this.http.get(this.apiurl + id);
  }
  getAll() {
    return this.http.get(this.apiurl);
  }
  updateuser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + id, inputdata);
  }
  isloggedin() {
    return sessionStorage.getItem('id') != null;
  }
}

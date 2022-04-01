import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeService {
  prefix = "/back-office";
  constructor(private http: HttpClient) { }

  getUsers() {
    var c = 'http://localhost:1010'+this.prefix+'/get-users';
    console.log(c);
    return this.http.get(c);
  }

  login(user: any) {
    return this.http.post("http://localhost:1010"+this.prefix+"/login", user);
  }    
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BackOfficeService {
  prefix = "/back-office";
  nomdomaine = "http://localhost:1010";
  constructor(private http: HttpClient) { }

  getUsers() {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/get-users';    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }

  getUsers_(page: String) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/get-users/'+page;    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }  

  login(user: any) {
    return this.http.post(this.nomdomaine+this.prefix+"/login", user);
  }
  
  logout(){
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/signout';    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }

  dataForm(){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    var c = this.nomdomaine+this.prefix+'/user/create';    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });     
  }
  
  createUser(user:any){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    return this.http.post(this.nomdomaine+this.prefix+"/user/create", user, {
      headers: header,
      //withCredentials: true
    });      
  }
  getUser(id) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/get-user/'+id;    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }  

  getUpdateUser(id) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/user/update/'+id;    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }    

  updateUser(user:any){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    return this.http.put(this.nomdomaine+this.prefix+"/user/update", user, {
      headers: header,
      //withCredentials: true
    });      
  }
  
  deleteUser(id) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/user/'+id;    
    return this.http.delete(c, {
      headers: header,
      //withCredentials: true
    });
  }  
}

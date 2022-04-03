import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as myGlobals from '../../main'; 

@Injectable({
  providedIn: 'root'
})
export class BackOfficeService {
  prefix = myGlobals.API_PREFIX_BACKEND;
  nomdomaine = myGlobals.API_HOSTNAME;
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

  /*getUsers_(page: String) {
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

  getUsersOrder(page: String, type: String, order: String) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/get-users/'+page+'/'+type+'/'+order;    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }  */
  
  searchUsers(page: String, type: String, order: String, critere: any) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/search-users/'+page+'/'+type+'/'+order;    
    return this.http.post(c, critere,  {
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

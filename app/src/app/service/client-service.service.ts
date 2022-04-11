import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../main'; 

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  nomdomaine = myGlobals.API_HOSTNAME;

  constructor(private http: HttpClient) { }

  authentification() {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+'/authentification';    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }
  
  getPlats() {  
    var c = this.nomdomaine+'/get-plats';    
    return this.http.get(c);
  }

  /////TEMPLATE RECHERCHE
  searchPlats(page: String, type: String, order: String, critere: any) {
    var c = this.nomdomaine+'/search-plats/'+page+'/'+type+'/'+order;    
    return this.http.post(c, critere);
  }  
  
/////TEMPLATE FICHE
getPlat(id) {
  var c = this.nomdomaine+'/get-plat/'+id;    
  return this.http.get(c);
}

  /////TEMPLATE CREATE
  createUser(user:any){
    return this.http.post(this.nomdomaine+"/signup", user);      
  }

 /////TEMPLATE DATA FROM CREATE
 dataForm(){
  var c = this.nomdomaine+'/signup-form';    
  return this.http.get(c);     
}  
}


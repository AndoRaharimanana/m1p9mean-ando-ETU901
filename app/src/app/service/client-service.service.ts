import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../../main'; 

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {
  nomdomaine = myGlobals.API_HOSTNAME;

  constructor(private http: HttpClient) { }

  getPlats() {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+'/get-plats';    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }

  /////TEMPLATE RECHERCHE
  searchPlats(page: String, type: String, order: String, critere: any) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+'/search-plats/'+page+'/'+type+'/'+order;    
    return this.http.post(c, critere,  {
      headers: header,
      //withCredentials: true
    });
  }  
  
/////TEMPLATE FICHE
getPlat(id) {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+'/get-plat/'+id;    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}   
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as myGlobals from '../../main'; 

@Injectable({
  providedIn: 'root'
})
export class RestoService {
  prefix = myGlobals.API_PREFIX_RESTO;
  nomdomaine = myGlobals.API_HOSTNAME;
  constructor(private http: HttpClient) { }

////////CRUD CATEGORIEPLAT START///



getRestoUser() {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/choose';    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}  


////////CRUD PLAT START///


/////TEMPLATE  UPDATE
publishPlat(plat:any){
  var resto = JSON.parse(localStorage.getItem("resto"));
  var restoid = null;
  if (resto != null) restoid = resto.id;
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });  
  return this.http.put(this.nomdomaine+this.prefix+"/plat/config/publish/"+restoid, plat, {
    headers: header,
    //withCredentials: true
  });      
}  

/////TEMPLATE  UPDATE
  configPlat(plat:any){
    var resto = JSON.parse(localStorage.getItem("resto"));
    var restoid = null;
    if (resto != null) restoid = resto.id;
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    return this.http.put(this.nomdomaine+this.prefix+"/plat/config/"+restoid, plat, {
      headers: header,
      //withCredentials: true
    });      
  }

getPlatsInfo(id: String) {
  var resto = JSON.parse(localStorage.getItem("resto"));
  var restoid = null;
  if (resto != null) restoid = resto.id;
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/plat/config/'+restoid+'/'+id;    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}
  
  
  /////TEMPLATE FINDALL
  getPlats() {
    var resto = JSON.parse(localStorage.getItem("resto"));
    var restoid = null;
    if (resto != null) restoid = resto.id;
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/get-plats/'+restoid;    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }
  
  
  /////TEMPLATE RECHERCHE
  searchPlats(page: String, type: String, order: String, critere: any) {
    var resto = JSON.parse(localStorage.getItem("resto"));
    var restoid = null;
    if (resto != null) restoid = resto.id;
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/search-plats/'+restoid+'/'+page+'/'+type+'/'+order;    
    return this.http.post(c, critere,  {
      headers: header,
      //withCredentials: true
    });
  }  
  
  
  /////TEMPLATE CREATE
  createPlat(plat:any){
    var resto = JSON.parse(localStorage.getItem("resto"));
    var restoid = null;
    if (resto != null) restoid = resto.id;
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    return this.http.post(this.nomdomaine+this.prefix+"/plat/create/"+restoid, plat, {
      headers: header,
      //withCredentials: true
    });      
  }
  
    /////TEMPLATE  UPDATE
    updatePlat(plat:any){
      var resto = JSON.parse(localStorage.getItem("resto"));
      var restoid = null;
      if (resto != null) restoid = resto.id;
      const header = new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      });  
      return this.http.put(this.nomdomaine+this.prefix+"/plat/update/"+restoid, plat, {
        headers: header,
        //withCredentials: true
      });      
    }
    
    /////TEMPLATE DELETE
    deletePlat(id) {
      var resto = JSON.parse(localStorage.getItem("resto"));
      var restoid = null;
      if (resto != null) restoid = resto.id;
      console.log(localStorage.getItem('token'));
      const header = new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      });    
      console.log(header);
      var c = this.nomdomaine+this.prefix+'/plat/'+restoid+'/'+id;    
      return this.http.delete(c, {
        headers: header,
        //withCredentials: true
      });
    }  
  
  /////TEMPLATE FICHE
  getPlat(id) {
    var resto = JSON.parse(localStorage.getItem("resto"));
    var restoid = null;
    if (resto != null) restoid = resto.id;
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/get-plat/'+restoid+'/'+id;    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }  
  
  /////TEMPLATE DATA FROM UPDATE
  getUpdatePlat(id) {
    var resto = JSON.parse(localStorage.getItem("resto"));
    var restoid = null;
    if (resto != null) restoid = resto.id;
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/plat/update/'+restoid+'/'+id;    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
    
  }

  /////TEMPLATE DATA FROM CREATE
  dataFormPlat(){
    var resto = JSON.parse(localStorage.getItem("resto"));
    var restoid = null;
    if (resto != null) restoid = resto.id;    
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    var c = this.nomdomaine+this.prefix+'/plat/create/'+restoid;    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });     
  }  
  
  
  /////CRUD PLAT END//  
}

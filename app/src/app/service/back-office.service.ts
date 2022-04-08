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

  login(user: any) {
    return this.http.post(this.nomdomaine+this.prefix+"/login", user);
  }
  
  logout(origin: any){
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/signout/'+origin;    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });
  }

  

/////CRUD USER START//

/////TEMPLATE FINDALL
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
  
  
  /////TEMPLATE RECHERCHE
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


  /////TEMPLATE CREATE
  createUser(user:any){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    return this.http.post(this.nomdomaine+this.prefix+"/user/create", user, {
      headers: header,
      //withCredentials: true
    });      
  }

    /////TEMPLATE  UPDATE
    updateUser(user:any){
      const header = new HttpHeaders({
        'Authorization': localStorage.getItem('token')
      });  
      return this.http.put(this.nomdomaine+this.prefix+"/user/update", user, {
        headers: header,
        //withCredentials: true
      });      
    }
    
    /////TEMPLATE DELETE
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

  /////TEMPLATE FICHE
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

  /////TEMPLATE DATA FROM UPDATE
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

  /////TEMPLATE DATA FROM CREATE
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


  /////CRUD USER END//

/////CRUD RESTO START///

/////TEMPLATE FINDALL
getRestos() {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/get-restos';    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}


/////TEMPLATE RECHERCHE
searchRestos(page: String, type: String, order: String, critere: any) {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/search-restos/'+page+'/'+type+'/'+order;    
  return this.http.post(c, critere,  {
    headers: header,
    //withCredentials: true
  });
}  


/////TEMPLATE CREATE
createResto(resto:any){
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });  
  return this.http.post(this.nomdomaine+this.prefix+"/resto/create", resto, {
    headers: header,
    //withCredentials: true
  });      
}

  /////TEMPLATE  UPDATE
  updateResto(resto:any){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    return this.http.put(this.nomdomaine+this.prefix+"/resto/update", resto, {
      headers: header,
      //withCredentials: true
    });      
  }
  
  /////TEMPLATE DELETE
  deleteResto(id) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/resto/'+id;    
    return this.http.delete(c, {
      headers: header,
      //withCredentials: true
    });
  }  

/////TEMPLATE FICHE
getResto(id) {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/get-resto/'+id;    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}  

/////TEMPLATE DATA FROM UPDATE
getUpdateResto(id) {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/resto/update/'+id;    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}  

  /////TEMPLATE DATA FROM CREATE
  dataFormResto(){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    var c = this.nomdomaine+this.prefix+'/resto/create';    
    return this.http.get(c, {
      headers: header,
      //withCredentials: true
    });     
  }

  removeResto(resto:any){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    return this.http.put(this.nomdomaine+this.prefix+"/resto/removeuser", resto, {
      headers: header,
      //withCredentials: true
    });      
  }  

//////CRUD RESTO END///


/////CRUD ROLE START///

/////TEMPLATE FINDALL
getRoles() {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/get-roles';    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}


/////TEMPLATE RECHERCHE
searchRoles(page: String, type: String, order: String, critere: any) {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/search-roles/'+page+'/'+type+'/'+order;    
  return this.http.post(c, critere,  {
    headers: header,
    //withCredentials: true
  });
}  


/////TEMPLATE CREATE
createRole(role:any){
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });  
  return this.http.post(this.nomdomaine+this.prefix+"/role/create", role, {
    headers: header,
    //withCredentials: true
  });      
}

  /////TEMPLATE  UPDATE
  updateRole(role:any){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    return this.http.put(this.nomdomaine+this.prefix+"/role/update", role, {
      headers: header,
      //withCredentials: true
    });      
  }
  
  /////TEMPLATE DELETE
  deleteRole(id) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/role/'+id;    
    return this.http.delete(c, {
      headers: header,
      //withCredentials: true
    });
  }  

/////TEMPLATE FICHE
getRole(id) {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/get-role/'+id;    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}  

/////TEMPLATE DATA FROM UPDATE
getUpdateRole(id) {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/role/update/'+id;    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}  


//////CRUD ROLE END///



////////CRUD VILLE START///




/////TEMPLATE FINDALL
getVilles() {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/get-villes';    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}


/////TEMPLATE RECHERCHE
searchVilles(page: String, type: String, order: String, critere: any) {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/search-villes/'+page+'/'+type+'/'+order;    
  return this.http.post(c, critere,  {
    headers: header,
    //withCredentials: true
  });
}  


/////TEMPLATE CREATE
createVille(ville:any){
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });  
  return this.http.post(this.nomdomaine+this.prefix+"/ville/create", ville, {
    headers: header,
    //withCredentials: true
  });      
}

  /////TEMPLATE  UPDATE
  updateVille(ville:any){
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    return this.http.put(this.nomdomaine+this.prefix+"/ville/update", ville, {
      headers: header,
      //withCredentials: true
    });      
  }
  
  /////TEMPLATE DELETE
  deleteVille(id) {
    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/ville/'+id;    
    return this.http.delete(c, {
      headers: header,
      //withCredentials: true
    });
  }  

/////TEMPLATE FICHE
getVille(id) {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/get-ville/'+id;    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}  

/////TEMPLATE DATA FROM UPDATE
getUpdateVille(id) {
  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/ville/update/'+id;    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}  



/////CRUD VILLE END//



//////CRUD CATEGORIE PLAT START////



/////TEMPLATE FINDALL
getCategorieplats() {

  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/get-categorieplats';    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}


/////TEMPLATE RECHERCHE
searchCategorieplats(page: String, type: String, order: String, critere: any) {

  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/search-categorieplats/'+page+'/'+type+'/'+order;    
  return this.http.post(c, critere,  {
    headers: header,
    //withCredentials: true
  });
}  


/////TEMPLATE CREATE
createCategorieplat(categorieplat:any){

  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });  
  return this.http.post(this.nomdomaine+this.prefix+"/categorieplat/create", categorieplat, {
    headers: header,
    //withCredentials: true
  });      
}

  /////TEMPLATE  UPDATE
  updateCategorieplat(categorieplat:any){

    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });  
    return this.http.put(this.nomdomaine+this.prefix+"/categorieplat/update", categorieplat, {
      headers: header,
      //withCredentials: true
    });      
  }
  
  /////TEMPLATE DELETE
  deleteCategorieplat(id) {

    console.log(localStorage.getItem('token'));
    const header = new HttpHeaders({
      'Authorization': localStorage.getItem('token')
    });    
    console.log(header);
    var c = this.nomdomaine+this.prefix+'/categorieplat/'+id;    
    return this.http.delete(c, {
      headers: header,
      //withCredentials: true
    });
  }  

/////TEMPLATE FICHE
getCategorieplat(id) {

  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/get-categorieplat/'+id;    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}  

/////TEMPLATE DATA FROM UPDATE
getUpdateCategorieplat(id) {

  console.log(localStorage.getItem('token'));
  const header = new HttpHeaders({
    'Authorization': localStorage.getItem('token')
  });    
  console.log(header);
  var c = this.nomdomaine+this.prefix+'/categorieplat/update/'+id;    
  return this.http.get(c, {
    headers: header,
    //withCredentials: true
  });
}  



/////CRUD CATEGORIEPLAT END//  


/////CRUD CATEGORIE PLAT END///////
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
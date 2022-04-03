import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }

  signin(user, token){
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  }

  signout(){
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  }

}

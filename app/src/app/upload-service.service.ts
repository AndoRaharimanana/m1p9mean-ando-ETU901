import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as myGlobals from '../main'; 
@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {
  nomdomaine = myGlobals.API_HOSTNAME;
  constructor(private http: HttpClient) { }

  uploadImage(user: any) {
    return this.http.post(this.nomdomaine+"/upload-test", user);
  }  
}

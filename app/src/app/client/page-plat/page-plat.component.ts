import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientServiceService } from './../../service/client-service.service';
import { WINDOW } from './../../window.providers';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-page-plat',
  templateUrl: './page-plat.component.html',
  styleUrls: ['./page-plat.component.css']
})
export class PagePlatComponent implements OnInit {

  id: String;
  plat: any;
  domainename= this.window.location.hostname;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: ClientServiceService, private router: Router, @Inject(WINDOW) private window: Window, private spinner: NgxSpinnerService, private http: HttpClient) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getPlat(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.plat = data['data'][0];            
       }else if(data['status'] === 201){
        this.router.navigate(['/']);  
       }else{
        
       }     
       this.spinner.hide();   
     },
     err => {
       console.log("errorr");
       this.router.navigate(['/']);  
       this.spinner.hide(); 
     });           
  }
}

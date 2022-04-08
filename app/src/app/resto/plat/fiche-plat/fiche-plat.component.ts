import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from '../../../service/resto.service';
import { WINDOW } from '../../../window.providers';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import { UploadServiceService } from '../../../upload-service.service';

@Component({
  selector: 'app-fiche-plat',
  templateUrl: './fiche-plat.component.html',
  styleUrls: ['./fiche-plat.component.css']
})
export class FichePlatComponent implements OnInit {

  id: String;
  plat: any;
  domainename= this.window.location.hostname;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: RestoService, private router: Router, @Inject(WINDOW) private window: Window, private spinner: NgxSpinnerService, private http: HttpClient, private uploadService: UploadServiceService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getPlat(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.plat = data['data'][0];            
       }
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin/resto']);  
       }else if(data['status'] === 201){
        this.router.navigate(['/access-admin/resto/choose']);  
       }else{
        
       }     
       this.spinner.hide();   
     },
     err => {
       console.log("errorr");
       this.router.navigate(['/access-admin/resto']);  
       this.spinner.hide(); 
     });           
  }
  deletePlat(id){
    this.spinner.show();
    this.apiService.deletePlat(id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.router.navigate(['/access-admin/resto/list-plats']);  
       }
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin/resto']);  
       }else if(data['status'] === 201){
        this.router.navigate(['/access-admin/resto/choose']);  
       }else{
        
       }       
       this.spinner.hide(); 
     },
     err => {
       console.log("errorr");
       this.router.navigate(['/access-admin/resto']);  
       this.spinner.hide(); 
     });       
  }
  
  updateImage(form: NgForm) {
    this.spinner.show();
    console.log(form.value);
    this.uploadService.uploadImage(form.value).subscribe((data) => {      
      console.log(data);
      if(data != null){
        
      }
                this.spinner.hide();
    })
}

}

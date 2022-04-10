import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from '../../../service/resto.service';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  id: String;
  plat: any;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: RestoService, private router: Router, private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getPlatsInfo(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        console.log(data);
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
  
  onSubmit(form: NgForm) {
    this.spinner.show();
    console.log(form.value);
    this.apiService.configPlat(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/resto/fiche-plats/'+this.id]);  
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
    })
  }  



}

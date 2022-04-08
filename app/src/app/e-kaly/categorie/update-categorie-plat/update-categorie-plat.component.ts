import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-update-categorie-plat',
  templateUrl: './update-categorie-plat.component.html',
  styleUrls: ['./update-categorie-plat.component.css']
})
export class UpdateCategoriePlatComponent implements OnInit {

  id: String;
  categorieplat: any;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: BackOfficeService, private router: Router, private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getUpdateCategorieplat(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        console.log(data);
        this.categorieplat = data['data'];                              
       }
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin']);  
       }else{
        
       } 
       this.spinner.hide();       
     },
     err => {
       console.log("errorr");
       this.router.navigate(['/access-admin']);  
       this.spinner.hide(); 
     });        
  }
  
  onSubmit(form: NgForm) {
    this.spinner.show();
    console.log(form.value);
    this.apiService.updateCategorieplat(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/auth/fiche-categorieplats/'+this.id]);  
       }
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin']);  
       }else{
        
       }   
       this.spinner.hide();       
    },
    err => {
      console.log("errorr");
      this.router.navigate(['/access-admin']);  
      this.spinner.hide(); 
    })
  }  


}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from '../../../service/resto.service';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-update-plat',
  templateUrl: './update-plat.component.html',
  styleUrls: ['./update-plat.component.css']
})
export class UpdatePlatComponent implements OnInit {

  id: String;
  plat: any;
  categories: any;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: RestoService, private router: Router, private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getUpdatePlat(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        console.log(data);
        this.plat = data['data'];  
        this.categories = data['dataform'];                              
       }
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin/resto']);  
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
    this.apiService.updatePlat(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/resto/fiche-plats/'+this.id]);  
       }
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin/resto']);  
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

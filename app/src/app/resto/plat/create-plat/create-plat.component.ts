import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoService } from '../../../service/resto.service';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-create-plat',
  templateUrl: './create-plat.component.html',
  styleUrls: ['./create-plat.component.css']
})
export class CreatePlatComponent implements OnInit {
  categories: any;
  constructor(private apiService: RestoService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.dataFormPlat().subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        console.log(data['data']);    
        this.categories = data['data'];       
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
    this.apiService.createPlat(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/resto/fiche-plats/'+data['data']._id]);  
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

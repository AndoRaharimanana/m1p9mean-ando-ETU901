import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-create-resto',
  templateUrl: './create-resto.component.html',
  styleUrls: ['./create-resto.component.css']
})
export class CreateRestoComponent implements OnInit {
  villes: any;
  constructor(private apiService: BackOfficeService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.dataFormResto().subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        console.log(data['data']);    
        this.villes = data['data'];       
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
    this.apiService.createResto(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/auth/fiche-restos/'+data['data']._id]);  
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

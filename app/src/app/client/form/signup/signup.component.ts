import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClientServiceService } from '../../../service/client-service.service';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";
import 'flowbite';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  villes: any;
  constructor(private apiService: ClientServiceService, private router: Router, private spinner: NgxSpinnerService) { }
  ngOnInit(): void {
    this.spinner.show();
    this.apiService.dataForm().subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        console.log(data['data']);    
        this.villes = data['data'];      
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

  onSubmit(form: NgForm) {
    this.spinner.show();
    console.log(form.value);
    this.apiService.createUser(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/']);  
        //this.router.navigate(['/access-admin/auth/list-users']);  
       }else{
        
       }      
       this.spinner.hide();    
    },
    err => {
      console.log("errorr");
      this.router.navigate(['/']); 
      this.spinner.hide();  
    })
}


}

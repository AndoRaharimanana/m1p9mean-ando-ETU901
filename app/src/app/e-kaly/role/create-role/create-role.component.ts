import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  constructor(private apiService: BackOfficeService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(()=>{
      this.spinner.hide(); 
    }, 5000);
  }

  onSubmit(form: NgForm) {
    this.spinner.show();
    console.log(form.value);
    this.apiService.createRole(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/auth/fiche-roles/'+data['data']._id]);  
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

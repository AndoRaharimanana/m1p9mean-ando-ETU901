import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {

  constructor(private apiService: BackOfficeService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.apiService.createRole(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/auth/list-roles']);  
       }
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin']);  
       }else{
        
       }         
    },
    err => {
      console.log("errorr");
      this.router.navigate(['/access-admin']);  
    })
}

}

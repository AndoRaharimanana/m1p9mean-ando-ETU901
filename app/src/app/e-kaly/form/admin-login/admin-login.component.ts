import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from '../../../service/back-office.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../../auth-service.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private apiService: BackOfficeService, private router: Router, private authService: AuthServiceService , private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
        /** spinner starts on init */
        //console.log("HAHA");
   //     this.spinner.show();

 //       setTimeout(() => {
          /** spinner ends after 5 seconds */
//          this.spinner.hide();
        //}, 5000);    
  }

  onSubmit(form: NgForm) {
        this.spinner.show();
    console.log(form.value);
    this.apiService.login(form.value).subscribe((data) => {      
      console.log(data);
      if(data != null){
        var user = data['data'];
        var token = data['token'];
        this.authService.signin(user, token);
        this.router.navigate(['/access-admin/auth/list-users']);  
      }
                this.spinner.hide();
    })
}

}

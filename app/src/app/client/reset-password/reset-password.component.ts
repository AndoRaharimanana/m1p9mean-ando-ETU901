import { Component, OnInit } from '@angular/core';
import { ClientServiceService } from './../../service/client-service.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from './../../auth-service.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private apiService: ClientServiceService, private router: Router, private authService: AuthServiceService , private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.spinner.show();
console.log(form.value);
this.apiService.resetMdp(form.value).subscribe((data) => {      
  
    this.router.navigate(['/']);  
  
            this.spinner.hide();
})
}
}

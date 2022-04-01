import { Component, OnInit } from '@angular/core';
import { BackOfficeService } from '../../../service/back-office.service';
import {NgForm} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private apiService: BackOfficeService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.apiService.login(form.value).subscribe((data) => {      
      console.log(data);
      if(data != null){
        this.router.navigate(['/access-admin/auth/list-users']);  
      }
    })
}

}

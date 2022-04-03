import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-ville',
  templateUrl: './create-ville.component.html',
  styleUrls: ['./create-ville.component.css']
})
export class CreateVilleComponent implements OnInit {

  constructor(private apiService: BackOfficeService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(form: NgForm) {
    console.log(form.value);
    this.apiService.createVille(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/auth/list-villes']);  
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

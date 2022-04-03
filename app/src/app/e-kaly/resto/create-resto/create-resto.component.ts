import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-resto',
  templateUrl: './create-resto.component.html',
  styleUrls: ['./create-resto.component.css']
})
export class CreateRestoComponent implements OnInit {
  villes: any;
  constructor(private apiService: BackOfficeService, private router: Router) { }

  ngOnInit(): void {
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
     },
     err => {
       console.log("errorr");
       this.router.navigate(['/access-admin']);  
     });     
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.apiService.createResto(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/auth/list-restos']);  
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

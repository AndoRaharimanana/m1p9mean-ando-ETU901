import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestoService } from '../../../service/resto.service';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-create-categorie-plat',
  templateUrl: './create-categorie-plat.component.html',
  styleUrls: ['./create-categorie-plat.component.css']
})
export class CreateCategoriePlatComponent implements OnInit {

  constructor(private apiService: RestoService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide(); 
    }, 2000);
  }
  
  onSubmit(form: NgForm) {
    this.spinner.show();
    console.log(form.value);
    this.apiService.createCategorieplat(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/resto/fiche-categorieplats/'+data['data']._id]);  
       }
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin/resto']);  
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

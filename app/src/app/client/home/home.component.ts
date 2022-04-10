import { Component, Inject, OnInit } from '@angular/core';

import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { ClientServiceService } from '../../service/client-service.service';

import { WINDOW } from './../../window.providers';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dropDownList;
  faPencil = faPencil;
  faRemove = faRemove;
  faSort = faSort;
  plats: any;
  restos: any;
  domainename= this.window.location.hostname;
  totalPages: Number;
  page: Number;
  prevPage: Number;
  nextPage: Number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  sortBy: String;
  order: Number;
  orderCurrent: Number;
  numbers: any;
  categories: any;
  
  constructor(private _Activatedroute:ActivatedRoute, private apiService: ClientServiceService, private router: Router, @Inject(WINDOW) private window: Window, private spinner: NgxSpinnerService) { }
  
  
  ngOnInit(): void {
    this.spinner.show();
    this.apiService.getPlats().subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
         console.log(data);
        this.plats = data['data']['docs']; 
        this.totalPages = data['data']['totalPages'];
        this.page = data['data']['page'];
        this.prevPage = data['data']['prevPage'];
        this.nextPage = data['data']['nextPage'];
        this.hasPrevPage = data['data']['hasPrevPage'];
        this.hasNextPage = data['data']['hasNextPage'];
        this.sortBy = data['data']['sortBy'];
        this.order = data['data']['order'];
        this.categories = data['data']['dataform'];
        this.restos = data['data']['resto'];
        this.orderCurrent = this.order;
        if(this.order === 1){
          this.order = -1;
        }
        else if(this.order === -1){
          this.order = 1;
        }
        this.numbers = new Array();
        for(var i = 0; i<this.totalPages; i++){
          this.numbers[i] = i+1;
        }
       }
       else if(data['status'] === 201){
        this.router.navigate(['/']);  
        return;
       }
       else{
        
       }    
       this.spinner.hide();    
     },
     err => {
       console.log("errorr");
       this.router.navigate(['/']);  
       return;
       this.spinner.hide(); 
     });     
  }

  onSubmit(numPage: String, typeSort: String, orderSort: String, form: NgForm) {
    this.spinner.show();
    console.log(form.value);
    this.apiService.searchPlats(numPage, typeSort, orderSort, form.value).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
         console.log(data);
        this.plats = data['data']['docs']; 
        this.totalPages = data['data']['totalPages'];
        this.page = data['data']['page'];
        this.prevPage = data['data']['prevPage'];
        this.nextPage = data['data']['nextPage'];
        this.hasPrevPage = data['data']['hasPrevPage'];
        this.hasNextPage = data['data']['hasNextPage'];
        this.sortBy = data['data']['sortBy'];
        this.order = data['data']['order'];
        this.categories = data['data']['dataform'];
        this.restos = data['data']['resto'];
        this.orderCurrent = this.order;
        if(this.order === 1){
          this.order = -1;
        }
        else if(this.order === -1){
          this.order = 1;
        }          
        this.numbers = new Array();
        for(var i = 0; i<this.totalPages; i++){
          this.numbers[i] = i+1;
        }
       }else if(data['status'] === 201){
        this.router.navigate(['/']);  
       }else{
        
       }    
       this.spinner.hide();    
     },
     err => {
       console.log(err);
       this.router.navigate(['/']);  
       this.spinner.hide(); 
     });           
  }

}

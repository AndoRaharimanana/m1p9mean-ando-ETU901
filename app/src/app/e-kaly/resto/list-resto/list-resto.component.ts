import { Component, Inject, OnInit } from '@angular/core';

import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { BackOfficeService } from '../../../service/back-office.service';

import { WINDOW } from '../../../window.providers';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-list-resto',
  templateUrl: './list-resto.component.html',
  styleUrls: ['./list-resto.component.css']
})
export class ListRestoComponent implements OnInit {
  dropDownList;
  faPencil = faPencil;
  faRemove = faRemove;
  faSort = faSort;
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

  constructor(private _Activatedroute:ActivatedRoute, private apiService: BackOfficeService, private router: Router, @Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    this.apiService.getRestos().subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
         console.log(data);
        this.restos = data['data']['docs']; 
        this.totalPages = data['data']['totalPages'];
        this.page = data['data']['page'];
        this.prevPage = data['data']['prevPage'];
        this.nextPage = data['data']['nextPage'];
        this.hasPrevPage = data['data']['hasPrevPage'];
        this.hasNextPage = data['data']['hasNextPage'];
        this.sortBy = data['data']['sortBy'];
        this.order = data['data']['order'];
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

  deleteResto(id){
    this.apiService.deleteResto(id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';         
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
     });       
  }

  onSubmit(numPage: String, typeSort: String, orderSort: String, form: NgForm) {
    console.log(form.value);
    this.apiService.searchRestos(numPage, typeSort, orderSort, form.value).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
         console.log(data);
        this.restos = data['data']['docs']; 
        this.totalPages = data['data']['totalPages'];
        this.page = data['data']['page'];
        this.prevPage = data['data']['prevPage'];
        this.nextPage = data['data']['nextPage'];
        this.hasPrevPage = data['data']['hasPrevPage'];
        this.hasNextPage = data['data']['hasNextPage'];
        this.sortBy = data['data']['sortBy'];
        this.order = data['data']['order'];
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
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin']);  
       }else{
        
       }       
     },
     err => {
       console.log(err);
       this.router.navigate(['/access-admin']);  
     });           
  }

}
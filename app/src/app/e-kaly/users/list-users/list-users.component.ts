import { Component, Inject, OnInit } from '@angular/core';

import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faSort } from '@fortawesome/free-solid-svg-icons';
import { BackOfficeService } from '../../../service/back-office.service';

import { WINDOW } from '../../../window.providers';
import { ActivatedRoute, Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  dropDownList;
  faPencil = faPencil;
  faRemove = faRemove;
  faSort = faSort;
  users: any;
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
  villes: any;
  roles: any;

  constructor(private _Activatedroute:ActivatedRoute, private apiService: BackOfficeService, private router: Router, @Inject(WINDOW) private window: Window, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {   
    this.spinner.show();
    var p = this._Activatedroute.snapshot.paramMap.get("page"); 
    var t = this._Activatedroute.snapshot.paramMap.get("type"); 
    var o = this._Activatedroute.snapshot.paramMap.get("order"); 
   /* if(p!=null && t == null){
      this.apiService.getUsers_(p).subscribe((data)=>{      
        console.log(data);
         console.log('ici =='+data['status']);
         if(data['status'] === 200){
           console.log(data);
          this.users = data['data']['docs']; 
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
    else if(p!=null && t != null){
      this.apiService.getUsersOrder(p, t, o).subscribe((data)=>{      
        console.log(data);
         console.log('ici =='+data['status']);
         if(data['status'] === 200){
           console.log(data);
          this.users = data['data']['docs']; 
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
    else{*/
      this.apiService.getUsers().subscribe((data)=>{      
        console.log(data);
         console.log('ici =='+data['status']);
         if(data['status'] === 200){
           console.log(data);
          this.users = data['data']['docs']; 
          this.totalPages = data['data']['totalPages'];
          this.page = data['data']['page'];
          this.prevPage = data['data']['prevPage'];
          this.nextPage = data['data']['nextPage'];
          this.hasPrevPage = data['data']['hasPrevPage'];
          this.hasNextPage = data['data']['hasNextPage'];
          this.sortBy = data['data']['sortBy'];
          this.order = data['data']['order'];
          this.villes = data['data']['dataform'].ville;
          this.roles = data['data']['dataform'].role;
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
                   this.spinner.hide();
       },
       err => {
         console.log("errorr");
         this.router.navigate(['/access-admin']);  
                   this.spinner.hide();
       });   
    //}
    
  }


  deleteUser(id){
    this.spinner.show();
    this.apiService.deleteUser(id).subscribe((data)=>{            
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';         
        this.router.navigate(['/access-admin/auth/list-users']);  
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
     });       
  }



  onSubmit(numPage: String, typeSort: String, orderSort: String, form: NgForm) {
    console.log(form.value);
    this.spinner.show();
    this.apiService.searchUsers(numPage, typeSort, orderSort, form.value).subscribe((data)=>{            
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
         console.log(data);
        this.users = data['data']['docs']; 
        this.totalPages = data['data']['totalPages'];
        this.page = data['data']['page'];
        this.prevPage = data['data']['prevPage'];
        this.nextPage = data['data']['nextPage'];
        this.hasPrevPage = data['data']['hasPrevPage'];
        this.hasNextPage = data['data']['hasNextPage'];
        this.sortBy = data['data']['sortBy'];
        this.order = data['data']['order'];
        this.villes = data['data']['dataform'].ville;
        this.roles = data['data']['dataform'].role;
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
        this.spinner.hide();   
     },
     err => {
       console.log(err);
       this.router.navigate(['/access-admin']); 
       this.spinner.hide();   
     });         
  }

}

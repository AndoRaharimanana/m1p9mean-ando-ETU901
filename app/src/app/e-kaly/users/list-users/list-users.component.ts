import { Component, OnInit } from '@angular/core';

import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { BackOfficeService } from '../../../service/back-office.service';

import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  dropDownList;
  faPencil = faPencil;
  faRemove = faRemove;
  users: any;
  domainename= "http://localhost:4200";
  totalPages: Number;
  page: Number;
  prevPage: Number;
  nextPage: Number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
numbers: any;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: BackOfficeService, private router: Router) { }

  ngOnInit(): void {   
    var p = this._Activatedroute.snapshot.paramMap.get("page"); 
    if(p!=null){
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
    }else{
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
    
  }


  deleteUser(id){
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
     },
     err => {
       console.log("errorr");
       this.router.navigate(['/access-admin']);  
     });       
  }

  

}

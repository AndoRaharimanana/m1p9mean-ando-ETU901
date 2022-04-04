import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import { WINDOW } from '../../../window.providers';
import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-fiche-resto',
  templateUrl: './fiche-resto.component.html',
  styleUrls: ['./fiche-resto.component.css']
})
export class FicheRestoComponent implements OnInit {
  id: String;
  faRemove = faRemove;
  resto: any;
  dataform: [];
  domainename= this.window.location.hostname;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: BackOfficeService, private router: Router, @Inject(WINDOW) private window: Window, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getResto(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.resto = data['data'][0];   
        this.dataform = data['dataform'];
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

  deleteResto(id){
    this.spinner.show();
    this.apiService.deleteResto(id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.router.navigate(['/access-admin/auth/list-restos']);  
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

  onSubmit(form: NgForm) {
    this.spinner.show();
    console.log(form.value);
    this.apiService.updateResto(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';                 
        this.router.navigate(['/access-admin/auth/fiche-restos/'+this.id]);  
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
    })
}      

removeUser(form: NgForm) {
  this.spinner.show();
  console.log(form.value);
  this.apiService.removeResto(form.value).subscribe((data) => {      
    console.log(data);
    if(data['status'] === 200){
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';               
      this.router.navigate(['/access-admin/auth/fiche-restos/'+this.id]);  
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
  })
}    

}

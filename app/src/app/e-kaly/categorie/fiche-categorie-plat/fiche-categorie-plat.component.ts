import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import { WINDOW } from '../../../window.providers';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-fiche-categorie-plat',
  templateUrl: './fiche-categorie-plat.component.html',
  styleUrls: ['./fiche-categorie-plat.component.css']
})
export class FicheCategoriePlatComponent implements OnInit {

  id: String;
  categorieplat: any;
  domainename= this.window.location.hostname;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: BackOfficeService, private router: Router, @Inject(WINDOW) private window: Window, private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getCategorieplat(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.categorieplat = data['data'][0];            
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
  deleteCategorieplat(id){
    this.spinner.show();
    this.apiService.deleteCategorieplat(id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.router.navigate(['/access-admin/auth/list-categorieplats']);  
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
  


}

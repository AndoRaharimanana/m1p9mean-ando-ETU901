import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import { WINDOW } from '../../../window.providers';

@Component({
  selector: 'app-fiche-ville',
  templateUrl: './fiche-ville.component.html',
  styleUrls: ['./fiche-ville.component.css']
})
export class FicheVilleComponent implements OnInit {
  id: String;
  ville: any;
  domainename= this.window.location.hostname;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: BackOfficeService, private router: Router, @Inject(WINDOW) private window: Window) { }
  
  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getVille(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.ville = data['data'][0];            
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
  deleteVille(id){
    this.apiService.deleteVille(id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
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
     });       
  }
  

}

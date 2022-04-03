import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import { WINDOW } from '../../../window.providers';
@Component({
  selector: 'app-fiche-role',
  templateUrl: './fiche-role.component.html',
  styleUrls: ['./fiche-role.component.css']
})
export class FicheRoleComponent implements OnInit {
  id: String;
  role: any;
  domainename= this.window.location.hostname;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: BackOfficeService, private router: Router, @Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getRole(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.role = data['data'][0];            
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
  deleteRole(id){
    this.apiService.deleteRole(id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.router.navigate(['/access-admin/auth/list-roles']);  
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

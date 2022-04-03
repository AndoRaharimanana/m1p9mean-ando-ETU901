import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import { WINDOW } from '../../../window.providers';
import { faRemove } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-fiche-resto',
  templateUrl: './fiche-resto.component.html',
  styleUrls: ['./fiche-resto.component.css']
})
export class FicheRestoComponent implements OnInit {
  id: String;
  faRemove = faRemove;
  resto: any;
  domainename= this.window.location.hostname;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: BackOfficeService, private router: Router, @Inject(WINDOW) private window: Window) { }

  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getResto(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.resto = data['data'][0];         
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

}

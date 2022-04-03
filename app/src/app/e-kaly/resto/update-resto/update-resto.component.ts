import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackOfficeService } from '../../../service/back-office.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-update-resto',
  templateUrl: './update-resto.component.html',
  styleUrls: ['./update-resto.component.css']
})
export class UpdateRestoComponent implements OnInit {
  id: String;
  resto: any;
  villes: any;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: BackOfficeService, private router: Router) { }

  ngOnInit(): void {
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getUpdateResto(this.id).subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        console.log(data);
        this.resto = data['data']['data'][0];  
        this.villes = data['data']['dataform'];                           
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

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.apiService.updateResto(form.value).subscribe((data) => {      
      console.log(data);
      if(data['status'] === 200){
        this.router.navigate(['/access-admin/auth/fiche-restos/'+this.id]);  
       }
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin']);  
       }else{
        
       }         
    },
    err => {
      console.log("errorr");
      this.router.navigate(['/access-admin']);  
    })
}    

}

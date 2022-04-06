import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestoService } from '../../service/resto.service';
import { WINDOW } from '../../window.providers';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-choose',
  templateUrl: './choose.component.html',
  styleUrls: ['./choose.component.css']
})
export class ChooseComponent implements OnInit {
  id: String;
  restos: any;
  domainename= this.window.location.hostname;
  constructor(private _Activatedroute:ActivatedRoute, private apiService: RestoService, private router: Router, @Inject(WINDOW) private window: Window, private spinner: NgxSpinnerService) { }
  
  ngOnInit(): void {
    this.spinner.show();
    this.id=this._Activatedroute.snapshot.paramMap.get("id");
    this.apiService.getRestoUser().subscribe((data)=>{      
      console.log(data);
       console.log('ici =='+data['status']);
       if(data['status'] === 200){
        this.restos = data['data'];            
       }
       else if(data['status'] === 202){
        this.router.navigate(['/access-admin/resto']);  
       }else{
        
       }     
       this.spinner.hide();   
     },
     err => {
       console.log("errorr");
       this.router.navigate(['/access-admin/resto']);  
       this.spinner.hide(); 
     });           
  }

  choose(id, nom){
    var resto = new Object();
    resto['id'] = id;
    resto['nom'] = nom;
    localStorage.setItem("resto", JSON.stringify(resto));
    this.router.navigate(['/access-admin/resto/list-categorieplats']);  
  }

}

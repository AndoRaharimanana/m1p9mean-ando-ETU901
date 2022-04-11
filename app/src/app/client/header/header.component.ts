import { Component, OnInit, ElementRef, HostListener, Input } from '@angular/core';
import { ClientServiceService } from '../../service/client-service.service';
import { BackOfficeService } from '../../service/back-office.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { AuthServiceService } from '../../auth-service.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public text: String;
  public connect = 1;
  username = JSON.parse(localStorage.getItem("user"));
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!event.target.className.includes("subMenu-section")){
        this.hiddenAllMenu("subMenu");
        this.hiddenAllMenu("subMenuMob");
    }
    
  }

  constructor(private backService: BackOfficeService, private apiService: ClientServiceService, private eRef: ElementRef, private router: Router, private spinner: NgxSpinnerService, private authService: AuthServiceService) {
    console.log(this.username);
    this.text = 'no clicks yet';

  }

  ngOnInit(): void {    
    console.log(this.username);
    this.hiddenAllMenu("subMenu");
    this.hiddenAllMenu("subMenuMob");
    this.apiService.authentification().subscribe((data) => {      
      console.log(data);
      if(data != null){
        if(data['status'] === 200){
          this.connect = 0;            
         }
        //this.router.navigate(['/']);  
      }
                
    })      
  }



clickSubmenu(event, classname){
  var target = event.target;
  var subMenu = null;
  if(classname.localeCompare("subMenu") === 0){
    subMenu = target.parentElement.nextSibling;
  }else if(classname.localeCompare("subMenuMob") === 0){
    subMenu = document.getElementById("subMenuMob");
  }
  
  var current = subMenu.getAttribute('class');
  

  if(current.includes("hidden")){
    this.hiddenOthersMenu(subMenu, classname);
    this.showSubMenu(subMenu);
  }else{
    this.hiddenSubMenu(subMenu);
  }
}

hiddenOthersMenu(current, classname){
  var subMenus = document.getElementsByClassName(classname);
  for(var i = 0; i<subMenus.length; i++){
    if(current.id.localeCompare(subMenus[i].id) != 0){
      this.hiddenSubMenu(subMenus[i]);
    }
  }
}

hiddenAllMenu(classname){
  var subMenus = document.getElementsByClassName(classname);
  console.log(subMenus.length);
  for(var i = 0; i<subMenus.length; i++){
        this.hiddenSubMenu(subMenus[i]);
  }
}

hiddenSubMenu(subMenu){
  var current = subMenu.getAttribute('class');
  current.replaceAll("hidden", "");
  subMenu.setAttribute("class", "hidden "+current);  
}

showSubMenu(subMenu){
  var current = subMenu.getAttribute('class');
  subMenu.setAttribute("class", current.replaceAll("hidden", ""));
}
signout(origin: any){
  this.spinner.show();
  this.backService.logout(origin).subscribe((data)=>{      
    console.log(data);
     console.log('ici =='+data['status']);
     if(data['status'] === 200){
      this.authService.signout();
     }
     else if(data['status'] === 202){
     }else{
      
     }       
     this.router.routeReuseStrategy.shouldReuseRoute = () => false;
     this.router.onSameUrlNavigation = 'reload';              
     this.router.navigate(['/']); 
     this.spinner.hide();  
   },
   err => {
     console.log("errorr");
     this.router.navigate(['/']); 
     this.spinner.hide();  
   });         
}
}

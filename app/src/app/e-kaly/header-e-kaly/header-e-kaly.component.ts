import { Component, OnInit, ElementRef, HostListener, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { BackOfficeService } from '../../service/back-office.service';
import { WINDOW } from '../../window.providers';

@Component({
  selector: 'app-header-e-kaly',
  templateUrl: './header-e-kaly.component.html',
  styleUrls: ['./header-e-kaly.component.css']
})
export class HeaderEKalyComponent implements OnInit {
  public text: String;
  domainename= this.window.location.hostname;
  username = JSON.parse(localStorage.getItem("user"));
  @HostListener('document:click', ['$event'])
  clickout(event) {
    console.log(event);
    console.log(event.target.tagName);
    console.log(event.target);
    console.log(event.target.parentElement);
    console.log(event.target.parentElement.tagName);
    if((event.target.tagName.localeCompare("svg") == 0 && (event.target.parentElement.tagName.toLowerCase().localeCompare("fa-icon") == 0 || event.target.parentElement.tagName.toLowerCase().localeCompare("a") == 0)) || (event.target.tagName.localeCompare("path") == 0) && (event.target.parentElement.parentElement.tagName.toLowerCase().localeCompare("fa-icon") == 0 || event.target.parentElement.parentElement.tagName.toLowerCase().localeCompare("fa-icon") == 0)){
      this.hiddenAllMenu("subMenu");
      this.hiddenAllMenu("subMenuMob");      
      return;
    }
    if(!event.target.className.includes("subMenu-section")){
        this.hiddenAllMenu("subMenu");
        this.hiddenAllMenu("subMenuMob");
    }
    
  }

  constructor(private eRef: ElementRef, private router: Router, private authService: AuthServiceService, private apiService: BackOfficeService, @Inject(WINDOW) private window: Window) {    
    this.text = 'no clicks yet';
  }

  ngOnInit(): void {
    console.log(this.domainename);
    this.hiddenAllMenu("subMenu");
    this.hiddenAllMenu("subMenuMob");
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

signout(){
  this.apiService.logout().subscribe((data)=>{      
    console.log(data);
     console.log('ici =='+data['status']);
     if(data['status'] === 200){
      this.authService.signout();
     }
     else if(data['status'] === 202){
     }else{
      
     }       
     
     this.router.navigate(['/access-admin']);  
   },
   err => {
     console.log("errorr");
     this.router.navigate(['/access-admin']);  
   });         
}

}

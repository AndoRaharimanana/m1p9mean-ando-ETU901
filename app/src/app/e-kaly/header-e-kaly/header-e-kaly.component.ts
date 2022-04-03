import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';
import { BackOfficeService } from '../../service/back-office.service';

@Component({
  selector: 'app-header-e-kaly',
  templateUrl: './header-e-kaly.component.html',
  styleUrls: ['./header-e-kaly.component.css']
})
export class HeaderEKalyComponent implements OnInit {
  public text: String;
  username = JSON.parse(localStorage.getItem("user"));
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!event.target.className.includes("subMenu-section")){
        this.hiddenAllMenu("subMenu");
        this.hiddenAllMenu("subMenuMob");
    }
    
  }

  constructor(private eRef: ElementRef, private router: Router, private authService: AuthServiceService, private apiService: BackOfficeService) {    
    this.text = 'no clicks yet';
  }

  ngOnInit(): void {
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

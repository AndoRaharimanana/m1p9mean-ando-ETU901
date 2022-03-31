import { Component, OnInit, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public text: String;
  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!event.target.className.includes("subMenu-section")){
        this.hiddenAllMenu("subMenu");
        this.hiddenAllMenu("subMenuMob");
    }
    
  }

  constructor(private eRef: ElementRef) {
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

}

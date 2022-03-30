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
        this.hiddenAllMenu();
    }
    
  }

  constructor(private eRef: ElementRef) {
    this.text = 'no clicks yet';
  }

  ngOnInit(): void {
    this.hiddenAllMenu();
  }



clickSubmenu(event){
  var target = event.target;
  var subMenu = target.parentElement.nextSibling;
  var current = subMenu.getAttribute('class');
  

  if(current.includes("hidden")){
    this.hiddenOthersMenu(subMenu);
    this.showSubMenu(subMenu);
  }else{
    this.hiddenSubMenu(subMenu);
  }
}

hiddenOthersMenu(current){
  var subMenus = document.getElementsByClassName("subMenu");
  for(var i = 0; i<subMenus.length; i++){
    if(current.id.localeCompare(subMenus[i].id) != 0){
      this.hiddenSubMenu(subMenus[i]);
    }
  }
}

hiddenAllMenu(){
  var subMenus = document.getElementsByClassName("subMenu");
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

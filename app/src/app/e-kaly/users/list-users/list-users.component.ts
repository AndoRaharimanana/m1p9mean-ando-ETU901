import { Component, OnInit } from '@angular/core';

import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { BackOfficeService } from '../../../service/back-office.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  dropDownList;
  faPencil = faPencil;
  faRemove = faRemove;
  users: any;
  constructor(private apiService: BackOfficeService) { }

  ngOnInit(): void {
    this.apiService.getUsers().subscribe((data)=>{      
       console.log(data);
       this.users = data;            
     });       
  }

}

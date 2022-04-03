import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './client/form/login/login.component';
import { SignupComponent } from './client/form/signup/signup.component';
import { HomeComponent } from './client/home/home.component';
import { AdminLoginComponent } from './e-kaly/form/admin-login/admin-login.component';
import { ListUsersComponent } from './e-kaly/users/list-users/list-users.component';
import { FicheUsersComponent } from './e-kaly/users/fiche-users/fiche-users.component';
import { CreateUsersComponent } from './e-kaly/users/create-users/create-users.component';
import { UpdateUsersComponent } from './e-kaly/users/update-users/update-users.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }  ,
  {
    path: 'signup',
    component: SignupComponent
  }  ,
  {
    path: 'access-admin',
    component: AdminLoginComponent
  }  ,
  {
    path: 'access-admin/auth/list-users',
    component: ListUsersComponent
  }  ,
  {
    path: 'access-admin/auth/list-users/:page',
    component: ListUsersComponent
  }  ,
  {
    path: 'access-admin/auth/fiche-users/:id',
    component: FicheUsersComponent
  }  ,
  {
    path: 'access-admin/auth/create-users',
    component: CreateUsersComponent
  }  ,
  {
    path: 'access-admin/auth/update-users/:id',
    component: UpdateUsersComponent
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

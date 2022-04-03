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
import { CreateRestoComponent } from './e-kaly/resto/create-resto/create-resto.component';
import { ListRestoComponent } from './e-kaly/resto/list-resto/list-resto.component';
import { UpdateRestoComponent } from './e-kaly/resto/update-resto/update-resto.component';
import { FicheRestoComponent } from './e-kaly/resto/fiche-resto/fiche-resto.component';
import { ListRoleComponent } from './e-kaly/role/list-role/list-role.component';
import { FicheRoleComponent } from './e-kaly/role/fiche-role/fiche-role.component';
import { CreateRoleComponent } from './e-kaly/role/create-role/create-role.component';
import { UpdateRoleComponent } from './e-kaly/role/update-role/update-role.component';
import { ListVilleComponent } from './e-kaly/ville/list-ville/list-ville.component';
import { CreateVilleComponent } from './e-kaly/ville/create-ville/create-ville.component';
import { FicheVilleComponent } from './e-kaly/ville/fiche-ville/fiche-ville.component';
import { UpdateVilleComponent } from './e-kaly/ville/update-ville/update-ville.component';

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
  }   ,
  {
    path: 'access-admin/auth/list-restos',
    component: ListRestoComponent
  }  ,
  {
    path: 'access-admin/auth/fiche-restos/:id',
    component: FicheRestoComponent
  }  ,
  {
    path: 'access-admin/auth/create-restos',
    component: CreateRestoComponent
  }  ,
  {
    path: 'access-admin/auth/update-restos/:id',
    component: UpdateRestoComponent
  }   ,
  {
    path: 'access-admin/auth/list-roles',
    component: ListRoleComponent
  }  ,
  {
    path: 'access-admin/auth/fiche-roles/:id',
    component: FicheRoleComponent
  }  ,
  {
    path: 'access-admin/auth/create-roles',
    component: CreateRoleComponent
  }  ,
  {
    path: 'access-admin/auth/update-roles/:id',
    component: UpdateRoleComponent
  } ,
  {
    path: 'access-admin/auth/list-villes',
    component: ListVilleComponent
  }  ,
  {
    path: 'access-admin/auth/fiche-villes/:id',
    component: FicheVilleComponent
  }  ,
  {
    path: 'access-admin/auth/create-villes',
    component: CreateVilleComponent
  }  ,
  {
    path: 'access-admin/auth/update-villes/:id',
    component: UpdateVilleComponent
  } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

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
import { ListCategoriePlatComponent } from './e-kaly/categorie/list-categorie-plat/list-categorie-plat.component';
import { FicheCategoriePlatComponent } from './e-kaly/categorie/fiche-categorie-plat/fiche-categorie-plat.component';
import { CreateCategoriePlatComponent } from './e-kaly/categorie/create-categorie-plat/create-categorie-plat.component';
import { UpdateCategoriePlatComponent } from './e-kaly/categorie/update-categorie-plat/update-categorie-plat.component';
import { RestoLoginComponent } from './resto/form/resto-login/resto-login.component';
import { ChooseComponent } from './resto/choose/choose.component';
import { ListPlatComponent } from './resto/plat/list-plat/list-plat.component';
import { FichePlatComponent } from './resto/plat/fiche-plat/fiche-plat.component';
import { CreatePlatComponent } from './resto/plat/create-plat/create-plat.component';
import { UpdatePlatComponent } from './resto/plat/update-plat/update-plat.component';
import { PagePlatComponent } from './client/page-plat/page-plat.component';
import { PageRestoComponent } from './client/page-resto/page-resto.component';
import { ConfigurationComponent } from './resto/plat/configuration/configuration.component';
import { ResetPasswordComponent } from './client/reset-password/reset-password.component';

var ADMIN_PATH = 'access-admin/auth';
var RESTO_PATH = 'access-admin/resto';
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
    path: ADMIN_PATH+'/list-users',
    component: ListUsersComponent
  }  ,
  {
    path: ADMIN_PATH+'/fiche-users/:id',
    component: FicheUsersComponent
  }  ,
  {
    path: ADMIN_PATH+'/create-users',
    component: CreateUsersComponent
  }  ,
  {
    path: ADMIN_PATH+'/update-users/:id',
    component: UpdateUsersComponent
  }   ,
  {
    path: ADMIN_PATH+'/list-restos',
    component: ListRestoComponent
  }  ,
  {
    path: ADMIN_PATH+'/fiche-restos/:id',
    component: FicheRestoComponent
  }  ,
  {
    path: ADMIN_PATH+'/create-restos',
    component: CreateRestoComponent
  }  ,
  {
    path: ADMIN_PATH+'/update-restos/:id',
    component: UpdateRestoComponent
  }   ,
  {
    path: ADMIN_PATH+'/list-roles',
    component: ListRoleComponent
  }  ,
  {
    path: ADMIN_PATH+'/fiche-roles/:id',
    component: FicheRoleComponent
  }  ,
  {
    path: ADMIN_PATH+'/create-roles',
    component: CreateRoleComponent
  }  ,
  {
    path: ADMIN_PATH+'/update-roles/:id',
    component: UpdateRoleComponent
  } ,
  {
    path: ADMIN_PATH+'/list-villes',
    component: ListVilleComponent
  }  ,
  {
    path: ADMIN_PATH+'/fiche-villes/:id',
    component: FicheVilleComponent
  }  ,
  {
    path: ADMIN_PATH+'/create-villes',
    component: CreateVilleComponent
  }  ,
  {
    path: ADMIN_PATH+'/update-villes/:id',
    component: UpdateVilleComponent
  } ,
  {
    path: ADMIN_PATH+'/list-categorieplats',
    component: ListCategoriePlatComponent
  }  ,
  {
    path: ADMIN_PATH+'/fiche-categorieplats/:id',
    component: FicheCategoriePlatComponent
  }  ,
  {
    path: ADMIN_PATH+'/create-categorieplats',
    component: CreateCategoriePlatComponent
  }  ,
  {
    path: ADMIN_PATH+'/update-categorieplats/:id',
    component: UpdateCategoriePlatComponent
  }  ,
  {
    path: RESTO_PATH,
    component: RestoLoginComponent
  } ,
  {
    path: RESTO_PATH+'/choose',
    component: ChooseComponent
  }  ,
  {
    path: RESTO_PATH+'/list-plats',
    component: ListPlatComponent
  }  ,
  {
    path: RESTO_PATH+'/fiche-plats/:id',
    component: FichePlatComponent
  }  ,
  {
    path: RESTO_PATH+'/create-plats',
    component: CreatePlatComponent
  }  ,
  {
    path: RESTO_PATH+'/update-plats/:id',
    component: UpdatePlatComponent
  }  ,
  {
    path: RESTO_PATH+'/config-plats/:id',
    component: ConfigurationComponent
  }  ,
  {
    path: 'plat/:id',
    component: PagePlatComponent
  }  ,
  {
    path: 'resto',
    component: PageRestoComponent
  } ,{
    path: 'reset-password',
    component: ResetPasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

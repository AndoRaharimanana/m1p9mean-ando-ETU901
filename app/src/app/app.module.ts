import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { LoginComponent } from './client/form/login/login.component';
import { SignupComponent } from './client/form/signup/signup.component';
import { HeaderComponent } from './client/header/header.component';
import { HomeComponent } from './client/home/home.component';
import { FooterComponent } from './footer/footer.component';
import { AdminLoginComponent } from './e-kaly/form/admin-login/admin-login.component';
import { ListUsersComponent } from './e-kaly/users/list-users/list-users.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderEKalyComponent } from './e-kaly/header-e-kaly/header-e-kaly.component';
import { FicheUsersComponent } from './e-kaly/users/fiche-users/fiche-users.component';
import { CreateUsersComponent } from './e-kaly/users/create-users/create-users.component';
import { UpdateUsersComponent } from './e-kaly/users/update-users/update-users.component';
import { WINDOW_PROVIDERS } from './window.providers';
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
import { HeaderRestoComponent } from './resto/header/header-resto/header-resto.component';
import { ChooseComponent } from './resto/choose/choose.component';
import { ListPlatComponent } from './resto/plat/list-plat/list-plat.component';
import { FichePlatComponent } from './resto/plat/fiche-plat/fiche-plat.component';
import { CreatePlatComponent } from './resto/plat/create-plat/create-plat.component';
import { UpdatePlatComponent } from './resto/plat/update-plat/update-plat.component';
import { PagePlatComponent } from './client/page-plat/page-plat.component';
import { PageRestoComponent } from './client/page-resto/page-resto.component';
import { ConfigurationComponent } from './resto/plat/configuration/configuration.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    AdminLoginComponent,
    ListUsersComponent,
    HeaderEKalyComponent,
    FicheUsersComponent,
    CreateUsersComponent,
    UpdateUsersComponent,
    CreateRestoComponent,
    ListRestoComponent,
    UpdateRestoComponent,
    FicheRestoComponent,
    ListRoleComponent,
    FicheRoleComponent,
    CreateRoleComponent,
    UpdateRoleComponent,
    ListVilleComponent,
    CreateVilleComponent,
    FicheVilleComponent,
    UpdateVilleComponent,
    ListCategoriePlatComponent,
    FicheCategoriePlatComponent,
    CreateCategoriePlatComponent,
    UpdateCategoriePlatComponent,
    RestoLoginComponent,
    HeaderRestoComponent,
    ChooseComponent,
    ListPlatComponent,
    FichePlatComponent,
    CreatePlatComponent,
    UpdatePlatComponent,
    PagePlatComponent,
    PageRestoComponent,
    ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    DragDropModule,
    FontAwesomeModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [WINDOW_PROVIDERS],
  bootstrap: [AppComponent]
})
export class AppModule { }

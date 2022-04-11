import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';


if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  export const API_HOSTNAME = "https://m1p9mean-ando-etu901-api.herokuapp.com";
  //export const API_HOSTNAME = "http://localhost:1010";
  export const API_PREFIX_BACKEND = "/back-office";
  export const API_PREFIX_RESTO = "/resto";

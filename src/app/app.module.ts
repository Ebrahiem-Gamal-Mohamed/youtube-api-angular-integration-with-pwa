import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

// components...
import { AppComponent } from "./app.component";
import { HomeComponent } from "./core/_components/home/home.component";
import { HeaderComponent } from './core/_components/header/header.component';
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
// Modules ...
import { SharedModule } from './shared/_modules/shared.module';
/** config angular i18n **/
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
registerLocaleData(en);
/** config ng-zorro-antd i18n **/
import { NZ_I18N, en_US } from "ng-zorro-antd/i18n";
import { CachingInterceptor } from './core/_services/cache/caching-interceptor.service';

@NgModule({
  declarations: [AppComponent, HomeComponent, HeaderComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    }),
    SharedModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

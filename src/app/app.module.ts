import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// components...
import { AppComponent } from "./app.component";
import { HomeComponent } from "./core/_components/home/home.component";
import { ServiceWorkerModule } from "@angular/service-worker";
import { environment } from "../environments/environment";
// Modules ...
/** config angular i18n **/
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
registerLocaleData(en);
/** config ng-zorro-antd i18n **/
import { NZ_I18N, en_US } from "ng-zorro-antd/i18n";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ServiceWorkerModule.register("ngsw-worker.js", {
      enabled: environment.production,
    })
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

// components...
import { AppComponent } from "./app.component";
import { HomeComponent } from "./core/_components/home/home.component";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
// Modules ...

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

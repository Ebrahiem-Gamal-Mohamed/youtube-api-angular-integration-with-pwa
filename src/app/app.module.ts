import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";

// components...
import { AppComponent } from "./app.component";
import { HomeComponent } from "./core/_components/home/home.component";
// Modules ...
import { VideosModule } from "./videos/videos.module";

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, AppRoutingModule, VideosModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

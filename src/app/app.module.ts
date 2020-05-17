import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VideosListComponent } from './videos/videos-list/videos-list.component';
import { VideoDetailsComponent } from './videos/video-details/video-details.component';
import { HomeComponent } from './core/_components/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    VideosListComponent,
    VideoDetailsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

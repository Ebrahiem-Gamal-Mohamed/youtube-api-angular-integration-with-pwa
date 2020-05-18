import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VideosRoutingModule } from "./videos-routing.module";

import { VideosListComponent } from "./videos-list/videos-list.component";
import { VideoDetailsComponent } from "./video-details/video-details.component";
import { SharedModule } from './../shared/_modules/shared.module';

@NgModule({
  declarations: [VideosListComponent, VideoDetailsComponent],
  imports: [
    VideosRoutingModule,
    SharedModule
  ]
})
export class VideosModule {}

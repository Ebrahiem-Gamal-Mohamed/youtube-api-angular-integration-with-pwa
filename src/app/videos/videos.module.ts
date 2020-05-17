import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VideosRoutingModule } from "./videos-routing.module";

import { VideosListComponent } from "./videos-list/videos-list.component";
import { VideoDetailsComponent } from "./video-details/video-details.component";
import { SharedNzmodulesModule } from '../shared/_modules/shared-nzmodules.module';

@NgModule({
  declarations: [VideosListComponent, VideoDetailsComponent],
  imports: [CommonModule, VideosRoutingModule, SharedNzmodulesModule],
  exports: [VideosListComponent, VideoDetailsComponent],
})
export class VideosModule {}

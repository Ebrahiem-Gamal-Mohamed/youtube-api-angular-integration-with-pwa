import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { VideosRoutingModule } from "./videos-routing.module";

import { VideosListComponent } from "./videos-list/videos-list.component";
import { VideoDetailsComponent } from "./video-details/video-details.component";
import { SharedNzmodulesModule } from "../shared/_modules/shared-nzmodules.module";

@NgModule({
  declarations: [VideosListComponent, VideoDetailsComponent],
  imports: [
    CommonModule,
    VideosRoutingModule,
    SharedNzmodulesModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    VideosListComponent,
    VideoDetailsComponent,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class VideosModule {}

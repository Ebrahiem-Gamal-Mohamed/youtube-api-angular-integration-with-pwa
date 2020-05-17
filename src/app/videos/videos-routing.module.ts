import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { VideosListComponent } from "./videos-list/videos-list.component";
import { VideoDetailsComponent } from "./video-details/video-details.component";

const routes: Routes = [
  { path: "", component: VideosListComponent },
  { path: ":id", component: VideoDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideosRoutingModule {}

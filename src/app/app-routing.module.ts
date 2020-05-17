import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideosListComponent } from './videos/videos-list/videos-list.component';
import { VideoDetailsComponent } from './videos/video-details/video-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/videos', pathMatch: 'full' },
  { path: 'videos', component: VideosListComponent },
  { path: 'videos/:id', component: VideoDetailsComponent },
  { path: '**', redirectTo: '/videos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit } from "@angular/core";
import { VideoService } from "../video.service";
import { ActivatedRoute } from "@angular/router";
import { Video } from "../video.model";
import { Observable } from "rxjs";
import { BrowserStorageService } from './../../core/_services/browser-storage.service';

@Component({
  selector: "app-video-details",
  templateUrl: "./video-details.component.html",
  styleUrls: ["./video-details.component.scss"],
})
export class VideoDetailsComponent implements OnInit {
  video$: Observable<Video>;
  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private browserService: BrowserStorageService
  ) {}

  ngOnInit(): void {
    this.videoService.favorites = this.browserService.getLocal('favList');
    let videoId: string;
    this.route.paramMap.subscribe((params) => (videoId = params.get("id")));
    this.video$ = this.videoService.getVideoDetails(videoId);
  }

  addToFavorites(video: Video) {
    if (video && !this.videoService.favorites.some((item: Video) => item.id === video.id)) {
      this.videoService.favorites.push(video); 
      this.browserService.setLocal('favList', this.videoService.favorites);
    }
  }

  removeFromFavorites(video: Video) {
    if (video && this.videoService.favorites.some((item: Video) => item.id === video.id)) {
      const itemIndex = this.videoService.favorites.indexOf(video);
      this.videoService.favorites.splice(itemIndex, 1);
      this.browserService.setLocal('favList', this.videoService.favorites);
    }
  }
}

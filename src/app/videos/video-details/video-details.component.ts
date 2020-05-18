import { Component, OnInit } from "@angular/core";
import { VideoService } from "../video.service";
import { ActivatedRoute } from "@angular/router";
import { Video } from "../video.model";
import { Observable, of } from "rxjs";
import { BrowserStorageService } from './../../core/_services/browser-storage.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: "app-video-details",
  templateUrl: "./video-details.component.html",
  styleUrls: ["./video-details.component.scss"],
})
export class VideoDetailsComponent implements OnInit {
  video$: Observable<Video>;
  errorMessage: string;
  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private browserService: BrowserStorageService
  ) {}

  ngOnInit(): void {
    this.videoService.favorites = this.browserService.getLocal('favList') ? this.browserService.getLocal('favList') : [];
    this.videoService.ratedVideosList = this.browserService.getLocal('ratedList') ? this.browserService.getLocal('ratedList'): [];
    let videoId: string;
    this.route.paramMap.subscribe((params) => (videoId = params.get("id")));
    this.video$ = this.videoService.getVideoDetails(videoId).pipe(
      map(video => {
        const favoritedItem = this.videoService.favorites.length ? this.videoService.favorites.find(item => item.id === video.id) : undefined;
        const ratedItem = this.videoService.ratedVideosList.length ? this.videoService.ratedVideosList.find(item => item.id === video.id) : undefined;
        video = favoritedItem ? {...video, isFavorite: true} : {...video, isFavorite: false};
        video = ratedItem ? {...video, rate: ratedItem.rate} : {...video, rate: video.rate};
        return video;
      }),
      catchError(err => {
        this.errorMessage = err;
        return of(null)
      })
    );
  }

  onRateVideo(event, video: Video) {
    if (!this.videoService.ratedVideosList.find((item: Video) => item.id === video.id)) {
      video.rate = event;
      this.videoService.ratedVideosList.push(video);
    } else {
      this.videoService.ratedVideosList = this.videoService.ratedVideosList.map(item => item.id === video.id ? {...item, rate: event} : item);
      if (event === 0) this.videoService.ratedVideosList = this.videoService.ratedVideosList.filter(item => item.id !== video.id);
    }
    this.browserService.setLocal('ratedList', this.videoService.ratedVideosList);
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

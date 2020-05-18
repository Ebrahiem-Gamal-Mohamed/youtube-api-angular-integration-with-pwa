import { Injectable } from '@angular/core';
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Video } from './video.model';
import { YoutubeService } from "./../core/_services/youtube.service";
import { FormControl } from '@angular/forms';

export interface RetrievedVideoData {
  videos: Video[];
  count?: number;
  pageToken?: {
    next?: string,
    prev?: string
  }
}

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  favorites: Video [] = [];
  ratedVideosList: Video[] = [];
  filter = new FormControl('');
  constructor(private youtubeService: YoutubeService) { }

  getVideosList(
    channelId: string,
    maxResultsPerPage: number,
    sortField: string,
    pageToken: string,
    searchTerm: string): Observable<RetrievedVideoData> {
    return this.youtubeService.getVideos(
      channelId,
      maxResultsPerPage,
      sortField,
      pageToken,
      searchTerm
    ).pipe(
      map((data: any) => {
        return {
          videos: data.items.map((item) => {
            return {
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              defaultThumb: item.snippet.thumbnails.default.url,
              publishedDate: item.snippet.publishedAt,
              rate: 0
            } as Video;
          }),
          count: data.pageInfo.totalResults,
          pageToken: { next: data.nextPageToken, prev: data.prevPageToken }
        };
      }),
      catchError(this.handleError)
    );
  }

  getVideoDetails(id: string): Observable<Video> {
    return this.youtubeService.getVideo(id).pipe(
      map((data: any) => {
        return {
          id: data.items[0].id,
          title: data.items[0].snippet.title,
          description: data.items[0].snippet.description,
          defaultThumb: data.items[0].snippet.thumbnails.maxres.url,
          publishedDate: data.items[0].snippet.publishedAt,
          likeCount: data.items[0].statistics.likeCount,
          viewsCount: data.items[0].statistics.viewCount,
          duration: data.items[0].contentDetails.duration,
          rate: 0,
        } as Video;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error) {
    let errorMessage = "";
    if (error) {
      if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        errorMessage = `An error occurred: ${error.error.message}`;
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        errorMessage = `Backend returned code ${error.status}: ${error.body ? error.body.error : error.message}`;
      }
    } else {
      errorMessage = "Unexpected Error ocurred!";
    }
    return throwError(errorMessage);
  }
}

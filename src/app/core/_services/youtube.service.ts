import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Video } from "./../../videos/video.model";
import { Observable, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";

const apiKey = "AIzaSyDxhY4cS4CVQyIlDz3wnBq-3BvOLGIFaw4";
const baseURL = "https://www.googleapis.com/youtube/v3";

@Injectable({
  providedIn: "root",
})
export class YoutubeService {
  constructor(private httpService: HttpClient) {}

  getVideos(
    channelId: string,
    maxResults: number
  ): Observable<{ videos: Video[]; count: number }> {
    const url = `${baseURL}/search?channelId=${channelId}&key=${apiKey}&type=video,id&part=snippet&maxResults=${maxResults}`;
    return this.httpService.get(url).pipe(
      map((data: any) => {
        return {
          videos: data.items.map((item) => {
            return {
              id: item.id.videoId,
              title: item.snippet.title,
              description: item.snippet.description,
              defaultThumb: item.snippet.thumbnails.default.url,
              publishedDate: item.snippet.publishedAt,
              rate: 0,
            } as Video;
          }),
          count: data.pageInfo.totalResults,
        };
      }),
      catchError(this.handleError)
    );
  }

  getVideo(videoId: string): Observable<Video> {
    const url = `${baseURL}/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics,status`;
    return this.httpService.get(url).pipe(
      map((data: any) => {
        return {
          id: data.id.videoId,
          title: data.snippet.title,
          description: data.snippet.description,
          defaultThumb: data.snippet.thumbnails.default.url,
          publishedDate: data.snippet.publishedAt,
          likeCount: data.statistics.likeCount,
          viewsCount: data.statistics.viewCount,
          duration: data.contentDetails.duration,
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
        errorMessage = `Backend returned code ${error.status}: ${error.body.error}`;
      }
    } else {
      errorMessage = "Unexpected Error ocurred!";
    }
    return throwError(errorMessage);
  }
}

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

const apiKey = "AIzaSyDxhY4cS4CVQyIlDz3wnBq-3BvOLGIFaw4";
const baseURL = "https://www.googleapis.com/youtube/v3";

@Injectable({
  providedIn: "root",
})
export class YoutubeService {
  constructor(private httpService: HttpClient) {}

  getVideos(
    channelId: string,
    maxResults: number,
    sortField: string = '',
    pageToken: string = '',
    searchTerm: string = ''
  ): Observable<any> {
    let url;
    if (sortField) {
      url = `${baseURL}/search?channelId=${channelId}&key=${apiKey}&order=${sortField}&pageToken=${pageToken}&q=${searchTerm}&type=video,id&part=snippet&maxResults=${maxResults}`;
    } else {
      url = `${baseURL}/search?channelId=${channelId}&key=${apiKey}&pageToken=${pageToken}&q=${searchTerm}&type=video,id&part=snippet&maxResults=${maxResults}`;
    }
    return this.httpService.get(url);
  }

  getVideo(videoId: string): Observable<any> {
    const url = `${baseURL}/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails,statistics,status`;
    return this.httpService.get(url);
  }
}

import { Component, OnInit } from "@angular/core";
import { YoutubeService } from "src/app/core/_services/youtube.service";
import { Video } from "../video.model";
import { Observable } from "rxjs";
import { map, debounceTime, tap } from "rxjs/operators";
import {
  NzTableSortOrder,
  NzTableSortFn,
  NzTableFilterFn,
  NzTableFilterList,
} from "ng-zorro-antd";

interface ColumnItem {
  name: string;
  placeholder: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}

@Component({
  selector: "app-videos-list",
  templateUrl: "./videos-list.component.html",
  styleUrls: ["./videos-list.component.scss"],
})
export class VideosListComponent implements OnInit {
  videos$: Observable<Video[]>;
  channelId: string = "UCiP6wD_tYlYLYh3agzbByWQ";
  maxResultsPerPage: number = 10;
  pageIndex: number = 1;
  columns: ColumnItem[] = [];
  loading: boolean = false;
  totalCount: number;

  constructor(private youtubeService: YoutubeService) {}

  ngOnInit(): void {
    this.columns = [
      {
        name: "",
        placeholder: "Video Thumb Image"
      },
      {
        name: "Title",
        placeholder: "Video Title",
        sortOrder: null,
        sortFn: (a: Video, b: Video) => a.title.localeCompare(b.title)
      },
      {
        name: "Published Date",
        placeholder: "Video Published Date",
        sortOrder: null,
        sortFn: (a: Video, b: Video) =>
          a.publishedDate.localeCompare(b.publishedDate)
      },
      {
        name: "",
        placeholder: "Controls"
      },
    ];

    this.getVideos();
  }

  trackByName(_: number, item: ColumnItem): string {
    return item.name;
  }

  getVideos() {
    this.loading = true;
    this.videos$ = this.youtubeService
      .getVideos(this.channelId, this.maxResultsPerPage)
      .pipe(
        debounceTime(500),
        tap((data: any) => {
          this.loading = false;
          this.totalCount = data.count
        }),
        map((data: any) => data.videos),
      );
  }
}

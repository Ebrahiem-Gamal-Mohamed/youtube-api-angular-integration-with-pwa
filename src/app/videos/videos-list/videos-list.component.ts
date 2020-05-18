import { Component, OnInit, OnDestroy } from "@angular/core";
import { Video } from "./../video.model";
import { VideoService } from "./../video.service";
import { Observable, of, Subject } from "rxjs";
import { map, debounceTime, tap, catchError, takeUntil } from "rxjs/operators";
import {
  NzTableSortOrder,
  NzTableSortFn,
  NzTableFilterFn,
  NzTableFilterList,
} from "ng-zorro-antd";
import { FormControl } from '@angular/forms';

interface ColumnItem {
  name: string;
  key: string;
  placeholder: string;
  sortOrder?: NzTableSortOrder;
  sortFn?: NzTableSortFn;
  listOfFilter?: NzTableFilterList;
  filterFn?: NzTableFilterFn;
  filterMultiple?: boolean;
  sortDirections?: NzTableSortOrder[];
}

export enum SortFields {
  Title = 'title',
  PublishedDate = 'date',
  ViewCount = 'viewCount'
}

@Component({
  selector: "app-videos-list",
  templateUrl: "./videos-list.component.html",
  styleUrls: ["./videos-list.component.scss"],
})
export class VideosListComponent implements OnInit, OnDestroy {
  videos$: Observable<Video[]>;
  componentDestoyed$: Subject<Boolean> = new Subject<boolean>();
  columns: ColumnItem[] = [];
  filter: FormControl = new FormControl('');
  
  errorMessage: string;
  channelId: string;
  maxResultsPerPage: number;
  pageTokens: {next: string, prev: string}[] = [];
  pageTokenValue: string;
  pageIndex: number;
  totalCount: number;
  searchText: string;
  sortField: string;
  loading: boolean = false;

  constructor(private videoService: VideoService) {
    this.channelId = "UCiP6wD_tYlYLYh3agzbByWQ";
    this.maxResultsPerPage = 10;
    this.pageIndex = 1;
    this.columns = [
      {
        name: "",
        key: "",
        placeholder: "Video Thumb Image"
      },
      {
        name: "Title",
        key: SortFields.Title,
        placeholder: "Video Title",
        sortOrder: null,
        sortFn: (a: Video, b: Video) => a.title.localeCompare(b.title)
      },
      {
        name: "Published Date",
        key: SortFields.PublishedDate,
        placeholder: "Video Published Date",
        sortOrder: null,
        sortFn: (a: Video, b: Video) =>
          a.publishedDate.localeCompare(b.publishedDate)
      },
      {
        name: "",
        key: "",
        placeholder: "Controls"
      },
    ];
  }

  ngOnInit(): void {
    this.filter.valueChanges.pipe(
      takeUntil(this.componentDestoyed$),
      debounceTime(500)
    ).subscribe(searchTerm => {
      this.searchText = searchTerm;
      this.getVideosData();
    });
  }

  onQueryParamsChange(params) {
    const { pageIndex, pageSize, sort, filter } = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortOrder = (currentSort && currentSort.value) || '';
    this.sortField = (currentSort && currentSort.key) || '';
    this.maxResultsPerPage = pageSize;
    if (this.sortField) {
      this.searchText = '';
    }
    if (this.pageTokens.length === 1) {
      this.pageTokenValue = '';
    } else if (this.pageTokens[pageIndex-1] && this.pageTokens.length >= pageIndex-1) {
      this.pageTokenValue = this.pageTokens[pageIndex-1].prev ? this.pageTokens[pageIndex-1].prev : '';
    }
    this.getVideosData();
  }

  private getVideosData() {
    this.videos$ = this.videoService.getVideosList(
      this.channelId,
      this.maxResultsPerPage,
      this.sortField,
      this.pageTokenValue,
      this.searchText
    ).pipe(
      tap(() => this.loading = true),
      debounceTime(500),
      tap((data: any) => {
        this.loading = false;
        this.totalCount = data.count;
        this.pageTokenValue = data.pageToken.next;
        if (!this.pageTokens.some(page => page.next === this.pageTokenValue)) {
          this.pageTokens.push(data.pageToken);
        }
        console.log(this.pageTokens, this.pageTokenValue);
      }),
      map((data: any) => data.videos),
      catchError(err => {
        this.errorMessage = err;
        return of([]);
      })
    );
  }

  ngOnDestroy(): void {
    this.componentDestoyed$.next(null);
    this.componentDestoyed$.complete();
  }

}

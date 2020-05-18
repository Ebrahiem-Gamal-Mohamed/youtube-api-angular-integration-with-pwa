import { Component, OnInit } from '@angular/core';
import { VideoService } from './../../../videos/video.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(public videoService: VideoService,) { }

  ngOnInit(): void {
  }

}

import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  constructor(private title: Title) {
    this.title.setTitle('youtube-api-angular-integration-with-pwa');
  }
}

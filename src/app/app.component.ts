import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    // console.log(postData);
    // this.http.post('https://ng-complete-guide-30f1e.firebaseio.com/', postData);
    this.http
      .post(
        'https://ng-complete-guide-30f1e.firebaseio.com/posts.json',
        postData,
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }

  onFetchPosts() {
    // Send Http request
  }

  onClearPosts() {
    // Send Http request
  }
  private fetchPosts() {
    this.http
      .get('https://ng-complete-guide-30f1e.firebaseio.com/posts.json')
      .subscribe(posts => console.log(posts));
  }
}

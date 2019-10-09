import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}
  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    // console.log(postData);
    // this.http.post('https://ng-complete-guide-30f1e.firebaseio.com/', postData);
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-30f1e.firebaseio.com/posts.json',
        postData,
      )
      .subscribe(responseData => {
        console.log(responseData);
      });
  }
  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-30f1e.firebaseio.com/posts.json',
      )
      .pipe(
        map(responseData => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }
          return postArray;
        }),
      );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  error = new Subject<string>();
  constructor(private http: HttpClient) {}
  createAndStorePost(title: string, content: string) {
    const postData: Post = { title, content };
    // console.log(postData);
    // this.http.post('https://ng-complete-guide-30f1e.firebaseio.com/', postData);
    this.http
      .post<{ name: string }>(
        'https://ng-complete-guide-30f1e.firebaseio.com/posts.json',
        postData,
        {
          observe: 'response',
        },
      )
      .subscribe(
        responseData => {
          console.log(responseData.body);
        },
        error => {
          this.error.next(error.message);
        },
      );
  }
  fetchPosts() {
    return this.http
      .get<{ [key: string]: Post }>(
        'https://ng-complete-guide-30f1e.firebaseio.com/posts.json',
        {
          headers: new HttpHeaders({ 'Custom-header': 'Hello' }),
          params: new HttpParams().set('print', 'pretty'),
        },
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
        catchError(errorRes => {
          return throwError(errorRes);
        }),
      );
  }
  deletePosts() {
    return this.http.delete(
      'https://ng-complete-guide-30f1e.firebaseio.com/posts.json',
    );
  }
}

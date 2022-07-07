import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { transition } from '@angular/animations';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(){
    this.http
      .get<{messege : string; posts: any}>(
        'http://localhost:3000/api/posts'
      )
      .pipe(map((postData) => {
        return postData.posts.map((post: any) => {
          return {
            title : post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((tarnsPosts) => {
        this.posts = tarnsPosts;
        this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListner(){
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, content: string){
    const post: Post = { id: '', title: title, content: content }
    this.http.post<{ messege: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) =>{
        console.log(responseData.messege);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string){
      this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe( () => {
          console.log('Deleted');
        });
  }
}

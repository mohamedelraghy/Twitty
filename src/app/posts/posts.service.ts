import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts(){
    this.http.get<{messege : string, posts: Post[]}>('http://localhost:3000/api/posts')
    .subscribe((postsData) => {
      this.posts = postsData.posts;
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
}

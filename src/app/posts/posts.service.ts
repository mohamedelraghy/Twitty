import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { Subject } from 'rxjs'
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { transition } from '@angular/animations';
import { identifierName } from '@angular/compiler';
import { response } from 'express';


@Injectable({providedIn: 'root'})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient, private router: Router) {}

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

  addPost(title: string, content: string, image: File){
    const postData = new FormData();
    postData.append('title', title);
    postData.append('content', content);
    postData.append("image", image, title);

    this.http
      .post<{ messege: string, postId: string}>(
        'http://localhost:3000/api/posts',
         postData
      )
      .subscribe((responseData) =>{
        const post: Post = {
          id: responseData.postId,
          title: title,
          content: content
        };
        
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  getPost(id: string){
    return this.http.get<{_id: string, title: string, content: string}>("http://localhost:3000/api/posts/" + id);
  }

  updatePost(postId: string, title: string, content: string){
    const post: Post = {id: postId, title: title, content: content};
    this.http.put('http://localhost:3000/api/posts/' + postId, post)
      .subscribe(response =>{
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      });
  }

  deletePost(postId: string){
      this.http.delete('http://localhost:3000/api/posts/' + postId)
        .subscribe( () => {
          const updatedPosts = this.posts.filter(post => post.id !== postId);
          this.posts = updatedPosts;
          this.postsUpdated.next([...this.posts]);
        });
  }
}

import { Component, OnDestroy, OnInit} from "@angular/core";
import { subscribeOn, Subscription } from "rxjs";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: 'app-post-list',
  templateUrl:'./post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})

export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   {title: 'First Post', content: 'This is the First Post content'},
  //   {title: 'second Post', content: 'This is the second Post content'},
  //   {title: 'third Post', content: 'This is the third Post content'}
  // ]

  posts: Post[] = [];
  private postsSub: Subscription = new Subscription();

  constructor(public postsService: PostsService){}

  ngOnInit(){
    this.posts = this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListner()
    .subscribe((posts: Post[]) => {
      this.posts = posts;
    });
  }

    ngOnDestroy(){
      this.postsSub.unsubscribe();
    }

}

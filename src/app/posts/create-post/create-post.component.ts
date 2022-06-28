import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})

export class CreatePostComponent {

  // @Output() postCreated = new EventEmitter<Post>();

  constructor(public postsService: PostsService ){}

  onAddPost(form: NgForm){

    if(form.invalid) return;

    this.postsService.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}

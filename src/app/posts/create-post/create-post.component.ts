import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Post } from "../post.model";
import { PostsService } from "../posts.service";


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
})

export class CreatePostComponent implements OnInit {

  // @Output() postCreated = new EventEmitter<Post>();
  post: Post;
  isLoading = false;
  form: FormGroup;
  private mode = 'create';
  private postId: string| null = null;

  constructor(public postsService: PostsService, public route: ActivatedRoute){}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {validators: [Validators.required]})
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId)
        .subscribe(postData =>{
            this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content
            };
            this.form.setValue({
              title: this.post.title,
              content: this.post.content
            });
          });
      }else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }
  onSavePost(){

    if(this.form.invalid) return;
    this.isLoading = true;
    if(this.mode === 'create'){
      this.postsService.addPost(this.form.value.title, this.form.value.content);
      
    }else{
      this.postsService.updatePost(this.postId, this.form.value.title, this.form.value.content)
    }
    this.form.reset();
  }
}

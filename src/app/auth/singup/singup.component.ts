import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class LoginComponent {
  isLoading = false;
  onLogin(form: NgForm){
    console.log(form.value);

  }
}

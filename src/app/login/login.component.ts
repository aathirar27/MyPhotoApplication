import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInFormVisible = true;
  logOutVisible = true;

  email: any;
  password: any;
  name:any;

  constructor(public userService:UserService){

  }

    ngOnInit(): void {
  }

  makeSignInFormVisible(){
    this.signInFormVisible = true;
  }

  makeSignUpFormVisible(){
    this.signInFormVisible = false;
  }


  userSignedIn(){

  
this.logOutVisible = true;

  }

  userSignedOut(){

  
    this.logOutVisible = false;
    
      }
    
  

  login(){

    console.log("user tried to login")
    this.userService.login(this.email,this.password)
    this.email =""
    this.password=""

}

signup(){

    console.log("user tried to signup");
    console.log("Name in component", this.name);
  this.userService.signup(this.email,this.password,this.name)
  this.email=""
  this.password=""



}



}

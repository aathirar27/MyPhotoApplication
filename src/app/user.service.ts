import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { User } from './User';
import { environment } from 'src/environments/environment';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate{

  
  user: Observable<firebase.User|null>;
    defaultProfilePhoto: string = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"

  constructor(private firebaseAuth: AngularFireAuth,private router:Router
    ,private http:HttpClient,
    private messageService:MessageService) {
    this.user = firebaseAuth.authState;

    console.log("user id token at construction of service", localStorage.getItem('userIdToken'));

    this.user.subscribe(

        userInfo => {
            console.log("user info is available", userInfo);
        
        if(userInfo!==null)
        this.saveIdToken(userInfo);

      }
    );
  }


  canActivate():boolean{

    if(this.firebaseAuth.auth.currentUser!=null){

      return true;
    }

    this.router.navigate(['login'])
    return false;


  }
  


  saveIdToken(firebaseUser:firebase.User|null){

    if(firebaseUser!=null)

    firebaseUser.getIdToken().then(
        idTokenValue => {

       localStorage.setItem('userIdToken', idTokenValue);
       console.log("Id Token Value:",localStorage.getItem('userIdToken'));
      }
      );
  }


  signup(email: string, password: string, name: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
          console.log('Success signup', value);
          console.log("Name in signup", name);
        this.saveIdToken(value.user);
        this.registerUser(email, name);

      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
        this.messageService.newMessage(err.message);
      });    
  }

    registerUser(email: string, name: string) {

        console.log("Name in registration", name);

        var user: User = {
            emailAddress: email,
            name: name,
            profilePicUrl: this.defaultProfilePhoto,
            id: ""
        };

        var headers = this.getHeaders();
        console.log("calling registration from service");
        this.http.post("http://65.0.100.164:8080/api/users/addNewUser", user, {headers})
          .subscribe(response => {
              console.log('Success registration');
              this.router.navigate(['albums/recent']);
          });
  }

  

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!');
        this.saveIdToken(value.user);

        this.router.navigate(['albums/recent'])

        
      })
      .catch(err => {
        console.log('Something went wrong:',err.message);
                this.messageService.newMessage(err.message);

      });
  }

  logout() {
    localStorage.clear();
    this.firebaseAuth
      .auth
      .signOut();
      this.router.navigate(['login'])

  }

  getCurrentUserProfile(){

      var headers = this.getHeaders();
      return this.http.get("http://65.0.100.164:8080/api/users/me", {headers});
      //return this.http.get("http://65.0.100.164:8080/api/users/findByName?name=", name);
      //return this.http.get("http://65.0.100.164:8080/api/users/?id=",{headers}); 
  }

  getHeaders(){
    var headers  = {
    'idToken': localStorage.getItem('userIdToken') || '{}'
    };

    return headers;
  }

}

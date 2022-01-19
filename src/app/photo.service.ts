import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Album } from './Album';
import { Comment } from './Comment';
import { Photo } from './Photo';


@Injectable({
  providedIn: 'root'
})



export class PhotoService {

  constructor(private http:HttpClient, private router:Router) { }

    makeProfilePhoto(profilePicUrl: string | number | boolean) {
        var headers = this.getHeaders();
        var params = new HttpParams().set('profilePicUrl', profilePicUrl);
        return this.http.put("http://65.0.100.164:8080/api/users/me/profilePhoto", { headers });
    }
  makeCoverPhoto(){

    
  }

  getAllPhotos(){

    var headers = this.getHeaders();
      return this.http.get("http://13.233.231.253:8080/api/photos",{headers})
  }


  getPhoto(photoId: string|null){
      console.log("photo id is:", photoId);
      var headers = this.getHeaders();
      return this.http.get("http://65.0.100.164:8080/api/photos/" + photoId, {headers});
  }

  getComments(photoId: string|null|undefined){
    var headers = this.getHeaders();
      return this.http.get("http://65.0.100.164:8080/api/photos/" + photoId + "/comments", { headers });
  }


  


  savePhoto(albumId:string|undefined|null,fileId:string){


    var photo: Photo = {
      albumId: albumId,
      createdBy: "",
      dateCreated: "",
        photoUrl: "http://65.0.100.164:8080/api/files/show/" + fileId,
      id: ""
    };

      //this.http.post("http://65.0.100.164:8080/api/photos", photo, {headers})
      //    .subscribe(photoData => {
      //        console.log("ivade vare varanondo enn nokua");
      //        console.log("photo saved in the album", photoData);
      //    });
      var headers = this.getHeaders();
      console.log("http de mumb vare varuo");
      return this.http.post("http://65.0.100.164:8080/api/photos", photo, { headers });
  }


  saveComment(photoId:string|undefined|null,newComment:string|undefined){

      var comment: Comment = {
      createdBy: "",
      dateCreated: "",
      message: newComment,
      photoId: photoId,
      id: ""
    };

      var headers = this.getHeaders();
      return this.http.post("http://65.0.100.164:8080/api/photos/comments", comment, { headers });
  }



  getHeaders(){

    var headers = {

    'idToken': localStorage.getItem('userIdToken') || '{}'

    };

    return headers;
  }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Album } from './Album';

@Injectable({
  providedIn: 'root'

  
})
export class AlbumService {

    constructor(private http: HttpClient, private router: Router) { }

    saveAlbum(userName: string, albumTitle: string, fileId: string) {
        console.log("Album from service");
        var album: Album = {
            id: "",
            name: albumTitle,
            coverPhotoUrl: "http://65.0.100.164:8080/api/files/show/" + fileId,
            createdBy: userName,
            dateCreated: ""
        };
        console.log("user nte pole irikunna album ahn ith", album);

        var headers = this.getHeaders();
        this.http.post("http://65.0.100.164:8080/api/albumsDb", album, { headers })
            .subscribe(albums => {
                console.log("Album created", albums);
            });

    }

  getAllAlbums(){

    
    var headers = this.getHeaders();
    
    console.log("Calling getallalbums method with header",headers);
    
      return this.http.get("http://65.0.100.164:8080/api/albumsDb", {headers});
  
  }

  getPhotos(albumId:string|null|undefined){

    var headers = this.getHeaders();
    
    console.log("Calling getallalbums method with header",headers);

      return this.http.get("http://65.0.100.164:8080/api/albumsDb/" + albumId + "/photos", {headers});

  }


  getAlbum(albumId:string|null|undefined){

    var headers = this.getHeaders();
    
    console.log("Calling getalbum method with header",headers);

    
      return this.http.get("http://13.233.231.253:8080/api/albums/find?id="+albumId,{headers});

  }


  updateAlbumCover(album:Album){


    var headers = this.getHeaders();

      return this.http.put("http://13.233.231.253:8080/api/albums",album,{headers})
    .subscribe(albumData=> {

      console.log("album saved:",albumData);
      var album :Album = <Album>(albumData);
      var albumId = album.id;

      this.router.navigate(['albums/',albumId])


      

    })

  }





  

  getHeaders(){

    

    var headers  = {

    'idToken': localStorage.getItem('userIdToken') || '{}'

    };

    return headers;
  }
}

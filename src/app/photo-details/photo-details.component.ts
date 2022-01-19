import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../Album';
import { AlbumService } from '../album.service';
import { Comment } from '../Comment';
import { Photo } from '../Photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  photoId: string | undefined |null; 
  
  albumId: string | undefined |null;

  newComment:string | undefined;

  albums: Album[] |undefined

  album: Album|undefined
    photo: Photo | undefined;
  photos:Photo[]|undefined|null;
    allComments: Comment[] | undefined | null;

    image = "https://video.cgtn.com/news/784d6a4e344d7a4e7751444e314d7a4d…68c4ef0b4c0f69eed2783a8/6878ed54968c4ef0b4c0f69eed2783a8.jpg";

  constructor(private route:ActivatedRoute,private photoService:PhotoService,private albumService:AlbumService) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params=> {
     this.photoId= params.get('photoId');
     console.log('Got photo Id:',this.photoId);
     this.loadPhoto(this.photoId);
     this.loadComments(this.photoId);
  });

}

loadPhoto(photoId: string|null){

    this.photoService.getPhoto(photoId).subscribe(
    photo=>{
      this.photos = <Photo[]>photo;
      //if(this.photos.length!=0)
      //this.photo = this.photos[0];
      //this.albumId = this.photo?.albumId;
      console.log("Loaded photo details:",this.photos );
    }
  )

}

loadComments(photoId:string|null|undefined){

  this.photoService.getComments(photoId).subscribe(
    comments=>{
      this.allComments = (<Comment[]>comments).reverse();
      console.log("Loaded photo comments:",this.allComments );
    }
  )

}


saveComment(){

  this.photoService.saveComment(this.photoId,this.newComment)
  .subscribe(
    response=>{
      console.log("Comment Posted");
      this.loadComments(this.photoId);
      this.newComment="";
    }

  )
}

    //makeProfilePhoto() {
    //    this.photoService.makeProfilePhoto(this.photo.photoUrl)
    //        .subscribe(
    //            response => {
    //                console.log("Profile photo updated", response
    //                );

    //            }
    //        )
    //}

makeCover(){


  this.albumService.getAlbum(this.albumId).subscribe(
    albums=>{

      console.log(this.albumId)

      this.albums = <Album[]>albums;
      if(this.albums.length!=0)
      {


        this.album = this.albums[0];
        this.album.coverPhotoUrl = this.photo?.photoUrl;
        


        this.albumService.updateAlbumCover(this.album);
        

        

      }


    }

  )


  
}



// makeCOverPhoto(photoUrl:string){

//   this.fileService.uploadFile(event.target.files[0]).subscribe(
//     fileResponse => {
//       console.log("File response from service:", fileResponse)
//       if (fileResponse==true){

//         var fileName = event.target.files[0].name;
//         this.saveAlbum(fileName);

//       }
//     }
//   )
// }

// saveAlbum(fileName:string){

//   this.photoService.savePhoto(this.albumId,fileName)


// }

}





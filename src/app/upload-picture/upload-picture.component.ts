import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../file.service';
import { Photo } from '../Photo';
import { PhotoService } from '../photo.service';

@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {

    albumId: string | undefined | null;
    photos: Photo[] | undefined | null;
    photoId!: string | null;

    
    constructor(private photoService: PhotoService, private router: Router, private route:ActivatedRoute,private fileService: FileService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=> {
      this.albumId= params.get('albumId');
      console.log('Got album Id:',this.albumId);
   });
  }


  uploadPicture(event:any){

    console.log("file:",event.target.files[0]);
    this.fileService.uploadFile(event.target.files[0]).subscribe(
      fileResponse => {
            console.log("File response from service:", fileResponse)
            console.log("FileId is:", Object(fileResponse)["id"]);
            var fileId = Object(fileResponse)["id"];
            this.savePhoto(fileId);

      }
    )
  }

    loadPhoto(photoId: string | null) {

        this.photoService.getPhoto(photoId).subscribe(
            photo => {
                this.photos = <Photo[]>photo;
                console.log("Loaded photo details:", this.photos);
            });
    }

    savePhoto(fileId: string) {
        this.photoService.savePhoto(this.albumId, fileId)
            .subscribe(
                response => {
                    console.log("Comment Posted");
                    this.loadPhoto(this.photoId);
                });
        this.router.navigate(['album/', this.albumId]);
    }

}

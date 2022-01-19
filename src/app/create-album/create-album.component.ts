import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlbumService } from '../album.service';
import { FileService } from '../file.service';

@Component({
  selector: 'app-create-album',
  templateUrl: './create-album.component.html',
  styleUrls: ['./create-album.component.css']
})
export class CreateAlbumComponent implements OnInit {

    albumTitle!: string;
    userName!: string;

    constructor(private fileService: FileService, private albumService: AlbumService, private router: Router) { }

  ngOnInit(): void {
  }

    createAlbum(event: any) {

        console.log("File is:", event.target.files[0]);
    this.fileService.uploadFile(event.target.files[0]).subscribe(
        fileResponse => {
            console.log("File response from service:", fileResponse);
            console.log("FileId is:", Object(fileResponse)["id"]);
            var fileId = Object(fileResponse)["id"];
            this.saveAlbum(fileId);
        }
    );
  }

    saveAlbum(fileId: string) {
        console.log("album1");
        this.albumService.saveAlbum(this.userName, this.albumTitle, fileId);
        this.router.navigate(['albums/recent']);
  }
}

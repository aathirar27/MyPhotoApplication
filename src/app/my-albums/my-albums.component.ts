import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album } from '../Album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {


  albums:Album[] | undefined;

  constructor(private albumService:AlbumService) { }

  ngOnInit(): void {

    console.log("Calling albumservice from component");


    this.albumService.getAllAlbums().subscribe(

            response=>{

              this.albums = <Album[]>response;
      
              console.log("all album response",this.albums);
              
            }
          );

  }

}

  

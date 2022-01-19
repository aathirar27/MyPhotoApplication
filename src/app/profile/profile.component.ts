import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from '../User';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'Profile Page Title'

    imageUrl = 'https://www.regionalsan.com/sites/main/files/imagecache/lightbox/main-images/vacant_placeholder_0.gif'

 

  user : User | undefined;

    imageUrl1 = "https://th.bing.com/th/id/OIP.YqnFW9Yb14eacnpcmR2vQgAAAA?pid=ImgDet&rs=1";

    constructor(private userService: UserService, private http: HttpClient) {
        
    }

  ngOnInit(): void {

      this.userService.getCurrentUserProfile()
          .subscribe(
          userProfile => {
                  this.user = <User>userProfile;
                  console.log("Got user profile", this.user);
          });


  }

}

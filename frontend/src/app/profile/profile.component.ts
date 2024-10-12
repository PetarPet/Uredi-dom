import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private domSanitizer:DomSanitizer,private userService:UserService, private router:Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(localStorage.getItem('logged'));
    if (this.logged.profileImg != null) {
      this.userService.getImg(this.logged.profileImg).subscribe((image) => {
        let urlCreator = window.URL || window.webkitURL;
        let imageUrl = urlCreator.createObjectURL( image );

        this.logged.user_photo = this.domSanitizer.bypassSecurityTrustResourceUrl(imageUrl);
      })
    }
  }

  logged:User;

}

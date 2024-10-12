import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { Comment } from '../Models/Comment';

@Component({
  selector: 'app-show-comments',
  templateUrl: './show-comments.component.html',
  styleUrls: ['./show-comments.component.css']
})
export class ShowCommentsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.logged=JSON.parse(localStorage.getItem("logged"));
    this.agency=JSON.parse(localStorage.getItem('agency'));
    this.comments=this.agency.comments;
  }

  displayedColumns:string[] = ['user','comments','grade'];
  logged:User;
  agency:User;
  comments:Comment[];
}

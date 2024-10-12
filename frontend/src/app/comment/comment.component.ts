import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { Comment } from '../Models/Comment';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.myComment=new Comment();
    this.logged=JSON.parse(localStorage.getItem('logged'));
    this.agencyusername=localStorage.getItem('agencyName');
    this.jobID=Number(localStorage.getItem('jobID'));
    this.userService.getUserByUsername(this.agencyusername).subscribe((a:User)=>{
      this.agency=a;
      this.agency.comments.forEach(element => {
        if(element.client==this.logged.username && element.jobID==this.jobID){
          this.myComment=element;
        }
      });
    })
  }


  message:string;
  agency:User;
  myComment:Comment;
  logged:User;
  agencyusername:string;
  jobID:number;

  addComment(){
    if(this.myComment.commentText==undefined||this.myComment.grade==undefined){
      this.message="Morate uneti sve podatke!";
    } else {
      this.myComment.client=this.logged.username;
      this.myComment.jobID=this.jobID;
      this.userService.addComment(this.agency.username,this.myComment).subscribe((res)=>{
        if(res['message']=='comment added') this.message="Uspesno!";
        else this.message="Greska!";
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { MyObject } from '../Models/MyObject';
import { ObjectService } from '../Services/object.service';

@Component({
  selector: 'app-make-request',
  templateUrl: './make-request.component.html',
  styleUrls: ['./make-request.component.css']
})
export class MakeRequestComponent implements OnInit {

  constructor(private objectService:ObjectService) { }

  ngOnInit(): void {
    this.logged=JSON.parse(localStorage.getItem('logged'));
    this.username=JSON.parse(localStorage.getItem('username'));
    this.objectService.getAllObjectsForUser(this.logged.username).subscribe((o:MyObject[])=>{
      this.myObjects=o;
    })
  }

  idO:string;
  dateFrom:Date;
  dateTo:Date;
  logged:User;
  username:string;
  myObjects:MyObject[];
  message:string;
  jobID:number;

  findLastID(){
    let i=0;
    this.jobID=1;
    for(i;i<this.myObjects.length;i++){
      if(this.myObjects[i].idO!=parseInt(this.idO)) continue;
      else {
        this.jobID = this.myObjects[i].jobs.length+1;
      }
    }
  }

  sendRequest(){
    if(this.idO==undefined||this.dateFrom==undefined||this.dateTo==undefined){
      this.message="Morate uneti sve podatke";
    } else {
      this.findLastID();
      this.objectService.addJob(this.idO,this.jobID,this.dateFrom,this.dateTo,this.username).subscribe((res)=>{
        if(res['message']=="job added") {
          this.message="Zahtev poslat!";
        }
        else this.message="Greska pri slanju zahteva!";
      })
    }
  }
}

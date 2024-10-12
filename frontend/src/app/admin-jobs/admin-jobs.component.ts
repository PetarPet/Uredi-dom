import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { MyObject } from '../Models/MyObject';
import { ObjectService } from '../Services/object.service';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-admin-jobs',
  templateUrl: './admin-jobs.component.html',
  styleUrls: ['./admin-jobs.component.css']
})
export class AdminJobsComponent implements OnInit {

  constructor(private objectsService:ObjectService, private userService:UserService) { }

  ngOnInit(): void {
    this.logged=JSON.parse(localStorage.getItem('logged'));
    this.objectsService.getAllObjects().subscribe((o:MyObject[])=>{
      this.allObjects=o;

      this.allObjects = this.allObjects.filter((object)=>{
        if(object.jobs.length!=0) return true;
        else return false;
      })

      this.allObjects.forEach(element => {
        this.userService.getUserByUsername(element.owner).subscribe((owner:User)=>{
          element.user=owner;
        })
      });
    })

  }

  displayedColumnsRequestsInside:string[] = ['jobID','agency','status','datumOD','datumDO'];
  displayedColumnsRequests:string[] = ['client','adresa','type','rooms','area','jobs'];

  logged:User;
  allObjects:MyObject[];
}

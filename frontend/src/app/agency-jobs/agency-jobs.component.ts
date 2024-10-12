import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { MyObject } from '../Models/MyObject';
import { ObjectService } from '../Services/object.service';
import { UserService } from '../Services/user.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agency-jobs',
  templateUrl: './agency-jobs.component.html',
  styleUrls: ['./agency-jobs.component.css']
})
export class AgencyJobsComponent implements OnInit {

  constructor(private objectService: ObjectService, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(localStorage.getItem('logged'));
    //Dohvatanje zahteva
    this.objectService.getAllRequestsForAgency(this.logged.username).subscribe((o:MyObject[])=>{
      this.newRequests = o;
      
      this.newRequests.forEach(element => {
        element.user=new User();
        element.jobs = element.jobs.filter((job)=>{
          if(job.status=='zahtev' && job.odgovorAgencije!='Odbila') return true;
          else return false;
        })
      });

      this.newRequests.forEach(element => {
        this.userService.getUserByUsername(element.owner).subscribe((owner:User)=>{
          element.user=owner;
        })
      });
    })

    //Dohvatanje aktivnih poslova
    this.objectService.getAllActiveForAgency(this.logged.username).subscribe((o:MyObject[])=>{
      this.active = o;

      this.active.forEach(element => {
        element.user=new User();
        element.jobs = element.jobs.filter((job)=>{
          if(job.status=='aktivan') return true;
          else return false;
        })
      });

      this.active.forEach(element => {
        this.userService.getUserByUsername(element.owner).subscribe((owner:User)=>{
          element.user=owner;
        })
      });
    })
  }

  active: MyObject[];
  newRequests: MyObject[];
  logged: User;

  displayedColumnsRequestsInside:string[] = ['jobID','status','datumOD','datumDO','response','offer','accept','reject'];
  displayedColumnsRequests:string[] = ['client','adresa','type','rooms','area','jobs'];

  displayedColumnsActiveInside:string[] = ['jobID','status','datumOD','datumDO','response','showProgress'];
  displayedColumnsActive:string[] = ['client','adresa','type','rooms','area','jobs'];

  offer:number;

  sendOffer(idO,jobID){
    if(this.offer!=undefined){
    this.objectService.sendOffer(idO,jobID,this.offer).subscribe((res)=>{
      if(res['message']=='offer sent') location.reload();
      else alert("Greska pri promeni statusa");
    });
    }
  }

  reject(idO,jobID){
    this.objectService.rejectByAgency(idO,jobID).subscribe((res)=>{
      if(res['message']=='rejected') location.reload();
      else alert("Greska pri promeni statusa");
    })
  }

  showProgress(sketch,idO,jobID,agencyWorking,datumOD,datumDO){
    localStorage.setItem('sketch',JSON.stringify(sketch));
    localStorage.setItem('idO',idO);
    localStorage.setItem('jobID',jobID);
    localStorage.setItem('datumOD',datumOD);
    localStorage.setItem('datumDO',datumDO);
    localStorage.setItem('agencyWorking',agencyWorking);
    this.router.navigate(['showProgress']);
  }
}

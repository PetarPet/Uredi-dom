import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { MyObject } from '../Models/MyObject';
import { ObjectService } from '../Services/object.service';
import { Job } from '../Models/Job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-jobs',
  templateUrl: './client-jobs.component.html',
  styleUrls: ['./client-jobs.component.css']
})
export class ClientJobsComponent implements OnInit {

  constructor(private router:Router, private objectService:ObjectService) { }

  ngOnInit(): void {
    this.logged=JSON.parse(localStorage.getItem('logged'));
    this.objectService.getAllObjectsForUser(this.logged.username).subscribe((o:MyObject[])=>{
      this.myObjects=o;
    })
  }

  displayedColumnsInside: string[] = ['jobID', 'status', 'datumOD', 'datumDO', 'response','offer','comment','showProgress','accept','reject'];
  displayedColumns: string[] = ['type', 'state', 'city', 'street','streetNum','jobs'];
  
  logged:User;
  myObjects:MyObject[];

  comment(agency,jobID){
    localStorage.setItem('agencyName',agency);
    localStorage.setItem('jobID',jobID);
    this.router.navigate(['comment'])
  }

  accept(idO,jobID){
    this.objectService.accept(idO,jobID).subscribe((res)=>{
      if(res['message']=='activated') location.reload();
      else alert("Greska pri promeni statusa");
    })
  }

  reject(idO,jobID){
    this.objectService.reject(idO,jobID).subscribe((res)=>{
      if(res['message']=='deleted') location.reload();
      else alert("Greska pri promeni statusa");
    })
  }

  showProgress(sketch,idO,jobID){
    localStorage.setItem('sketch',JSON.stringify(sketch));
    localStorage.setItem('idO',idO);
    localStorage.setItem('jobID',jobID);
    let canStart:boolean=true;
    localStorage.setItem('canStart',JSON.stringify(canStart));
    this.router.navigate(['showProgress']);
  }

  showRequests(){
    this.myObjects.forEach(element => {
      element.jobs = element.jobs.filter((a)=>{
        if(a.status=='zahtev') return true;
        else return false;
      })
    });
  }

  showActives(){
    this.myObjects.forEach(element => {
      element.jobs = element.jobs.filter((a)=>{
        if(a.status=='aktivan') return true;
        else return false;
      })
    });
  }

  showFinised(){
    this.myObjects.forEach(element => {
      element.jobs = element.jobs.filter((a)=>{
        if(a.status=='zavrsen') return true;
        else return false;
      })
    });
  }

  showAll(){
    this.objectService.getAllObjectsForUser(this.logged.username).subscribe((o:MyObject[])=>{
      this.myObjects=o;
    })
  }
}

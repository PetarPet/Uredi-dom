import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { Sketch } from '../Models/Sketch';
import { ObjectService } from '../Services/object.service';
import { Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import { Worker } from '../Models/Worker';

@Component({
  selector: 'app-show-progress',
  templateUrl: './show-progress.component.html',
  styleUrls: ['./show-progress.component.css']
})
export class ShowProgressComponent implements OnInit {

  constructor(private objectService: ObjectService, private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(localStorage.getItem('logged'));
    this.mySketch = JSON.parse(localStorage.getItem('sketch'));
    this.idO = parseInt(localStorage.getItem('idO'));
    this.jobID = parseInt(localStorage.getItem('jobID'));
    this.agencyusername = localStorage.getItem('agencyWorking');
    this.datumODString = localStorage.getItem('datumOD');
    this.datumOD = new Date(this.datumODString);
    this.datumDOString = localStorage.getItem('datumDO');
    this.datumDO = new Date(this.datumDOString);
    this.canPay = true;
    let i = 0;
    for (i; i < this.mySketch.length; i++) {
      if (this.mySketch[i].status != 'zavrseno' && this.mySketch[i].type != 'door') {
        this.canPay = false;
        break;
      }
    }
    this.roomNames = [];
    this.mySketch.forEach(element => {
      if (element.type == 'room') this.roomNames.push(element.name);
    });

    //Dohvatimo sve radnike nase agencije
    this.adminService.getAllWorkersForAgency(this.agencyusername).subscribe((w: Worker[]) => {
      this.workers = w;
      this.workers=this.workers.filter((worker) => {
        let i = 0;
        let canWork = true;
        for (i; i < worker.reserved.length; i++) {
          let workerBusyFrom = new Date(worker.reserved[i].datumOD);
          let workerBusyTo = new Date(worker.reserved[i].datumDO);

          if(worker.reserved[i].jobID==this.jobID){
            this.currentlyWorking.push(worker);
            return false;
          }

          if (this.datumOD < workerBusyFrom) {
                  if (this.datumDO < workerBusyFrom) canWork = true;
                  else return false;
          } else {
                  if (this.datumOD == workerBusyFrom) return false;
                  else {
                        //datumOD > workerBusyFrom
                        if (this.datumOD > workerBusyTo) canWork = true;
                        else return false;
                  }
                }
        }
        return canWork;
      })
      if((this.workers.length+this.currentlyWorking.length)<this.roomNames.length) this.canStart=false;
      else this.canStart=true;
    
      localStorage.setItem('canStart',JSON.stringify(this.canStart));
    })
  }

  workerToAddID:string;

  addWorker(){
    this.adminService.reserveWorker(this.workerToAddID,this.datumODString,this.datumDOString,this.jobID).subscribe((res)=>{
      if(res['message']=='added'){
        location.reload();
      } else alert("Greska pri rezervaciji radnika");
    })
  }

  currentlyWorking:Worker[]=[];
  canStart:boolean;
  datumOD: Date;
  datumODString:string;
  datumDO: Date;
  datumDOString:string;
  agencyusername: string;
  canPay: boolean;
  logged: User;
  mySketch: Sketch[];
  roomNames: string[];
  idO: number;
  jobID: number;
  workers: Worker[];

  pay() {
    this.objectService.pay(this.idO, this.jobID).subscribe((res) => {
      if (res['message'] == 'paid') this.router.navigate(['clientJobs']);
      else alert("Greska pri placanju");
    })
  }

  roomName: string;
  status: string;
  message: string;

  changeStatus() {
    if (this.roomName == undefined || this.status == undefined) {
      this.message = "Morate uneti sve podatke";
    } else {
      this.objectService.setStatusForRoom(this.idO, this.roomName, this.status).subscribe((res) => {
        if (res['message'] == 'status changed') {
          this.mySketch.forEach(element => {
            if (element.name == this.roomName) element.status = this.status;
          });
          localStorage.setItem('sketch', JSON.stringify(this.mySketch));
          location.reload();
        } else alert("Greska pri placanju");
      })
    }
  }
}

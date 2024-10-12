import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { AdminService } from '../Services/admin.service';
import { Worker } from '../Models/Worker';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-workers',
  templateUrl: './admin-workers.component.html',
  styleUrls: ['./admin-workers.component.css']
})
export class AdminWorkersComponent implements OnInit {

  constructor(private adminService:AdminService, private router:Router) { }

  ngOnInit(): void {
    this.agencyUsername = localStorage.getItem('agency');
    this.logged=JSON.parse(localStorage.getItem('logged'));
    this.adminService.getAllWorkersForAgency(this.agencyUsername).subscribe((w:Worker[])=>{
      this.allWorkers=w;
    })
  }

  allWorkers:Worker[];
  agencyUsername:string;
  logged:User;
  message:string;
  displayedColumns:string[] = ['id','firstname','lastname','email','phone','speciality','edit','delete'];
  
  firstname:string;
  lastname:string;
  email:string;
  phone:string;
  speciality:string;

  addWorker(){
    if(this.firstname==undefined || this.lastname==undefined || this.email==undefined ||
      this.phone==undefined||this.speciality==undefined){
        this.message="Morate uneti sve podatke!";
      } else {
        let workerID=1;
        this.adminService.getAllWorkersInSystem().subscribe((w:Worker[])=>{
          if(w!=null){
            workerID=w.length+1;
          } else workerID=1;

          //Provera unosa
          //Provera da li je mejl dobrog tipa
          let emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!emailRegex.test(this.email)) {
            this.message = "Email nije u dobrom formatu!";
            return;
          }

          let phoneRegex: RegExp = /^\d{3}\/\d{3}-\d{4}$/;
          if (!phoneRegex.test(this.phone)) {
            this.message = "Telefon nije u dobrom formatu!";
            return;
          }

          this.adminService.addWorker(workerID,this.firstname,this.lastname,this.email,
            this.phone,this.speciality,this.agencyUsername).subscribe((res)=>{
              if(res['message']=='added') location.reload();
              else alert("Greska pri dodavanju radnika");
            })
        })
      }
  }


  editWorker(element){
    localStorage.setItem('worker',JSON.stringify(element));
    this.router.navigate(['edit']);
  }

  deleteWorker(workerID){
    this.adminService.deleteWorker(workerID).subscribe((res)=>{
      if(res['message']=='deleted') location.reload();
      else alert("Greska pri brisanju radnika");
    })
  }
}

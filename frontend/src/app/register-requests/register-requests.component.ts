import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { AdminService } from '../Services/admin.service';

@Component({
  selector: 'app-register-requests',
  templateUrl: './register-requests.component.html',
  styleUrls: ['./register-requests.component.css']
})
export class RegisterRequestsComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
    this.logged=JSON.parse(localStorage.getItem('logged'));
    this.adminService.getNewRequests().subscribe((r:User[])=>{
      this.requests=r;
    })
  }
  logged:User;
  requests:User[];

  displayedColumns:string[] = ['basicInfo','email','adresa','phone','type','accept','reject'];

  acceptRequest(username){
    this.adminService.acceptRequest(username).subscribe((res)=>{
      if(res['message']=='accepted'){
        location.reload();
      } else alert("Greska pri odobravanju zahteva");
    })
  }

  rejectRequest(username){
    this.adminService.rejectRequest(username).subscribe((res)=>{
      if(res['message']=='rejected'){
        location.reload();
      } else alert("Greska pri odbijanju zahteva");
    })
  }
}

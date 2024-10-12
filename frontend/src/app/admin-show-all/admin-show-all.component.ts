import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../Models/User';
import { AdminService } from '../Services/admin.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-show-all',
  templateUrl: './admin-show-all.component.html',
  styleUrls: ['./admin-show-all.component.css']
})
export class AdminShowAllComponent implements OnInit {

  constructor(private adminService:AdminService, private router:Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(localStorage.getItem('logged'));
    this.adminService.getAllUsers().subscribe((u:User[])=>{
      this.allUsers=u;
    })
  }

  displayedColumns:string[] = ['type','basicInfo','email','phone','adresa','status','edit','delete','workers'];

  logged:User;
  allUsers:User[];;

  deleteUser(username){
    this.adminService.deleteUser(username).subscribe((res)=>{
      if(res['message']=='deleted') location.reload();
      else alert("Greska pri brisanju korisnika");
    })
  }

  edit(element){
    localStorage.setItem('editUser',JSON.stringify(element));
    this.router.navigate(['edit']);
  }

  addNew(){
    localStorage.setItem('fromAdmin','yes');
    this.router.navigate(['register']);
  }

  showWorkers(username){
    localStorage.setItem('agency',username);
    this.router.navigate(['adminWorkers']);
  }
}

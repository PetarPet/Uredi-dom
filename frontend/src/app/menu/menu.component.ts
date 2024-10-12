import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  @Input() 
  logged:User;

  logout(){
    localStorage.clear();
    if(this.logged.type!='admin'){
    this.router.navigate(['login']);
    } else this.router.navigate(['adminLogin']);
  }

  home(){
    this.router.navigate(['']);
  }

  profile(){
    this.router.navigate(['profile'])
  }

  objects(){
    this.router.navigate(['objects'])
  }

  agencyList(){
    this.router.navigate(['agencyList']);
  }

  clientJobs(){
    this.router.navigate(['clientJobs']);
  }

  changePassword(){
    if(this.logged.type=='klijent'){
    this.router.navigate(['client']);
    } else if(this.logged.type=='agencija'){
      this.router.navigate(['agency']);
    } else this.router.navigate(['admin']);
  }
  
  agencyJobs(){
    this.router.navigate(['agencyJobs']);
  }

  login() {
    this.router.navigate(['login']);
  }

  register() {
    this.router.navigate(['register']);
  }

  registerRequests(){
    this.router.navigate(['registerRequests']);
  }

  showAll(){
    this.router.navigate(['showAll']);
  }

  showJobs(){
    this.router.navigate(['adminJobs']);
  }
}

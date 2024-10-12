import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.logged=JSON.parse(localStorage.getItem('logged'));
  }

  logged:User;
  
  changePassword(){
    this.router.navigate(['changePassword']);
  }
}

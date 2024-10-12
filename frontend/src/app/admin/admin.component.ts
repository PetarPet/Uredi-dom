import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.logged=JSON.parse(localStorage.getItem('logged'));
  }
  logged:User;
}

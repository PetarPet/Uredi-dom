import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-agency',
  templateUrl: './agency.component.html',
  styleUrls: ['./agency.component.css']
})
export class AgencyComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
    this.logged=JSON.parse(localStorage.getItem('logged'));
  }

  logged:User;

}

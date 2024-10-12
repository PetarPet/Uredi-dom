import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { User } from '../Models/User';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  constructor(private userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }

  username:string;
  password:string;
  message:string;

  login(){
    if(this.username==undefined || this.password==undefined){
      this.message = "Morate uneti sve podatke!";
    } else {
      this.userService.login(this.username,this.password).subscribe((user:User)=>{
        if(user!=null){
          if(user.type=='admin'){
            localStorage.setItem('logged',JSON.stringify(user));
            this.router.navigate(['admin']); 
          } else this.message="Pogresan tip korisnika!";
        } else this.message="Korisnik sa datim podacima ne postoji!";       
      })
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private router:Router, private userService:UserService) { }

  ngOnInit(): void {
    this.logged = JSON.parse(localStorage.getItem('logged'));
  }

  logged: User;
  oldpassword: string;
  newpassword: string;
  newconfirmation: string;
  message: string;

  changePassword() {
    if (this.oldpassword == undefined || this.newpassword == undefined || this.newconfirmation == undefined) {
      this.message = "Morate uneti sve podatke!";
      return
    }
    if (this.oldpassword != this.logged.password) {
      this.message = "Pogresno ste uneli staru lozinku!";
      return;
    }
    let passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,12}$/;
    if (!passwordRegex.test(this.newpassword)) {
      this.message = "Nova lozinka nije u dobrom formatu!";
      return;
    }

    //Provera da li su lozinke iste
    if (!(this.newpassword === this.newconfirmation)) {
      this.message = "Nova lozinka i potvrda lozinke se ne poklapaju!";
      return;
    }

    this.userService.changePassword(this.logged.username,this.newpassword).subscribe((res)=>{
      if(res['message']=='changed'){
        localStorage.removeItem('logged');
        this.router.navigate(['login']);
      } else this.message="Greska prilikom promene lozinke!";
    })
  }

}

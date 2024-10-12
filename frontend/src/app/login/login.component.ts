import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { User } from '../Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  username: string;
  password: string;
  type: string;
  message: string

  login() {
    if (this.username == undefined || this.password == undefined || this.type == undefined) {
      this.message = "Morate uneti sve podatke!";
    } else {
      this.userService.login(this.username, this.password).subscribe((user: User) => {
        if (user != null) {
          if (user.status == 'novi') {
            this.message = "Zahtev za registraciju nije odobren!";
          } else {
            if (user.status == 'odbijen') {
              this.message="Zahtev za registraciju odbijen!";
            } else {
              if (user.type == this.type) {
                localStorage.setItem('logged', JSON.stringify(user));
                if (user.type == 'klijent') this.router.navigate(['client']);
                else this.router.navigate(['agency']);
              } else this.message = "Pogresan tip korisnika!";
            }
          }
        } else this.message = "Korisnik sa datim podacima ne postoji!";
      })
    }
  }

  toRegister() {
    this.router.navigate(['register']);
  }

  toHome() {
    this.router.navigate(['']);
  }
}

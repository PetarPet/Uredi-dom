import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { AdminService } from '../Services/admin.service';
import { Worker } from '../Models/Worker';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.logged = JSON.parse(localStorage.getItem('logged'));
    this.user = JSON.parse(localStorage.getItem('editUser'));
    this.worker = JSON.parse(localStorage.getItem('worker'));
  }

  logged: User;
  user: User;
  worker:Worker;
  message: string;

  editWorker(){
    if (this.worker.firstname.length<=0|| this.worker.lastname.length<=0 || this.worker.email.length<=0 ||
      this.worker.phone.length<=0 || this.worker.speciality.length<=0 || this.worker.agency.length<=0) {
      this.message = "Morate uneti sve podatke!";
      return;
    } else {
      //Provera da li je mejl dobrog tipa
      let emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!emailRegex.test(this.worker.email)) {
        this.message = "Email nije u dobrom formatu!";
        return;
      }

      let phoneRegex: RegExp = /^\d{3}\/\d{3}-\d{4}$/;
      if (!phoneRegex.test(this.worker.phone)) {
        this.message = "Telefon nije u dobrom formatu!";
        return;
      }

      this.adminService.editWorker(this.worker.workerID, this.worker.firstname, this.worker.lastname, this.worker.email, 
        this.worker.phone, this.worker.speciality, this.worker.agency).subscribe((res) => {
        if (res['message'] != 'edited') {
          this.message = "Greska pri izmeni ovog korisnika. Pokusajte ponovo!";
        } else {
          localStorage.removeItem('worker');
          this.router.navigate(['adminWorkers']);
        }
      })
    }
  }

  editUser() {
    //Provera da li su svi podaci uneti
    if (this.user.firstname.length<=0|| this.user.lastname.length<=0 || this.user.email.length<=0 ||
      this.user.phone.length<=0) {
      this.message = "Morate uneti sve podatke!";
      return;
    } else {
      this.userService.getUserByEmail(this.user.email).subscribe((user: User) => {
        if (user && !(this.user.username == user.username)) {
          this.message = "Email vec registrovan!";
          return
        } else {

          //Provera da li je mejl dobrog tipa
          let emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!emailRegex.test(this.user.email)) {
            this.message = "Email nije u dobrom formatu!";
            return;
          }

          let phoneRegex: RegExp = /^\d{3}\/\d{3}-\d{4}$/;
          if (!phoneRegex.test(this.user.phone)) {
            this.message = "Telefon nije u dobrom formatu!";
            return;
          }

          this.adminService.editClient(this.user.username, this.user.email, this.user.phone, this.user.firstname, this.user.lastname).subscribe((res) => {
            if (res['message'] != 'edited') {
              this.message = "Greska pri izmeni ovog korisnika. Pokusajte ponovo!";
            } else {
              localStorage.removeItem('editUser');
              this.router.navigate(['showAll']);
            }
          })
        }
      })
    }
    return;
  }

  editAgency() {
    //Provera da li su svi podaci uneti
    if (this.user.agencyName.length<=0|| this.user.state.length<=0 || this.user.city.length<=0 || 
      this.user.street.length<=0 || this.user.streetNum.length<=0 || this.user.mb.length<=0 ||
      this.user.description.length<=0 || this.user.email.length<=0 ||
      this.user.phone.length<=0) {
      this.message = "Morate uneti sve podatke!";
      return;
    } else {
      this.userService.getUserByEmail(this.user.email).subscribe((user: User) => {
        if (user && !(this.user.username == user.username)) {
          this.message = "Email vec registrovan!";
          return
        } else {

          //Provera da li je mejl dobrog tipa
          let emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          if (!emailRegex.test(this.user.email)) {
            this.message = "Email nije u dobrom formatu!";
            return;
          }

          let phoneRegex: RegExp = /^\d{3}\/\d{3}-\d{4}$/;
          if (!phoneRegex.test(this.user.phone)) {
            this.message = "Telefon nije u dobrom formatu!";
            return;
          }

          let mbRegex: RegExp = /^\d{8}$/;
              if (!mbRegex.test(this.user.mb)) {
                this.message = "Matični broj nije validan!";
                return;
              }

          this.adminService.editAgency(this.user.username, this.user.agencyName, this.user.state, this.user.city, this.user.street, this.user.streetNum, this.user.email, this.user.phone,this.user.mb,this.user.description).subscribe((res) => {
            if (res['message'] != 'edited') {
              this.message = "Greska pri izmeni ovog korisnika. Pokusajte ponovo!";
            } else {
              this.router.navigate(['showAll']);
            }
          })
        }
      })
    }
    return;
  }
}

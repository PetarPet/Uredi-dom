import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { User } from '../Models/User';
import { RegisterService } from '../Services/register.service';
import { Router } from '@angular/router';
import { getMatFormFieldMissingControlError } from '@angular/material/form-field';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router:Router,private userService: UserService, private registerService: RegisterService) { }

  ngOnInit(): void {
    this.admin = localStorage.getItem('fromAdmin');
  }
  
  admin:string;
  username: string;
  password: string;
  passwordConfirmation: string;
  email: string;
  phone: string;
  type: string;
  firstname: string;
  lastname: string;
  message: string;

  agencyName: string;
  state: string;
  city: string;
  street: string;
  streetNum: string;
  mb: string;
  description: string;
  registered: boolean = false;

  profileImgName:string="Niste odabrali";
  messageImg:string;
  
  registerUser() {
    //Provera da li su svi podaci uneti
    if (this.type == undefined || this.username == undefined || this.password == undefined ||
      this.firstname == undefined || this.lastname == undefined || this.email == undefined ||
      this.phone == undefined) {
      this.message = "Morate uneti sve podatke!";
      return;
    }
    this.userService.getUserByUsername(this.username).subscribe((user: User) => {
      if (user) {
        //Ako postoji korisnik onda proveriti da li je isti email ili korisnicko ime 
        if (this.username == user.username) this.message = "Korisnicko ime postoji!";
        return;
      } else {
        this.userService.getUserByEmail(this.email).subscribe((user: User) => {
          if (user) {
            if (this.email == user.email) this.message = "Email vec registrovan!";
            return
          } else {
            //Provera da li je lozinka dobrog tipa
            let passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,12}$/;
            if (!passwordRegex.test(this.password)) {
              this.message = "Lozinka nije u dobrom formatu! (MIN 1 veliko slovo, 1 broj, 1 specijalni znak, 7-12 karaktera)";
              return;
            }

            //Provera da li su lozinke iste
            if (!(this.password === this.passwordConfirmation)) {
              this.message = "Lozinka i potvrda lozinke se ne poklapaju!";
              return;
            }

            //Provera da li je mejl dobrog tipa
            let emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!emailRegex.test(this.email)) {
              this.message = "Email nije u dobrom formatu!";
              return;
            }

            let phoneRegex: RegExp = /^\d{3}\/\d{3}-\d{4}$/;
            if (!phoneRegex.test(this.phone)) {
              this.message = "Telefon nije u dobrom formatu!";
              return;
            }
            if(this.img==null){
            this.registerService.registerClient(this.username, this.password, this.email, this.phone, this.type, this.firstname, this.lastname).subscribe((res) => {
              if (res['message'] == 'not added') {
                this.message = "Greska pri registraciji novog korisnika. Pokusajte ponovo!";
              } else {
                this.message = "Uspesno ste se registrovali. Administrator ce proveriti vas zahtev!";
                this.clearFields();
                this.registered = true;
              }
            })
            }else {
              this.registerService.registerClientWithImage(this.username, this.password, this.email, this.phone, this.type, this.firstname, this.lastname, this.img).subscribe((res) => {
                if (res['message'] == 'not added') {
                  this.message = "Greska pri registraciji novog korisnika. Pokusajte ponovo!";
                } else {
                  this.message = "Uspesno ste se registrovali. Administrator ce proveriti vas zahtev!";
                  this.clearFields();
                  this.registered = true;
                }
              })
            }}
        })
      }
    })
    return;
  }

  registerAgency() {
    if (this.type == undefined || this.username == undefined || this.password == undefined || this.email == undefined ||
      this.agencyName == undefined || this.state == undefined || this.city == undefined || this.street == undefined ||
      this.streetNum == undefined || this.phone == undefined || this.description == undefined || this.mb == undefined) {
      this.message = "Morate uneti sve podatke!";
      return;
    } else {
      this.userService.getUserByUsername(this.username).subscribe((user: User) => {
        if (user) {
          //Ako postoji korisnik onda proveriti da li je isti email ili korisnicko ime 
          if (this.username == user.username) this.message = "Korisnicko ime postoji!";
          return;
        } else {
          this.userService.getUserByEmail(this.email).subscribe((user: User) => {
            if (user) {
              if (this.email == user.email) this.message = "Email vec registrovan!";
              return;
            } else {
              //Provera da li je lozinka dobrog tipa
              let passwordRegex: RegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{7,12}$/;
              if (!passwordRegex.test(this.password)) {
                this.message = "Lozinka nije u dobrom formatu!";
                return;
              }

              //Provera da li su lozinke iste
              if (!(this.password === this.passwordConfirmation)) {
                this.message = "Lozinka i potvrda lozinke se ne poklapaju!";
                return;
              }

              //Provera da li je mejl dobrog tipa
              let emailRegex: RegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
              if (!emailRegex.test(this.email)) {
                this.message = "Email nije u dobrom formatu!";
                return;
              }

              let phoneRegex: RegExp = /^\d{3}\/\d{3}-\d{4}$/;
              if (!phoneRegex.test(this.phone)) {
                this.message = "Telefon nije u dobrom formatu!";
                return;
              }

              let mbRegex: RegExp = /^\d{8}$/;
              if (!mbRegex.test(this.mb)) {
                this.message = "Matični broj nije validan!";
                return;
              }
              if(this.img==null){
              this.registerService.registerAgency(this.username, this.password, this.email, this.phone,
                this.type, this.agencyName, this.state, this.city, this.street,
                this.streetNum, this.mb, this.description).subscribe((res => {
                  if (res['message'] == 'not added') {
                    this.message = "Greska pri registraciji novog korisnika. Pokusajte ponovo!";
                  } else {
                    this.message = "Uspesno ste se registrovali. Administrator ce proveriti vas zahtev!";
                    this.clearFields();
                    this.registered = true;
                  }
                }))
            } else {
              this.registerService.registerAgencyWithImage(this.username, this.password, this.email, this.phone,
                this.type, this.agencyName, this.state, this.city, this.street,
                this.streetNum, this.mb, this.description,this.img).subscribe((res => {
                  if (res['message'] == 'not added') {
                    this.message = "Greska pri registraciji novog korisnika. Pokusajte ponovo!";
                  } else {
                    this.message = "Uspesno ste se registrovali. Administrator ce proveriti vas zahtev!";
                    this.clearFields();
                    this.registered = true;
                  }
                }))
            }
          }})
        }
      })
    }
    return;
  }

  toLogin(){
    this.router.navigate(['login']);
  }

  toHome(){
    this.router.navigate(['']);
  }

  toAdmin(){
    this.router.navigate(['showAll']);
  }

  img : File = null;

  profileImgUpload(event: any){
    if (event.target.files && event.target.files[0]) {
      
      let imgUploaded = new Image();
      imgUploaded.src = window.URL.createObjectURL(event.target.files[0]);
      imgUploaded.onload = () => {
        if(imgUploaded.width > 300 || imgUploaded.height > 300 || 
          imgUploaded.width < 100 || imgUploaded.height < 100 ){
          this.messageImg = "Dimenzije moraju biti min 100x100 px, a max 300x300 px!";
          this.profileImgName = "";
          return;
        } else {
          //dodato
          this.messageImg = null;
        }
      }

      this.message = "";
      this.profileImgName = event.target.files[0].name;
      this.img = event.target.files[0];
    }
  }

  clearFields() {
    this.username = null;
    this.password = null;
    this.passwordConfirmation = null;
    this.email = null;
    this.phone = null;
    this.type = null;
    this.firstname = null;
    this.lastname = null;

    this.agencyName = null;
    this.state = null;
    this.city = null;
    this.street = null;
    this.streetNum = null;
    this.description = null;
    this.mb = null;
  }
}
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VisitorService } from '../Services/visitor.service';
import { User } from '../Models/User';
import { UserService } from '../Services/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-visitor',
  templateUrl: './visitor.component.html',
  styleUrls: ['./visitor.component.css']
})
export class VisitorComponent implements OnInit {


  constructor(private domSanitizer: DomSanitizer, private router: Router, private visitorService: VisitorService, private userService: UserService) { }

  ngOnInit(): void {
    this.visitorService.getAllAgencies().subscribe((a: User[]) => {
      this.allAgencies = a;
      this.allAgencies.forEach(element => {

        if (element.profileImg != null) {
          this.userService.getImg(element.profileImg).subscribe((image) => {
            let urlCreator = window.URL || window.webkitURL;
            let imageUrl = urlCreator.createObjectURL(image);

            element.user_photo = this.domSanitizer.bypassSecurityTrustResourceUrl(imageUrl);
          })
        }
      });
    })
  }

  allAgencies: User[];
  agencyName: string;
  address: string;

  showComments(element) {
    localStorage.setItem('agency', JSON.stringify(element));
    this.router.navigate(['showComments']);
  }

  splitAndCheckAddress(address: string, a: User) {
    let splittedAddress: string[] = address.split(',');
    let i = 0;
    for (i; i < splittedAddress.length; i++) {
      switch (i) {
        case 0:
          if (a.state.includes(splittedAddress[i]))
            break;
          else return false;
        case 1:
          if (a.city.includes(splittedAddress[i]))
            break;
          else return false;
        case 2:
          if (a.street.includes(splittedAddress[i]))
            break;
          else return false;
        default:
          break;
      }
    }
    return true;
  }

  search() {
    this.allAgencies = this.allAgencies.filter((a) => {
      if (this.agencyName != undefined || this.address != undefined) {
        //Ili jedan ili drugi nije null
        if (this.agencyName != undefined && this.address == undefined) {
          //Proveravamo ako ime agencije nije null da li odgovara nekoj agenciji
          if (a.agencyName.includes(this.agencyName)) return true; else return false;
        } else {
          //Proveravamo ako adresa nije null da li odovara nekoj adresi
          if (this.address != undefined && this.agencyName == undefined) {
            let res = this.splitAndCheckAddress(this.address, a);
            if (res) return true; else return false;
          } else {
            //oba tacna
            let res = this.splitAndCheckAddress(this.address, a);
            if (res) {
              if (a.agencyName.includes(this.agencyName)) return true; else return false;
            } else return false;
          }
        }
      } else return true;
    })
  }
  increasing: boolean;

  sortByName() {
    if (this.increasing) {
      this.allAgencies = this.allAgencies.sort((a, b) => {
        if (a.agencyName < b.agencyName) return 1;
        else return -1;
      })
    } else {
      this.allAgencies = this.allAgencies.sort((a, b) => {
        if (a.agencyName < b.agencyName) return -1;
        else return 1;
      })
    }
  }

  sortByAddress() {
    if (this.increasing) {
      this.allAgencies = this.allAgencies.sort((a, b) => {
        let addressA = a.state.concat(" ").concat(a.city).concat(" ").concat(a.street).concat(" ").concat(a.streetNum);
        let addressB = b.state.concat(" ").concat(b.city).concat(" ").concat(b.street).concat(" ").concat(b.streetNum);
        if (addressA < addressB) return 1;
        else return -1
      })
    } else {
      this.allAgencies = this.allAgencies.sort((a, b) => {
        let addressA = a.state.concat(" ").concat(a.city).concat(" ").concat(a.street).concat(" ").concat(a.streetNum);
        let addressB = b.state.concat(" ").concat(b.city).concat(" ").concat(b.street).concat(" ").concat(b.streetNum);
        if (addressA < addressB) return -1;
        else return 1;
      })
    }
  }

}

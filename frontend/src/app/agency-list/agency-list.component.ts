import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../Models/User';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';
import { DomSanitizer } from '@angular/platform-browser';
import { VisitorService } from '../Services/visitor.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-agency-list',
  templateUrl: './agency-list.component.html',
  styleUrls: ['./agency-list.component.css']
})
export class AgencyListComponent implements OnInit {

  constructor(private changeDetectorRefs: ChangeDetectorRef, private domSanitizer:DomSanitizer, private router: Router, private visitorService:VisitorService, private userService: UserService) { }

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.logged = JSON.parse(localStorage.getItem('logged'));
      this.visitorService.getAllAgencies().subscribe((a: User[]) => {
        this.allAgencies = a;
        this.dataSource= new MatTableDataSource(this.allAgencies);
        this.table.dataSource=this.dataSource;
        this.table.renderRows();
       });
  }

  displayedColumns: string[] = ['agencyName', 'state', 'city', 'street','streetNum','phone','email', 'description','requestWork','comments'];

  
  dataSource:MatTableDataSource<User>; 
  allAgencies:User[];
  logged:User;
  agencyName:string;
  address:string;
  
  request(username){
    localStorage.setItem('username',JSON.stringify(username));
    this.router.navigate(['makeRequest']);
  }

  showComments(element){
    localStorage.setItem('agency',JSON.stringify(element));
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
    this.dataSource.data=this.allAgencies;
    this.table.renderRows();
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
    this.dataSource.data=this.allAgencies;
    this.table.renderRows();
  }
}

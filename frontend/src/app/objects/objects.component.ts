import { Component, OnInit } from '@angular/core';
import { User } from '../Models/User';
import { ObjectService } from '../Services/object.service';
import { MyObject } from '../Models/MyObject';
import { Router } from '@angular/router';

@Component({
  selector: 'app-objects',
  templateUrl: './objects.component.html',
  styleUrls: ['./objects.component.css']
})
export class ObjectsComponent implements OnInit {

  constructor(private objectService: ObjectService, private router: Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(localStorage.getItem('logged'));
    this.objectService.getAllObjectsForUser(this.logged.username).subscribe((o: MyObject[]) => {
      this.myObjects = o;
    })
  }

  logged: User;
  myObjects: Object[];
  displayedColumns: string[] = ['type', 'state', 'city', 'street', 'streetNum', 'rooms', 'area', 'showSketch', 'deleteObject'];

  type: string;
  state: string;
  city: string;
  street: string;
  streetNum: string;
  rooms: string;
  area: string;
  message: string;

  continue() {
    if (this.type == undefined || this.state == undefined || this.city == undefined || this.street == undefined || this.streetNum == undefined) {
      this.message = "Morate uneti sve podatke!";
    } {
      let newObject = new MyObject();
      newObject.type = this.type;
      newObject.state = this.state;
      newObject.city = this.city;
      newObject.street = this.street;
      newObject.streetNum = this.streetNum;
      newObject.rooms = this.rooms;
      newObject.area = this.area;
      localStorage.setItem('newObject', JSON.stringify(newObject));
      let canStart = true;
      localStorage.setItem('canStart', JSON.stringify(canStart));
      this.router.navigate(['addObject']);
    }
  }

  jsonFileName: string = "";
  messageJSON: string = "";
  newObjects: MyObject[];

  showSketch(element) {
    let canStart:boolean = true;
    localStorage.setItem('canStart',JSON.stringify(canStart));
    localStorage.setItem('element', JSON.stringify(element));
    this.router.navigate(['mySkatch']);
  }

  obrisi(element) {
    this.objectService.deleteObject(element.idO).subscribe((res) => {
      if (res['message'] == 'deleted') location.reload();
      else alert("Greska pri brisanju!");
    })
  }

  JSONUpload(event: any) {
    if (event.target.files) {
      let file = event.target.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', (event) => {
        // @ts-ignore
        let object = JSON.parse(event.target.result);
        this.jsonFileName = file.name;
        let i = 0;
        this.newObjects = [];
        for (i; i < object.length; i++) {
          let newObject = new MyObject();
          newObject.owner = object[i]['owner'];
          newObject.idO = object[i]['idO'];
          newObject.type = object[i]['type'];
          newObject.area = object[i]['area'];
          newObject.rooms = object[i]['rooms'];
          newObject.state = object[i]['state'];
          newObject.city = object[i]['city'];
          newObject.street = object[i]['street'];
          newObject.streetNum = object[i]['streetNum'];
          newObject.sketch = object[i]['sketch'];
          this.newObjects.push(newObject);
        }
      });
      reader.readAsText(file);
    }
  }

  add() {
    let i = 0;
    let allObjects:MyObject[];

    for (i; i < this.newObjects.length; i++) {
        if (i + 1 == this.newObjects.length) {
          this.objectService.addNewObject(this.newObjects[i]).subscribe((res) => {
            location.reload();
          });
        } else this.objectService.addNewObject(this.newObjects[i]).subscribe();
      }
  }   
    /*
    if(this.newObject!=null){
    this.objectService.addNewObject(this.newObject).subscribe((res)=>{
      if(res['message']=='not added'){
        this.message = "Greska pri dodavanju novog objekta";
      } else {
        localStorage.removeItem('newObject');
        this.router.navigate(['objects']);
      }
    })
  } else {
    this.message="Niste uneli fajl!";
  }
  */
}

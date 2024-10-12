import { Component, OnInit } from '@angular/core';
import { Sketch } from '../Models/Sketch';
import { User } from '../Models/User';
import { MyObject } from '../Models/MyObject';
import { ObjectService } from '../Services/object.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-object',
  templateUrl: './add-object.component.html',
  styleUrls: ['./add-object.component.css']
})
export class AddObjectComponent implements OnInit {

  constructor(private objectService:ObjectService, private router:Router) { }

  ngOnInit(): void {
    this.logged = JSON.parse(localStorage.getItem('logged'));
    this.newObject = JSON.parse(localStorage.getItem('newObject'));
  }
  
  embeddedSketch: Sketch[] = [{ type: 'room', x: 100, y: 100, w: 200, h: 100, status:'pocetno', name:'soba 1' },{ type: 'room', x: 300, y: 100, w: 100, h: 200, status:'pocetno', name:'soba 2' },{ type: 'door', x: 300, y: 150, w:0,h:0, status:'', name:''},{ type: 'door', x: 200, y: 100, w:0,h:0, status:'', name:''}];
  logged: User;
  newObject: MyObject;
  message:string;

  add(){
    this.newObject.sketch=this.embeddedSketch;
    this.newObject.owner=this.logged.username;
    let idO:number=1;
    let allObjects:MyObject[]=[];
    this.objectService.getAllObjects().subscribe((o:MyObject[])=>{
      allObjects=o;
      if(allObjects!=null){
        idO=allObjects.length+1;
      } else idO=1;
      this.newObject.idO=idO;
      this.objectService.addNewObject(this.newObject).subscribe((res)=>{
        if(res['message']=='not added'){
          this.message = "Greska pri dodavanju novog objekta";
        } else {
          localStorage.removeItem('canStart');
          localStorage.removeItem('newObject');
          this.router.navigate(['objects']);
        }
      })
    })
  }
}

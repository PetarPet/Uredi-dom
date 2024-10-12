import { Component, OnInit } from '@angular/core';
import { Sketch } from '../Models/Sketch';
import { Router } from '@angular/router';
import { User } from '../Models/User';
import { MyObject } from '../Models/MyObject';
import { ObjectService } from '../Services/object.service';

@Component({
  selector: 'app-object-sketch',
  templateUrl: './object-sketch.component.html',
  styleUrls: ['./object-sketch.component.css']
})
export class ObjectSketchComponent implements OnInit {

  constructor(private router:Router, private objectService:ObjectService) { }

  ngOnInit(): void {
    this.logged=JSON.parse(localStorage.getItem('logged'));
    this.myObject = JSON.parse(localStorage.getItem('element'));
    this.mySketch = this.myObject.sketch;
  }

  myObject:MyObject;
  logged:User;
  mySketch:Sketch[];
  
  changeData(){
    this.objectService.changeObject(this.myObject).subscribe((res)=>{
      if(res['message']=='updated') this.router.navigate(['objects']);
      else alert("Greska pri izmeni!");
    })
  }
}

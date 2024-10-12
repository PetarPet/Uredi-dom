import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Sketch } from '../Models/Sketch';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {

  constructor() { }

  @ViewChild('canvas', { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  private canvasRendering: CanvasRenderingContext2D;

  draw(mySketch) {
    mySketch.forEach(element => {
      if (element.type == 'room') {
        this.canvasRendering.fillStyle = 'black';
        this.canvasRendering.fillRect(element.x, element.y, element.w, element.h);
        if (element.status == "pocetno") {
          this.canvasRendering.fillStyle = 'white';
          this.canvasRendering.fillRect(element.x + 5, element.y + 5, element.w - 10, element.h - 10);
        } else {
          if (element.status == "u toku") {
            this.canvasRendering.fillStyle = 'red';
            this.canvasRendering.fillRect(element.x + 5, element.y + 5, element.w - 10, element.h - 10);
          } else {
            this.canvasRendering.fillStyle = 'green';
            this.canvasRendering.fillRect(element.x + 5, element.y + 5, element.w - 10, element.h - 10);
          }
        }
        this.canvasRendering.fillStyle = 'black';
        this.canvasRendering.font = "12px Arial";
        this.canvasRendering.fillText(element.name, element.x + element.w / 2 - 10, element.y + element.h / 2 - 10);
      } else {
        this.canvasRendering.fillStyle = 'blue';
        this.canvasRendering.fillRect(element.x, element.y, 10, 10);
      }
    });
  }

  drawCantWork(mySketch) {
    mySketch.forEach(element => {
      if (element.type == 'room') {
        this.canvasRendering.fillStyle = 'black';
        this.canvasRendering.fillRect(element.x, element.y, element.w, element.h);

        this.canvasRendering.fillStyle = 'yellow';
        this.canvasRendering.fillRect(element.x + 5, element.y + 5, element.w - 10, element.h - 10);

        this.canvasRendering.fillStyle = 'black';
        this.canvasRendering.font = "12px Arial";
        this.canvasRendering.fillText(element.name, element.x + element.w / 2 - 10, element.y + element.h / 2 - 10);
      } else {
        this.canvasRendering.fillStyle = 'blue';
        this.canvasRendering.fillRect(element.x, element.y, 10, 10);
      }
    });
  }

  ngOnInit(): void {
    this.canStart = JSON.parse(localStorage.getItem('canStart'));
    this.canvasRendering = this.canvas.nativeElement.getContext('2d');
    if (this.canStart == true) {
      this.draw(this.mySketch);
    } else {
      this.drawCantWork(this.mySketch);
    }
  }

  @Input()
  mySketch: Sketch[];
  canStart: boolean;
}

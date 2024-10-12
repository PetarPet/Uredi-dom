import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectSketchComponent } from './object-sketch.component';

describe('ObjectSketchComponent', () => {
  let component: ObjectSketchComponent;
  let fixture: ComponentFixture<ObjectSketchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectSketchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectSketchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

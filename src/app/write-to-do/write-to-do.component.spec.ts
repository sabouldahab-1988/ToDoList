import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteToDoComponent } from './write-to-do.component';

describe('WriteToDoComponent', () => {
  let component: WriteToDoComponent;
  let fixture: ComponentFixture<WriteToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WriteToDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

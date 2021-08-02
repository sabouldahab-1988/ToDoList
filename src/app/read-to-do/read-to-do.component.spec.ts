import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadToDoComponent } from './read-to-do.component';

describe('ReadToDoComponent', () => {
  let component: ReadToDoComponent;
  let fixture: ComponentFixture<ReadToDoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadToDoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadToDoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

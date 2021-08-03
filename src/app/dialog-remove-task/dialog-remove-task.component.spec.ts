import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRemoveTaskComponent } from './dialog-remove-task.component';

describe('DialogRemoveTaskComponent', () => {
  let component: DialogRemoveTaskComponent;
  let fixture: ComponentFixture<DialogRemoveTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRemoveTaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRemoveTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

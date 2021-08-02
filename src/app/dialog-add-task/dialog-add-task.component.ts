import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Task } from '../store/Task';
import { AddTask } from '../store/task.actions';
import {FormGroup, FormControl,Validators,FormBuilder} from '@angular/forms';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-dialog-add-task',
  templateUrl: './dialog-add-task.component.html',
  styleUrls: ['./dialog-add-task.component.css']
})
export class DialogAddTaskComponent implements OnInit {
   toDoForm:FormGroup;
   maxID$: Observable<number>;
   tasks$:Observable<Task[]>;
   maxID:number=0;

   constructor(@Inject(MAT_DIALOG_DATA) public data: Task,private store:Store,private fb:FormBuilder,private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.toDoForm=this.fb.group({
        name:['',Validators.required],
        completed:[false]
    });
    this.setCurrentMaxID();
  }

  onSubmit(){
    if(this.toDoForm.valid===true){
      this.maxID+=1;
      this.store.dispatch(new AddTask({id:this.maxID,name:this.toDoForm.value.name,completed:this.toDoForm.value.completed}));
      this.matDialog.closeAll();
    }
  }

  setCurrentMaxID(){
    this.tasks$=this.store.select(state=>state.tasks.tasks);
    this.tasks$.subscribe(tasks=>{
      tasks.forEach(task=>{
        if(task.id>this.maxID){
          this.maxID=task.id;
        }
      })
    });

  }
}

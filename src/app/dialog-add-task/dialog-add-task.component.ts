import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Task } from '../store/Task';
import { AddTask, UpdateTask } from '../store/task.actions';
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

   constructor(@Inject(MAT_DIALOG_DATA) public data: Task | undefined,private store:Store,private fb:FormBuilder,private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.toDoForm=this.fb.group({
        name:['',Validators.required],
        completed:[false]
    });
    this.setCurrentMaxID();
    console.log(this.data);
    if(this.data!=undefined)
      this.setCurrentForm();
  }

  onSubmit(){
    if(this.toDoForm.valid===true){
      if(this.data===undefined){
        this.insertNewTask();
      }else{
        this.updateTask();
      }
    }
  }

  insertNewTask(){
    this.maxID+=1;
    this.store.dispatch(new AddTask({id:this.maxID,name:this.toDoForm.value.name,completed:this.toDoForm.value.completed}));
    this.matDialog.closeAll();
  }
  updateTask(){
    this.data.name=this.toDoForm.value.name;
    this.data.completed=this.toDoForm.value.completed;
    this.store.dispatch(new UpdateTask(this.data));
    this.matDialog.closeAll();
  }

  setCurrentForm(){
    this.toDoForm.setValue({
      name:this.data.name,
      completed:this.data.completed,
    })
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

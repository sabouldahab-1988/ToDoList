import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Task } from '../store/task';
import { AddTask, RemoveTask } from '../store/task.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dialog-remove-task',
  templateUrl: './dialog-remove-task.component.html',
  styleUrls: ['./dialog-remove-task.component.css']
})
export class DialogRemoveTaskComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: number,private store:Store,private matDialog: MatDialog) { }

  ngOnInit(): void {

  }

  onDelete():void{
    console.log("Remove Id",this.data);
    this.store.dispatch(new RemoveTask(this.data));
    this.matDialog.closeAll();
  }

}

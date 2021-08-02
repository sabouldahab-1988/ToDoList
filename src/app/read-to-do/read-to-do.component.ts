import { Component, OnInit } from '@angular/core';
import { Store,Select } from '@ngxs/store';
import { Task } from '../store/Task';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TaskState, TaskStateModel } from '../store/task.state';
import { map } from 'rxjs/internal/operators/map';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';

@Component({
  selector: 'app-read-to-do',
  templateUrl: './read-to-do.component.html',
  styleUrls: ['./read-to-do.component.css']
})
export class ReadToDoComponent implements OnInit {

  tasks$:Observable<Task[]>;
  dataSource:MatTableDataSource<Task>;
  tasks:Task[];
  taskSubscription: Subscription;
  task:Task;
  displayedColumns: string[] = ['name', 'completed'];

  constructor(private store:Store,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.tasks$=this.store.select(state=>state.tasks.tasks);
    this.tasks$.subscribe(tasks=>this.tasks=tasks);
  }
  addTask(): void {
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      width: '350px',
      data:this.task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}

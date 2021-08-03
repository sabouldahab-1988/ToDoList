import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Store,Select } from '@ngxs/store';
import { Task } from '../store/task';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TaskState, TaskStateModel } from '../store/task.state';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogAddTaskComponent } from '../dialog-add-task/dialog-add-task.component';
import { DialogRemoveTaskComponent } from '../dialog-remove-task/dialog-remove-task.component';
import {MatPaginator} from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import { GetTasks, UpdateTask } from '../store/task.actions';
import { BaseComponent } from '../base.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-read-to-do',
  templateUrl: './read-to-do.component.html',
  styleUrls: ['./read-to-do.component.css']
})
export class ReadToDoComponent extends BaseComponent implements OnInit,AfterViewInit {

  tasks$:Observable<any>;
  dataSource:MatTableDataSource<Task>;
  tasks:Task[];
  taskSubscription: Subscription;
  task:Task;
  displayedColumns: string[] = ['title', 'completed','actions','details','id'];

  constructor(private store:Store,public dialog: MatDialog,public router:Router) {
     super();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.tasks$=this.store.dispatch(new GetTasks());
    //Use this when you want to enable delete and add
    //this.tasks$=this.store.select(state=>state.tasks.tasks);

    this.tasks$.subscribe(tasks=>
      {
        this.dataSource=new MatTableDataSource<Task>(tasks.tasks.tasks);
        // this.dataSource=new MatTableDataSource<Task>(tasks);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
      );
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

  onDelete(id:number):void{
    const dialogRef = this.dialog.open(DialogRemoveTaskComponent, {
      width: '350px',
      data:id
    });
  }

  onUpdate(task:Task):void{
    const dialogRef = this.dialog.open(DialogAddTaskComponent, {
      width: '350px',
      data:task
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onCompleted(task:Task):void{
    task.completed=!task.completed;
    this.store.dispatch(new UpdateTask(task,task.id));
  }

  onDetails(id:number){
    this.router.navigate(["task-details",id])
  }

}

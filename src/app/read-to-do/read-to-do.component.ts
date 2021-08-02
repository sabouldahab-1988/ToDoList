import { Component, OnInit } from '@angular/core';
import { Store,Select } from '@ngxs/store';
import { Task } from '../store/Task';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TaskState } from '../store/task.state';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-read-to-do',
  templateUrl: './read-to-do.component.html',
  styleUrls: ['./read-to-do.component.css']
})
export class ReadToDoComponent implements OnInit {

  tasks$:Observable<Task>;
  dataSource:MatTableDataSource<Task>;
  tasks:Task[];
  taskSubscription: Subscription;

  constructor(private store:Store) { }

  ngOnInit(): void {
    this.tasks$=this.store.select(state=>state.tasks.tasks);
    // this.taskSubscription = this.tasks$
    // .pipe(
    //   map((taskState: TaskState) => {
    //      this.tasks=taskState.;
    //   })
    // )
    // .subscribe();

  // this.store.dispatch(TaskAc.BeginGetCatsAction());  }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { BaseComponent } from '../base.component';
import { Task } from '../store/task';
import { GetSelectedTask } from '../store/task.actions';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent extends BaseComponent implements OnInit {
  id:number=0;
  task$:Observable<any>;
  task:Task;
  constructor(private activateRoute:ActivatedRoute,private store:Store,public router:Router) {
    super();
  }

  ngOnInit(): void {
    this.id=parseInt(this.activateRoute.snapshot.paramMap.get('id'));
    this.task$=this.store.dispatch(new GetSelectedTask(this.id));
    this.task$.subscribe(task=>{
      this.task=task.tasks.selectedTask;
    })
  }

  onCancel():void{
    this.router.navigate(["read-to-do-component"]);
  }
}

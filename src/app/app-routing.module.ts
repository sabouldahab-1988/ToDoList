import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReadToDoComponent } from './read-to-do/read-to-do.component';
import { TaskDetailsComponent } from './task-details/task-details.component';


const routes: Routes = [
  {
    path: 'read-to-do-component',
    component: ReadToDoComponent,
  },
  {
    path: 'task-details/:id', component: TaskDetailsComponent
  },
  {
    path: '', redirectTo: '/read-to-do-component', pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



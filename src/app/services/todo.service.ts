import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Task } from '../store/task';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  public baseUrl:string;

  constructor(private http:HttpClient) {
    this.baseUrl=environment.todoURL;
   }

  getTasks(){
     return this.http.get<Task[]>(this.baseUrl);
  }

  deleteTask(id:number){
    return this.http.delete(this.baseUrl+id);
  }

  addTask(task:Task){
    return this.http.post<Task>(this.baseUrl,task);
  }

  updateTask(task:Task,id:number){
    return this.http.put<Task>(this.baseUrl+id,task);
  }

  getTaskSelectedTask(id:number){
    return this.http.get<Task>(this.baseUrl+id);
  }

}

import { state } from "@angular/animations";
import { State, Action, StateContext,Selector } from "@ngxs/store";
import { Task } from "./Task";

export class TaskStateModel{
  tasks:Task[];
}

@State<TaskStateModel>({
  name:"tasks",
  defaults:{
    tasks:[{id:1,name:"test",completed:false},{id:2,name:"test 2",completed:true}]
  }
})

export class TaskState{
    @Selector()
    static getTasks(state:TaskStateModel){
      return state.tasks;
    }
}

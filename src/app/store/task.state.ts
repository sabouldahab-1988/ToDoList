import { state } from "@angular/animations";
import { State, Action, StateContext,Selector, Select } from "@ngxs/store";
import { Task } from "./Task";
import { AddTask } from "./task.actions";

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

    @Selector()
    static maxID(state:TaskStateModel){
      state.tasks.reduce((prev, curr) => {
        if(curr.id>prev)
          prev=curr.id;
        return prev;
      },0
      )
    }

    @Action(AddTask)
    add({getState, patchState }: StateContext<TaskStateModel>, { payload }:AddTask) {
        const state = getState();
        patchState({
          tasks:[...state.tasks,payload]
        })
    }
}

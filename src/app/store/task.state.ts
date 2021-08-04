import { state } from "@angular/animations";
import { State, Action, StateContext, Selector, Select } from "@ngxs/store";
import { Task } from "./task";
import { AddTask, GetSelectedTask, GetTasks, LoadTasksError, LoadTasksSuccess, RemoveTask, UpdateTask } from "./task.actions";
import { patch, append, removeItem, insertItem, updateItem } from '@ngxs/store/operators';
import { TodoService } from "../services/todo.service";
import { catchError, mergeMap, tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";


export class TaskStateModel {
  tasks: Task[];
  selectedTask: Task;
  loading: boolean;
}


@State<TaskStateModel>({
  name: "tasks",
  defaults: {
    tasks: [
      { id: 1, userId: 1, completed: false, title: "Test" }
    ],
    selectedTask: null,
    loading: false
  }
})

@Injectable({
  providedIn: 'root'
})
export class TaskState {
  constructor(private todoServices: TodoService) {

  }

  @Selector()
  static getTasks(state: TaskStateModel) {
    return state.tasks;
  }

  @Selector()
  static loading({ loading }: any): boolean {
    return loading;
  }

  @Selector()
  static maxID(state: TaskStateModel) {
    state.tasks.reduce((prev, curr) => {
      if (curr.id > prev)
        prev = curr.id;
      return prev;
    }, 0
    )
  }

  // @Action(GetTasks)
  // getTasks(ctx: StateContext<TaskStateModel>) {
  //   ctx.patchState({ loading: true });
  //   return this.todoServices.getTasks().pipe(tap((result) => {
  //     ctx.patchState({
  //       tasks: result,
  //       loading: false
  //     })
  //   }
  //   ))
  // }

  @Action(GetTasks)
  protected loadTasks(
    ctx: StateContext<TaskStateModel>
  ) {
    ctx.patchState({ loading: true });
    return this.todoServices.getTasks().pipe(
      catchError((err) => ctx.dispatch(new LoadTasksError(err))),
      mergeMap((resp) => ctx.dispatch(new LoadTasksSuccess(resp || [])))
    );
  }

  @Action(LoadTasksError)
  public loadTasksError(
    { payload }: LoadTasksError
  ) {
    // TODO
  }


  @Action(LoadTasksSuccess)
  loadAllTasks(ctx: StateContext<TaskStateModel>,{ payload }: LoadTasksSuccess) {
    ctx.patchState({
      tasks: payload,
      loading: false
    });
  }

  @Action(GetSelectedTask)
  getSelectedTask({ getState, setState }: StateContext<TaskStateModel>, { payload }: GetSelectedTask) {
    return this.todoServices.getTaskSelectedTask(payload).pipe(tap((result) => {
      const state = getState();
      setState({
        ...state,
        selectedTask: result
      })
    }))
  }

  @Action(AddTask)
  add({ getState, patchState }: StateContext<TaskStateModel>, { payload }: AddTask) {
    this.todoServices.addTask(payload).pipe(tap((result) => {
      const state = getState();
      patchState({
        tasks: [...state.tasks, result]
      })
    }))
  }

  @Action(RemoveTask)
  remove({ getState, patchState }: StateContext<TaskStateModel>, { payload }: RemoveTask) {
    //  patchState({
    //         tasks: getState().tasks.filter(t => t.id != payload)
    //     })
    this.todoServices.deleteTask(payload).pipe(tap(() => {
      patchState({
        tasks: getState().tasks.filter(t => t.id != payload)
      })
      const state = getState();
      const filteredArray = state.tasks.filter(t => t.id !== payload);
      patchState({
        ...state,
        tasks: filteredArray,
      })
    }))
  }

  @Action(UpdateTask)
  update({ getState, setState }: StateContext<TaskStateModel>, { payload, id }: UpdateTask) {
    this.todoServices.updateTask(payload, id).pipe(tap((result) => {
      const state = getState();
      const tasks = [...state.tasks];
      const taskIndex = tasks.findIndex(item => item.id === id);
      tasks[taskIndex] = result;
      setState({
        ...state,
        tasks: tasks
      })
    }))
  }

}

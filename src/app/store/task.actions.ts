import { Task } from "./Task";

export class AddTask{
  static readonly type ='[TASK] Add';

  constructor(public payload:Task){}
}

export class RemoveTask{
  static readonly type='[TASK] Remove';

  constructor(public payload:string){}
}

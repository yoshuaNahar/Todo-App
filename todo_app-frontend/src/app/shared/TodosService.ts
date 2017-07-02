import { EventEmitter, Injectable } from "@angular/core";
import { Todo } from "./Todo";

@Injectable()
export class TodosService {

  selectedTodo = new EventEmitter<Todo>();

}

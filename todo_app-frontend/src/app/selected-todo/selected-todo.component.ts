import { Component, OnInit } from "@angular/core";
import { Todo } from "../shared/Todo";
import { TodosService } from "../shared/TodosService";
import { TodosHttpService } from "../shared/TodosHttpService";

@Component({
  selector: "app-selected-todo",
  templateUrl: "./selected-todo.component.html",
  styleUrls: ["./selected-todo.component.css"]
})
export class SelectedTodoComponent implements OnInit {

  private selectedTodo: Todo = null;

  private static getCurrentTime(): string {
    const date = new Date();
    const hours = (date.getHours() < 10 ? "0" : "") + date.getHours();
    const minutes = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();

    return hours + ":" + minutes;
  }

  constructor(private todosService: TodosService, private todosHttpService: TodosHttpService) {
  }

  ngOnInit(): void {
    this.todosService.selectedTodo
      .subscribe(todo => this.selectedTodo = todo);
  }

  private setStartTime(): void {
    this.selectedTodo.started = SelectedTodoComponent.getCurrentTime();

    this.todosHttpService.updateTodoOnServer(this.selectedTodo);
  }

  private setStopTime(): void {
    this.selectedTodo.stopped = SelectedTodoComponent.getCurrentTime();
    this.selectedTodo.finished = true;

    this.todosHttpService.updateTodoOnServer(this.selectedTodo);

    this.selectedTodo = null; // you are done with this _todo
  }

  private resetTimes(): void {
    this.selectedTodo.started = "";
    this.selectedTodo.stopped = "";
    this.selectedTodo.finished = false;

    this.todosHttpService.updateTodoOnServer(this.selectedTodo);
  }

}

import { Component, Input } from "@angular/core";
import { Todo } from "../shared/Todo";
import { TodosService } from "../shared/TodosService";

@Component({
  selector: "app-selected-todo",
  templateUrl: "./selected-todo.component.html",
  styleUrls: ["./selected-todo.component.css"]
})
export class SelectedTodoComponent {

  @Input() private selectedTodo: Todo;
  // @Output() private todoFinished: EventEmitter<{ isFinished: boolean }> = new EventEmitter<{ isFinished: boolean }>();

  constructor(private todosService: TodosService) {
  }

  private setStartTime(): void {
    this.selectedTodo.started = this.getCurrentTime();
  }

  private setStopTime(): void {
    this.selectedTodo.stopped = this.getCurrentTime();

    this.changeTodoStatusAndList();
  }

  private resetTimes(): void {
    this.selectedTodo.started = "";
    this.selectedTodo.stopped = "";

    this.changeTodoStatusAndList();
  }

  private changeTodoStatusAndList() {
    let indexOfTodo;
    if (this.selectedTodo.finished === false) {
      indexOfTodo = this.todosService.getTodos().indexOf(this.selectedTodo);
    } else {
      indexOfTodo = this.todosService.getFinishedTodos().indexOf(this.selectedTodo);
    }
    console.log(`indexOfTodo: ${indexOfTodo}`); // testing

    this.todosService.changeTodoStatusAndList(indexOfTodo, this.selectedTodo.finished);
  }

  private getCurrentTime(): string {
    let date: Date = new Date();
    let hours: string = (date.getHours() < 10 ? "0" : "") + date.getHours();
    let minutes: string = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
    return hours + ":" + minutes;
  }

}

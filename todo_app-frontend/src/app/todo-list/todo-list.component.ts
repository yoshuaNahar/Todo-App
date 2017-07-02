import { Component, HostListener, OnInit } from "@angular/core";
import { Todo } from "../shared/Todo";
import { TodosHttpService } from "../shared/TodosHttpService";
import { TodosService } from "../shared/TodosService";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {

  // so that users can press left or right shift with enter And not create new _todo
  private previousEventCode = "";
  // so that if a user clicks on a title and presses enter, a new _todo will be created
  private focusOnTitle = false;

  private todos: Todo[] = [
    new Todo(997, "create simple design", false),
    new Todo(998, "write angular code", false),
    new Todo(999, "drink coffee", true)
  ];

  constructor(private todosService: TodosService, private todosHttpService: TodosHttpService) {
  }

  ngOnInit(): void {
    this.populateTodosArray(this.todosHttpService.getTodosFromServer());
  }

  private populateTodosArray(todosPromise: Promise<Todo[]>): void {
    todosPromise.then(todos => {
      for (const todo of todos) {
        this.todos.push(todo);
      }
    });
  }

  @HostListener("click", ["$event"])
  private onClick(event: MouseEvent): void {
    console.log(event); // testing
    const clickedElement: HTMLScriptElement = <HTMLScriptElement>event.toElement;

    console.log(`clickedElement: ${clickedElement}`); // testing
    if (clickedElement instanceof HTMLInputElement) {
      this.focusOnTitle = true;
      return;
    } else if (clickedElement instanceof HTMLTextAreaElement) {
      this.setSelectedTodoToClickedTodo(clickedElement);
    }
    this.focusOnTitle = false;
  }

  @HostListener("keydown", ["$event"])
  private onKeyDdown(event: KeyboardEvent): void {
    const eventCode: string = event.code;
    const focusedElement: HTMLScriptElement = <HTMLScriptElement>document.activeElement;

    if (eventCode === "Enter" && !(this.previousEventCode === "ShiftLeft" || this.previousEventCode === "ShiftRight")) {
      this.createNewTodo(focusedElement);
    } else if (eventCode === "ArrowDown" || eventCode === "ArrowUp") {
      this.moveUpOrDown(eventCode, focusedElement);
    } else if (eventCode === "Backspace") {
      this.deleteTodo(focusedElement);
    }

    this.increaseTextAreaHeightByScrollHeight(focusedElement);

    this.previousEventCode = event.code;
    console.log(event.code); // testing
    this.focusOnTitle = false;
  }

  @HostListener("focusout", ["$event"])
  private onFocusOut(event: FocusEvent): void {
    console.log(event);

    const focusedElement: HTMLScriptElement = <HTMLScriptElement>event.srcElement;

    if (focusedElement instanceof HTMLTextAreaElement) {
      this.addOrUpdateTodoOnServer(focusedElement);
    }
  }

  private setSelectedTodoToClickedTodo(element: HTMLScriptElement) {
    const todoId: number = this.getIdFromDataAttribute(element);

    if (todoId !== -1) {
      this.todosService.selectedTodo.emit(this.todos.find(todo => todo.id === todoId));
    }
  }

  private getIdFromDataAttribute(element: HTMLScriptElement): number {
    if (element.hasAttribute("data-id")) {
      return Number(element.getAttribute("data-id"));
    }
    return -1;
  }

  private createNewTodo(element: HTMLScriptElement): void {
    event.preventDefault();

    const todoId: number = this.getIdFromDataAttribute(element);
    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

    if (todoId !== -1 || this.focusOnTitle) {
      this.todos.splice(todoIndex + 1, 0, new Todo(-1, "", false));
      // ONLY IF YOU LOSE FOCUS OF THIS _TODO WILL IT BE SAVED!
      // updating or adding _todo happens in focusout
    }
  }

  private moveUpOrDown(eventCode: string, element: HTMLScriptElement): void {
    const todoId: number = this.getIdFromDataAttribute(element);
    let todoIndex = this.todos.findIndex(todo => todo.id === todoId);

    if (eventCode === "ArrowDown") {
      if (todoIndex < this.todos.length - 1) {
        todoIndex++;
        if (this.todos[todoIndex].finished) {
          todoIndex++; // go to next index if finished!
        }
      }
    } else {
      if (todoIndex > 0) {
        todoIndex--;
        if (this.todos[todoIndex].finished) {
          todoIndex--; // go to next index if finished!
        }
      }
    }

    console.log(`INDEX="${todoIndex}"`); // testing
    const nextTodo = this.todos[todoIndex];
    const nextTodoElement: HTMLScriptElement = <HTMLScriptElement>document.querySelector(`[data-id="${nextTodo.id}"]`);
    console.log(nextTodoElement); // testing
    nextTodoElement.focus();

    this.todosService.selectedTodo.emit(this.todos[todoIndex]);
  }

  private deleteTodo(htmlElement: HTMLScriptElement): void {
    const todoId: number = this.getIdFromDataAttribute(htmlElement);
    console.log(todoId); // testing
    const todoIndex = this.todos.findIndex(todo => todo.id === todoId);

    if (this.todos[todoIndex].content.length === 0 && this.todos.length > 1) {
      this.todos.splice(todoIndex, 1);
      console.log("here"); // testing

      this.todosHttpService.deleteTodoOnServer(todoId);
    }
  }

  private increaseTextAreaHeightByScrollHeight(focusedElement: HTMLScriptElement): void {
    focusedElement.style.height = "auto";
    focusedElement.style.height = focusedElement.scrollHeight + "px";
  }

  private addOrUpdateTodoOnServer(focusedElement: HTMLScriptElement) {
    const todoId = this.getIdFromDataAttribute(focusedElement);
    const todo = this.todos.find(t => t.id === todoId);

    if (todoId === -1) {
      this.todosHttpService.addTodoOnServer(todo);
    } else {
      this.todosHttpService.updateTodoOnServer(todo);
    }
    console.log("previousWasTodo"); // testing
  }

  private deleteTodoOnButtonClick(todo: Todo): void {
    console.log(`Todo to delete: ${todo.id}`);

    const todoIndex = this.todos.findIndex(t => t.id === todo.id);
    this.todos.splice(todoIndex, 1);

    this.todosService.selectedTodo.emit(null);

    this.todosHttpService.deleteTodoOnServer(todo.id);
  }

  private changeTodoStatus(todo: Todo): void {
    console.log(todo); // testing

    if (todo.finished) {
      // remove the started and stopped times if you bring a _todo from done to _todo
      todo.started = "";
      todo.stopped = "";
    }

    todo.finished = !todo.finished;
  }

}

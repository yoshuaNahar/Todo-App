import { Component, HostListener, OnInit } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Todo } from "../shared/Todo";
import { TodosService } from "../shared/TodosService";

@Component({
  selector: "app-todo-list",
  templateUrl: "./todo-list.component.html",
  styleUrls: ["./todo-list.component.css"]
})
export class TodoListComponent implements OnInit {

  // so that users can press left or right shift with enter And not create new _todo
  private previousEventCode: string;
  // so that I can send the data from that _todo to the server
  private preiousFocusedElement: HTMLScriptElement;
  // so that if a user clicks on a title and presses enter, a new _todo will be created
  private focusOnTitle: boolean;
  private focusedTodo: Todo;

  constructor(private todosService: TodosService, private http: Http) {
  }

  ngOnInit(): void {

  }

  private addTodoToServer(todo: Todo): void {
    const headers: Headers = new Headers({ "Content-Type": "application/json" });
    const options = new RequestOptions(headers);

    this.http.post("http://localhost:8080/" + window.location.pathname, todo, options);
  }

  @HostListener("window:click", ["$event"])
  private onClick(event: MouseEvent): void {
    console.log(event); // testing
    const clickedElement: HTMLScriptElement = <HTMLScriptElement>event.toElement;

    console.log(`clickedElement: ${clickedElement}`); // testing
    if (clickedElement instanceof HTMLInputElement) {
      this.focusOnTitle = true;
      return;
    } else if (clickedElement instanceof HTMLTextAreaElement) {
      this.setFocusedTodoToClickedTodo(clickedElement);
    }
    this.focusOnTitle = false;
  }

  @HostListener("window:keydown", ["$event"])
  private handleEvent(event: KeyboardEvent): void {
    const eventCode: string = event.code;
    const focusedElement: HTMLScriptElement = <HTMLScriptElement>document.activeElement;

    if (eventCode === "Enter" && !(this.previousEventCode === "ShiftLeft" || this.previousEventCode === "ShiftRight")) {
      this.createNewTodoOnCorrectEventCode(focusedElement);
    } else if (eventCode === "ArrowDown" || eventCode === "ArrowUp") {
      this.moveFocusOnCorrectEventCode(eventCode, focusedElement);
    } else if (eventCode === "Backspace") {
      this.deleteTodoOnCorrectEventCode(focusedElement);
    } else if (this.preiousFocusedElement.className === "todo") {
      // if the previousFocusedElement === _todo, save the changes to server
      this.addTodoToServer();
    }
    this.increaseTextAreaHeightByScrollHeight(focusedElement);

    this.previousEventCode = event.code;
    console.log(event.code); // testing
    this.focusOnTitle = false;
    this.preiousFocusedElement = focusedElement;
  }

  private createNewTodoOnCorrectEventCode(focusedElement: HTMLScriptElement): void {
    event.preventDefault();

    const indexOfElementWithCurrentFocus: number = this.getDataIndexFromTodo(focusedElement);

    if (indexOfElementWithCurrentFocus !== -1 || this.focusOnTitle) {
      this.todosService.getTodos().splice(indexOfElementWithCurrentFocus + 1, 0, new Todo("", false));
    }
  }

  private moveFocusOnCorrectEventCode(eventCode: string, focusedElement: HTMLScriptElement): void {
    let indexOfElementWithCurrentFocus: number = this.getDataIndexFromTodo(focusedElement);

    if (eventCode === "ArrowDown") {
      if (indexOfElementWithCurrentFocus < this.todosService.getTodos().length - 1) {
        indexOfElementWithCurrentFocus++;
      }
    } else {
      if (indexOfElementWithCurrentFocus > 0) {
        indexOfElementWithCurrentFocus--;
      }
    }

    console.log(`[data-index="${indexOfElementWithCurrentFocus}"]`); // testing

    const elementToGoTo: HTMLScriptElement = <HTMLScriptElement>document.querySelector(`[data-index="${indexOfElementWithCurrentFocus}"]`);
    console.log(elementToGoTo); // testing
    elementToGoTo.focus();
    this.focusedTodo = this.todosService.getTodos()[indexOfElementWithCurrentFocus];
  }

  private deleteTodoOnCorrectEventCode(focusedElement: HTMLScriptElement): void {
    const indexOfElementWithCurrentFocus: number = this.getDataIndexFromTodo(focusedElement);
    console.log(indexOfElementWithCurrentFocus); // testing
    if (this.todosService.getTodos()[indexOfElementWithCurrentFocus].content.length === 0 && this.todosService.getTodos().length > 1) {
      this.todosService.getTodos().splice(indexOfElementWithCurrentFocus, 1);
      console.log("here"); // testing
    }
  }

  private increaseTextAreaHeightByScrollHeight(focusedElement: HTMLScriptElement): void {
    focusedElement.style.height = "auto";
    focusedElement.style.height = focusedElement.scrollHeight + "px";
  }

  private setFocusedTodoToClickedTodo(clickedElement: HTMLScriptElement) {
    const indexOfElementWithCurrentFocus: number = this.getDataIndexFromTodo(clickedElement);

    if (indexOfElementWithCurrentFocus !== -1) {
      this.focusedTodo = this.todosService.getTodos()[indexOfElementWithCurrentFocus];
    }
  }

  private getDataIndexFromTodo(element: HTMLScriptElement): number {
    if (element.hasAttribute("data-index")) {
      return Number(element.getAttribute("data-index"));
    }
    return -1;
  }

}

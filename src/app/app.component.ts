import { Component, HostListener } from '@angular/core';
import { Todo } from "app/shared/Todo";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  // so that users can press left or right shift with enter And not create new _todo
  private previousEventCode: string;
  private focusedTodo: Todo;

  todos: Todo[] = [ // not private for testing
    new Todo('create design', false),
    new Todo('write angular code', false),
    new Todo('drink coffee', false)
  ];

  @HostListener('window:click', ['$event'])
  private onClick(event: MouseEvent): void {
    console.log(event); // testing
    let clickedElement: HTMLScriptElement = <HTMLScriptElement>event.toElement;

    let indexOfElementWithCurrentFocus: number = this.getDataIndexFromElement(clickedElement);

    if (indexOfElementWithCurrentFocus != -1) {
      this.focusedTodo = this.todos[indexOfElementWithCurrentFocus];
    }
  }

  @HostListener('window:keydown', ['$event'])
  private handleEvent(event: KeyboardEvent): void {
    let eventCode: string = event.code;
    let focusedElement: HTMLScriptElement = <HTMLScriptElement>document.activeElement;

    this.createNewTodoOnCorrectEventCode(eventCode, focusedElement);
    this.moveFocusOnCorrectEventCode(eventCode, focusedElement);
    this.deleteTodoOnCorrectEventCode(eventCode, focusedElement);
    this.increaseTextAreaHeightByScrollHeight(focusedElement);

    this.previousEventCode = event.code;
    console.log(event.code); // testing
  }

  private markTodoAsFinished(eventData: { isFinished: boolean }): void {
    this.focusedTodo.finished = eventData.isFinished;
  }

  private createNewTodoOnCorrectEventCode(eventCode: string, focusedElement: HTMLScriptElement): void {
    if (eventCode == 'Enter' && !(this.previousEventCode == 'ShiftLeft' || this.previousEventCode == 'ShiftRight')) {
      event.preventDefault();

      let indexOfElementWithCurrentFocus: number = this.getDataIndexFromElement(focusedElement);

      if (indexOfElementWithCurrentFocus != -1) {
        this.todos.splice(indexOfElementWithCurrentFocus + 1, 0, new Todo('', false));
      }
    }
  }

  private moveFocusOnCorrectEventCode(eventCode: string, focusedElement: HTMLScriptElement): void {
    if (eventCode == 'ArrowDown' || eventCode == 'ArrowUp') {
      let indexOfElementWithCurrentFocus: number = this.getDataIndexFromElement(focusedElement);

      if (eventCode == 'ArrowDown') {
        if (indexOfElementWithCurrentFocus < this.todos.length - 1) {
          indexOfElementWithCurrentFocus++;
        }
      } else {
        if (indexOfElementWithCurrentFocus > 0) {
          indexOfElementWithCurrentFocus--;
        }
      }

      console.log(`[data-index="${indexOfElementWithCurrentFocus}"]`); // testing

      let elementToGoTo: HTMLScriptElement = <HTMLScriptElement>document.querySelector(`[data-index="${indexOfElementWithCurrentFocus}"]`);
      console.log(elementToGoTo); // testing
      elementToGoTo.focus();
      this.focusedTodo = this.todos[indexOfElementWithCurrentFocus];
    }
  }

  private deleteTodoOnCorrectEventCode(eventCode: string, focusedElement: HTMLScriptElement): void {
    if (eventCode == 'Backspace') {
      let indexOfElementWithCurrentFocus: number = this.getDataIndexFromElement(focusedElement);
      console.log(indexOfElementWithCurrentFocus); // testing
      if (this.todos[indexOfElementWithCurrentFocus].content.length == 0 && this.todos.length > 1) {
        this.todos.splice(indexOfElementWithCurrentFocus, 1);
        console.log("here"); // testing
      }
    }
  }

  private increaseTextAreaHeightByScrollHeight(focusedElement: HTMLScriptElement): void {
    focusedElement.style.height = 'auto';
    focusedElement.style.height = focusedElement.scrollHeight + 'px';
  }

  private getDataIndexFromElement(element: HTMLScriptElement): number {
    if (element.hasAttribute('data-index')) {
      return Number(element.getAttribute('data-index'));
    }
    return -1;
  }

}

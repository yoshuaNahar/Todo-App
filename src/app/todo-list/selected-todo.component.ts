import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from "../shared/Todo";

@Component({
  selector: 'app-selected-todo',
  templateUrl: './selected-todo.component.html',
  styleUrls: ['./selected-todo.component.css'],
})
export class SelectedTodoComponent {

  @Input() private selectedTodo: Todo;
  // @Output() private todoFinished: EventEmitter<{ isFinished: boolean }> = new EventEmitter<{ isFinished: boolean }>();

  private setStartTime(): void {
    this.selectedTodo.started = this.getCurrentTime();
  }

  private setStopTime(): void {
    this.selectedTodo.stopped = this.getCurrentTime();

    this.selectedTodo.finished = true;
  }

  private getCurrentTime(): string {
    let date: Date = new Date();
    let hours: string = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let minutes: string = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    return hours + ':' + minutes;
  }

}

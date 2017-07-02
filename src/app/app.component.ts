import { Component, Input } from "@angular/core";
import "rxjs/add/operator/toPromise";
import { Todo } from "./shared/Todo";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  @Input() private focusedTodo: Todo = null;

}

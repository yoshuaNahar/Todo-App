import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import { TodosService } from "app/shared/TodosService";

import { AppComponent } from "./app.component";
import { SelectedTodoComponent } from "./selected-todo/selected-todo.component";
import { TodosHttpService } from "./shared/TodosHttpService";
import { TodoListComponent } from "./todo-list/todo-list.component";

@NgModule({
  declarations: [
    AppComponent,
    SelectedTodoComponent,
    TodoListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    TodosService,
    TodosHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

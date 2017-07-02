import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";

import { AppComponent } from "./app.component";
import { SelectedTodoComponent } from "./selected-todo/selected-todo.component";
import { TodosService } from "./shared/TodosService";
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
  providers: [TodosService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

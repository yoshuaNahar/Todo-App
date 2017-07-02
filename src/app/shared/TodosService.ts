import { Http } from "@angular/http";
import { Todo } from "./Todo";

export class TodosService {

  private todos: Todo[] = [
    new Todo("create design", false),
    new Todo("write angular code", false),
    new Todo("drink coffee", true)
  ];

  private finishedTodos: Todo[] = [
  ];

  constructor(private http: Http) {
  }

  changeTodoStatusAndList(index: number, finishedTodo: boolean): void {
    console.log(index); // testing

    if (finishedTodo) {
      const todoList = this.finishedTodos.splice(index, 1);
      if (todoList.length === 1) {
        const todo = todoList.pop();
        todo.finished = !todo.finished;
        // remove the started and stopped times if you bring a _todo from done to _todo
        todo.started = "";
        todo.stopped = "";
        this.todos.push(todo);
      }
    } else {
      const todoList = this.todos.splice(index, 1);
      if (todoList.length === 1) {
        const todo = todoList.pop();
        todo.finished = !todo.finished;
        this.finishedTodos.push(todo);
      }
    }
  }

  deleteTodo(todo: Todo): void {
    console.log(todo.content); // testing
    console.log(todo.finished); // testing

    if (todo.finished) {
      const index = this.finishedTodos.indexOf(todo);
      this.finishedTodos.splice(index, 1);
    } else {
      const index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    }
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  getFinishedTodos(): Todo[] {
    return this.finishedTodos;
  }

  getTodosFromServer(): Todo[] {
    // https://stackoverflow.com/a/32495055/5473627
    return this.http.get("http://localhost:8080/" + window.location.pathname)
      .toPromise()
      .then(response => response.json().data as Todo[])
      .then(response => this.placeTodosInTodoService(response));
  }

  private placeTodosInTodoService(todos: any): void {
    console.log(todos);
    for (const todo of todos.todoList) {
      if (todo.finished) {
        this.todosService.getFinishedTodos().push(todo);
      } else {
        this.todosService.getTodos().push(todo);
      }
    }
  }

}

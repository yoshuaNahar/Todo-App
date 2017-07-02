import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Todo } from "./Todo";

@Injectable()
export class TodosHttpService {

  private static URL = `http://localhost:8080${window.location.pathname}`;
  private static OPTIONS = new RequestOptions(new Headers({ "Content-Type": "application/json" }));

  private static handleError(error: any): Promise<any> {
    console.error("An error has occurred", error); // testing
    return Promise.reject(error.message || error);
  }

  constructor(private http: Http) {
  }

  getTodosFromServer(): Promise<Todo[]> {
    console.log(TodosHttpService.URL); // testing

    // https://stackoverflow.com/a/32495055/5473627
    return this.http.get(TodosHttpService.URL)
      .toPromise()
      .then(response => response.json().todoList as Todo[])
      .catch(TodosHttpService.handleError);
    // the server sends { "url": "xxx", "todoList": [array with all the todos] }
  }

  addTodoOnServer(todo: Todo): void {
    this.http.put(TodosHttpService.URL, todo, TodosHttpService.OPTIONS)
      .toPromise()
      .catch(TodosHttpService.handleError);
    console.log(`put ${todo}`);
  }

  updateTodoOnServer(todo: Todo): void {
    this.http.post(TodosHttpService.URL, todo, TodosHttpService.OPTIONS)
      .toPromise()
      .catch(TodosHttpService.handleError);
    console.log(`update ${todo}`);
  }

  deleteTodoOnServer(id: number): void {
    this.http.delete(`${TodosHttpService.URL}/${id}`, TodosHttpService.OPTIONS)
      .toPromise()
      .catch(TodosHttpService.handleError);
    console.log(`delete ${id}`);
  }

}

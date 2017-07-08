import { Injectable } from "@angular/core";
import { Http, RequestOptions } from "@angular/http";
import { Todo } from "./Todo";

@Injectable()
export class TodosHttpService {

  private static DOMAIN = "http://130.211.68.181:8080/"; // http://localhost:8080/
  private static OPTIONS = new RequestOptions(new Headers({ "Content-Type": "application/json" }));

  private static handleError(error: any): Promise<any> {
    console.error("An error has occurred", error); // testing
    return Promise.reject(error.message || error);
  }

  private static getFullUrl(): string {
    const url = window.location.pathname;
    const i = url.lastIndexOf("/");

    return TodosHttpService.DOMAIN + url.substring(i + 1);
  }

  constructor(private http: Http) {
  }

  getTodosFromServer(): Promise<Todo[]> {
    console.log(TodosHttpService.DOMAIN); // testing

    // https://stackoverflow.com/a/32495055/5473627
    return this.http.get(TodosHttpService.getFullUrl())
      .toPromise()
      .then(response => response.json().todos as Todo[])
      .catch(TodosHttpService.handleError);
    // the server sends { "url": "xxx", "todoList": [array with all the todos] }
  }

  putTodoOnServer(todo: Todo): void {
    this.http.put(TodosHttpService.getFullUrl(), todo, TodosHttpService.OPTIONS)
      .toPromise()
      .catch(TodosHttpService.handleError);
    console.log(`put ${todo}`);
  }

  updateTodoOnServer(todo: Todo): void {
    this.http.post(TodosHttpService.getFullUrl(), todo, TodosHttpService.OPTIONS)
      .toPromise()
      .catch(TodosHttpService.handleError);
    console.log(`update ${todo}`);
  }

  deleteTodoOnServer(id: number): void {
    this.http.delete(`${TodosHttpService.getFullUrl()}/${id}`, TodosHttpService.OPTIONS)
      .toPromise()
      .catch(TodosHttpService.handleError);
    console.log(`delete ${id}`);
  }

}

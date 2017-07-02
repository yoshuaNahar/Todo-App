export class Todo {

  public started = "";
  public stopped = "";

  constructor(public id: number, public content: string, public finished: boolean) {
  }

}

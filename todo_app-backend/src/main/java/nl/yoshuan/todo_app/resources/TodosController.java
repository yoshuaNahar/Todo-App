package nl.yoshuan.todo_app.resources;

import nl.yoshuan.todo_app.entities.Todo;
import nl.yoshuan.todo_app.entities.Todos;
import nl.yoshuan.todo_app.services.TodosService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class TodosController {

  private TodosService todosService;

  @Autowired
  public TodosController(TodosService todosService) {
    this.todosService = todosService;
  }

  @GetMapping("/{urlId}")
  public Todos getTodos(@PathVariable("urlId") String urlId) {
    return todosService.getTodos(urlId);
  }

  @PutMapping("/{urlId}")
  public void addTodo(@PathVariable("urlId") String urlId, @RequestBody Todo todo) {
    todosService.addTodo(urlId, todo);
  }

  @PostMapping("/{urlId}")
  public void updateTodo(@PathVariable("urlId") String urlId, @RequestBody Todo todo) {
    todosService.updateTodo(urlId, todo);
  }

  @DeleteMapping("/{urlId}/{todoId}")
  public void deleteTodo(@PathVariable("urlId") String urlId,
      @PathVariable("todoId") Long todoId) {
    todosService.deleteTodo(urlId, todoId);
  }

  @GetMapping("/test")
  public String test() {
    this.todosService.saveTest();

    return "Hello World!";
  }

}

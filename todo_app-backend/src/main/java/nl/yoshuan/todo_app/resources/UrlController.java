package nl.yoshuan.todo_app.resources;

import nl.yoshuan.todo_app.entities.Todo;
import nl.yoshuan.todo_app.entities.TodosHolder;
import nl.yoshuan.todo_app.services.TodosHolderService;
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
@CrossOrigin(origins = "http://130.211.68.181") // dev = http://localhost:4200
public class UrlController {

  private TodosHolderService todosHolderService;

  @Autowired
  public UrlController(TodosHolderService todosHolderService) {
    this.todosHolderService = todosHolderService;
  }

  @GetMapping("/{url}")
  public TodosHolder getTodos(@PathVariable("url") String url) {
    return todosHolderService.getTodosHolder(url);
  }

  @PutMapping("/{url}")
  public void addTodo(@PathVariable("url") String url, @RequestBody Todo todo) {
    todosHolderService.addTodo(url, todo);
  }

  @PostMapping("/{url}")
  public void updateTodo(@PathVariable("url") String url, @RequestBody Todo todo) {
    todosHolderService.updateTodo(url, todo);
  }

  @DeleteMapping("/{url}/{todoId}")
  public void deleteTodo(@PathVariable("url") String url,
      @PathVariable("todoId") Long todoId) {
    todosHolderService.deleteTodo(url, todoId);
  }

  @GetMapping("/test")
  public String test() {
    this.todosHolderService.saveTest();

    return "Hello World!";
  }

}

package nl.yoshuan.todo_app.services;

import nl.yoshuan.todo_app.entities.Todo;
import nl.yoshuan.todo_app.entities.Todos;
import nl.yoshuan.todo_app.repositories.TodosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodosService {

  private TodosRepository todosRepository;

  @Autowired
  public TodosService(TodosRepository todosRepository) {
    this.todosRepository = todosRepository;
  }

  public Todos getTodos(String urlId) {
    Todos todos = todosRepository.findByUrlId(urlId);

    if (todos == null) {
      todos = todosRepository.save(new Todos(urlId));
    }

    return todos;
  }

  public boolean addTodo(String urlId, Todo todo) {
    Todos todos = todosRepository.findByUrlId(urlId);

    todos.getTodoList().add(todo);
    todosRepository.save(todos);

    return true;
  }

  public boolean updateTodo(String urlId, Todo todo) {
    Todos todos = todosRepository.findByUrlId(urlId);

    todos.getTodoList()
        .removeIf(t -> t.getId().equals(todo.getId())); // obj not primitive
    todosRepository.save(todos);

    todos.getTodoList().add(todo); // deleting first and reading because getting mismatch error
    // possibly because I'm saving not merging.
    todosRepository.save(todos);

    return true;
  }

  public boolean deleteTodo(String urlId, Long todoId) {
    Todos todos = todosRepository.findByUrlId(urlId);

    todos.getTodoList()
        .removeIf(t -> t.getId().equals(todoId)); // obj not primitive
    todosRepository.save(todos);

    return true;
  }

  public void saveTest() {
    Todos todos = new Todos("asd");
    todos.getTodoList().add(new Todo("Workout", "", "", false));
    todosRepository.save(todos);

    System.out.println(todos);
  }

}

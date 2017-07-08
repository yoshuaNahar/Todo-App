package nl.yoshuan.todo_app.services;

import nl.yoshuan.todo_app.entities.Todo;
import nl.yoshuan.todo_app.entities.TodosHolder;
import nl.yoshuan.todo_app.repositories.TodosHolderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TodosHolderService {

  private TodosHolderRepository todosHolderRepository;

  @Autowired
  public TodosHolderService(TodosHolderRepository todosHolderRepository) {
    this.todosHolderRepository = todosHolderRepository;
  }

  public TodosHolder getTodosHolder(String url) {
    TodosHolder todosHolder = todosHolderRepository.findByUrl(url);

    if (todosHolder == null) {
      todosHolder = todosHolderRepository.save(new TodosHolder(url));
    }

    return todosHolder;
  }

  public boolean addTodo(String url, Todo todo) {
    TodosHolder todosHolder = todosHolderRepository.findByUrl(url);

    todosHolder.getTodos().add(todo);
    todosHolderRepository.save(todosHolder);

    return true;
  }

  // id needs to be included in _todo
  public boolean updateTodo(String url, Todo todo) {
    if (todo.getId() == null) {
      return false;
    }

    TodosHolder todosHolder = todosHolderRepository.findByUrl(url);

    // deleting first then adding, could be done better, but this is simplest
    for (Todo t : todosHolder.getTodos()) {
      if (t.getId() == todo.getId()) {
        todosHolder.getTodos().remove(t);
        todosHolder.getTodos().add(todo);
        todosHolderRepository.save(todosHolder);
        return true;
      }
    }

    return false;
  }

  public boolean deleteTodo(String url, Long todoId) {
    TodosHolder todosHolder = todosHolderRepository.findByUrl(url);

    todosHolder.getTodos()
        .removeIf(t -> t.getId() == todoId);

    todosHolderRepository.save(todosHolder);

    return true;
  }

}

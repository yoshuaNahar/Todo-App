package nl.yoshuan.todo_app.repositories;

import nl.yoshuan.todo_app.entities.TodosHolder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodosHolderRepository extends JpaRepository<TodosHolder, Long> {

  TodosHolder findByUrl(String url);

}

package nl.yoshuan.todo_app.repositories;

import nl.yoshuan.todo_app.entities.Todos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TodosRepository extends JpaRepository<Todos, Long> {

    Todos findByUrlId(String urlId);

}

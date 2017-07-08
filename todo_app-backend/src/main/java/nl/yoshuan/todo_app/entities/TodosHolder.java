package nl.yoshuan.todo_app.entities;

import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "todos_holder")
public class TodosHolder {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "todos_holder_id", nullable = false, insertable = false, updatable = false)
  private Long id;

  @Column(name = "url", nullable = false, updatable = false)
  private String url;

  // orphanRemoval removes child in db if removed from this list
  @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
  // unidirectional, so place @JoinColumn here
  @JoinColumn(name = "todos_id", nullable = false, updatable = false)
  private List<Todo> todos = new ArrayList<>();

  protected TodosHolder() {
  }

  public TodosHolder(String url) {
    this.url = url;
  }

  public String getUrl() {
    return url;
  }

  public List<Todo> getTodos() {
    return todos;
  }

  @Override
  public String toString() {
    return "Todos{" +
        "id=" + id +
        ", url='" + url + '\'' +
        ", todos=" + todos +
        '}';
  }

}

package nl.yoshuan.todo_app.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "todos")
public class Todos {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todos_id", nullable = false, insertable = false, updatable = false)
    private Long id;

    @Column(name = "url_id", nullable = false, updatable = false)
    private String urlId;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    // orphanRemoval removes child in db if removed from this list
    @JoinColumn(name = "todos_id", nullable = false, updatable = false)
    // unidirectional, so place @JoinColumn here
    private List<Todo> todoList = new ArrayList<>();

    protected Todos() {}

    public Todos(String urlId) {
        this.urlId = urlId;
    }

    public String getUrlId() {
        return urlId;
    }

    public List<Todo> getTodoList() {
        return todoList;
    }

    @Override
    public String toString() {
        return "Todos{" +
                "id=" + id +
                ", urlId='" + urlId + '\'' +
                ", todoList=" + todoList +
                '}';
    }

}

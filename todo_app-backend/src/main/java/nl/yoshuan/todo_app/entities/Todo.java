package nl.yoshuan.todo_app.entities;

import javax.persistence.*;

@Entity
@Table(name = "todo")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "todo_id", nullable = false, insertable = false, updatable = false)
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "started")
    private String started;

    @Column(name = "stopped")
    private String stopped;

    @Column(name = "finished")
    private boolean finished;

    protected Todo() {}

    public Todo(String content, String started, String stopped, boolean finished) {
        this.content = content;
        this.started = started;
        this.stopped = stopped;
        this.finished = finished;
    }

    public Long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getStarted() {
        return started;
    }

    public void setStarted(String started) {
        this.started = started;
    }

    public String getStopped() {
        return stopped;
    }

    public void setStopped(String stopped) {
        this.stopped = stopped;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", content='" + content + '\'' +
                ", started='" + started + '\'' +
                ", stopped='" + stopped + '\'' +
                ", finished=" + finished +
                '}';
    }

}

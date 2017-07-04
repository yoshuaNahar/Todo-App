package nl.yoshuan.todo_app;

import nl.yoshuan.todo_app.config.AppConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Import;

@SpringBootConfiguration
@EnableAutoConfiguration
@Import(AppConfig.class)
public class TodoAppApplication {

  public static void main(String[] args) {
    SpringApplication.run(TodoAppApplication.class, args);
  }

}

package nl.yoshuan.todo_app.config;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@ComponentScan(basePackages = "nl.yoshuan.todo_app")
@PropertySource("classpath:application.properties")
@EnableTransactionManagement
public class AppConfig {

  @Autowired
  private Environment env;

  @Bean
  public DriverManagerDataSource dataSource() {
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setUsername(env.getProperty("db.user"));
    dataSource.setPassword(env.getProperty("db.password"));
    dataSource.setUrl(env.getProperty("db.url"));
    dataSource.setDriverClassName(env.getProperty("db.driver"));
    return dataSource;
  }

  @Bean
  public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
    HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();

    LocalContainerEntityManagerFactoryBean factory = new LocalContainerEntityManagerFactoryBean();
    factory.setJpaVendorAdapter(vendorAdapter);
    factory.setPackagesToScan("nl.yoshuan.todo_app.entities");
    factory.setDataSource(dataSource());

    Map<String, Object> jpaProperties = new HashMap<>();
    jpaProperties.put("hibernate.show_sql", true);
    jpaProperties.put("hibernate.format_sql", true);
    jpaProperties.put("hibernate.use_sql_comments", true);
    jpaProperties.put("hibernate.hbm2ddl.auto",
        "create-drop"); // validate: validate the schema, makes no changes to the database.
    jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.HSQLDialect");

    factory.setJpaPropertyMap(jpaProperties);

    return factory;
  }

  @Bean
  public PlatformTransactionManager transactionManager() {
    JpaTransactionManager txManager = new JpaTransactionManager();
    txManager.setEntityManagerFactory(entityManagerFactory().getObject());
    return txManager;
  }

}

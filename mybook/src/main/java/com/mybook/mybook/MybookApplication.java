package com.mybook.mybook;
import com.mybook.mybook.entities.Book;
import com.mybook.mybook.repositories.BookRepo;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class MybookApplication {

    public static void main(String[] args) {
        SpringApplication.run(MybookApplication.class, args);
    }

}

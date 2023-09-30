package com.mybook.mybook.repositories;

import com.mybook.mybook.entities.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepo extends JpaRepository<Book, Long> {

    Book getBookById(Long id);


    Book findByTitre(String titre);
}

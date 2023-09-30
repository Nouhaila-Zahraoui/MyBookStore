package com.mybook.mybook.services;
import com.mybook.mybook.entities.Book;
import com.mybook.mybook.repositories.BookRepo;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BookServices {
    private final BookRepo bookRepo;

    public BookServices(BookRepo bookRepo) {
        this.bookRepo = bookRepo;
    }

    public Book addbook(Book book){
        Book existingBook = bookRepo.findByTitre(book.getTitre());
        if(existingBook != null){
            throw new IllegalArgumentException("Book already exist");
        }
        return bookRepo.save(book);
    }

    public Book findBookById(Long id){
        return bookRepo.findById(id).orElseThrow(() -> new RuntimeException("Book Not Found"));
    }
    public Book findBookByTitle(String title){
        try {
        return bookRepo.findByTitre(title);}
        catch (RuntimeException e) {
            throw new RuntimeException("Book Not Found");
        }
        }

        public List<Book> findAllBooks(){
        return bookRepo.findAll();
        }

        public Book updateBook(Book book){
        return bookRepo.save(book);
        }

        public Book updateBookByTitle(String title, Book book){
        Book existingBook = bookRepo.findByTitre(title);
            if (existingBook != null) {
                existingBook.setPrix(book.getPrix());
        existingBook.setTitre(book.getTitre());
        return bookRepo.save(existingBook);
    }
            return null;}
    public void deleteBookById(Long id){
        bookRepo.deleteById(id);
    }

    public Book incrementLikes(Long id) {
        // Fetch the book from the database by its ID
        Book book = bookRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Book not found with id " + id));

        // Increment the likes count
        book.setLikes(book.getLikes() + 1);

        // Save the updated book to the database
        return bookRepo.save(book);
    }


    }






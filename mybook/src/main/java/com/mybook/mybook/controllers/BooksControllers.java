package com.mybook.mybook.controllers;

import com.mybook.mybook.entities.Book;
import com.mybook.mybook.services.BookServices;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("api/v1/mybooks")
public class BooksControllers {
private final BookServices bookServices;

    public BooksControllers(BookServices bookServices) {
        this.bookServices = bookServices;
    }
    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    ResponseEntity<List<Book>> getAllBooks(){
        List<Book> books = bookServices.findAllBooks();
        return new ResponseEntity<>(books, HttpStatus.OK);
    }
 /*   @GetMapping("/{titre}")
    ResponseEntity<Book> getBookByTitle(String titre){
        Book book = bookServices.findBookByTitle(titre);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }
*/
    @GetMapping("/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    ResponseEntity<Book> getBookById(@PathVariable Long id){
        Book book = bookServices.findBookById(id);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }


    @PostMapping("/increment-likes/{id}")
    public ResponseEntity<Book> incrementLikes(@PathVariable Long id) {
        Book updatedBook = bookServices.incrementLikes(id);
        return ResponseEntity.ok(updatedBook);
    }


    @PostMapping("/addBook")
    ResponseEntity<?> addBook(@RequestBody Book book){
        Book newBook = bookServices.addbook(book);
        return new ResponseEntity<>(newBook, HttpStatus.CREATED);
    }

    @PutMapping("/updateBook")
    ResponseEntity<Book> updateBook(@RequestBody Book book) {
        Book updateBook = bookServices.updateBook(book);
        return new ResponseEntity<>(updateBook, HttpStatus.OK);
    }

    @PutMapping("/updateBook/{titre}")
    public Book updateBookByTitre(@PathVariable String titre, @RequestBody Book book) {
        Book updated = bookServices.updateBookByTitle(titre, book);
        return updated;
    }

    @DeleteMapping("/deleteBook/{id}")
    ResponseEntity<Book> deleteBook(@PathVariable("id") Long id) {
        bookServices.deleteBookById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            // Get the original file name and create a unique file name
            String originalFileName = file.getOriginalFilename();
            String uniqueFileName = UUID.randomUUID().toString() + "_" + originalFileName;

            // Define the path to the "uploads" directory
            String uploadDirectory = "uploads";

            // Create the full path to save the file
            Path filePath = Paths.get(uploadDirectory, uniqueFileName);

            // Save the file to the "uploads" directory
            Files.write(filePath, file.getBytes());

            // Return the file path as a response
            return ResponseEntity.ok(filePath.toString());
        } catch (IOException e) {
            // Handle the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Image upload failed");
        }
    }


}

package com.mybook.mybook.entities;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long id;
   // @Column(name = "title")
    private String titre;
    private double prix;
    private String author;
    private String description;
    private String type;
    private String image;
    private int likes;

}

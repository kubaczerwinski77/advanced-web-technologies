package pl.edu.pwr.ztw.books.controllers;
import org.springframework.web.bind.annotation.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import pl.edu.pwr.ztw.books.data.Authors;
import pl.edu.pwr.ztw.books.models.Author;
import pl.edu.pwr.ztw.books.models.Book;
import pl.edu.pwr.ztw.books.services.AuthorService;
import pl.edu.pwr.ztw.books.services.IAuthorService;
import pl.edu.pwr.ztw.books.services.IBooksService;
import pl.edu.pwr.ztw.books.validators.BookValidator;

import java.util.ArrayList;

@RestController
@CrossOrigin(origins = "http://localhost:8081")
public class BooksController {
    @Autowired
    IBooksService booksService;


    @RequestMapping(value = "/books", method = RequestMethod.GET)
    public ResponseEntity<Object> getBooks() {
        return new ResponseEntity<>(booksService.getBooks(), HttpStatus.OK);
    }


    @RequestMapping(value = "/books/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getBook(@PathVariable("id") int id) {
        return new ResponseEntity<>(booksService.getBook(id), HttpStatus.OK);
    }

    @RequestMapping(value = "/books/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updateBook(@PathVariable("id") int id, @RequestBody Book book) {
        if (BookValidator.isInValidBook(book.getTitle(), book.getPages(), book.getAuthor())) {
            return new ResponseEntity<>("Invalid data", HttpStatus.NOT_ACCEPTABLE);
        }
        ArrayList <Author> aut = new ArrayList<>();
        Authors authors = new Authors();
        AuthorService authorService = new AuthorService();
        for(Author author : book.getAuthor())
        {
            Author find = authors.findBy(author.getFirstName(), author.getLastName());
            if(find == null)
            {
                Author a = authorService.addAuthor(author);
                aut.add(a);
            }
            else {
                aut.add(find);
            }
        }
        book.setAuthor(aut);
        return new ResponseEntity<>(booksService.updateBook(id,book), HttpStatus.OK);
    }


    @RequestMapping(value = "/books/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteBook(@PathVariable("id") int id) {
        return new ResponseEntity<>(booksService.deleteBook(id), HttpStatus.OK);
    }


    @RequestMapping(value = "/books", method = RequestMethod.POST)
    public ResponseEntity<Object> addBook(@RequestBody Book book) {
        if (BookValidator.isInValidBook(book.getTitle(), book.getPages(), book.getAuthor())) {
            return new ResponseEntity<>("Invalid data", HttpStatus.NOT_ACCEPTABLE);
        }
        ArrayList <Author> aut = new ArrayList<>();
        Authors authors = new Authors();
        AuthorService authorService = new AuthorService();
        for(Author author : book.getAuthor())
        {
             Author find = authors.findBy(author.getFirstName(), author.getLastName());
            if(find == null)
            {
                Author a = authorService.addAuthor(author);
                aut.add(a);
            }
            else {
                aut.add(find);
            }
        }
        book.setAuthor(aut);
        return new ResponseEntity<>(booksService.addBook(book), HttpStatus.OK);
    }
}
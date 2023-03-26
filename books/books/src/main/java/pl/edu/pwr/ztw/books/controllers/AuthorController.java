package pl.edu.pwr.ztw.books.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pwr.ztw.books.services.IAuthorService;
import pl.edu.pwr.ztw.books.validators.AuthorValidator;

@RestController
public class AuthorController {
    IAuthorService authorService;

    public AuthorController(IAuthorService authorService) {
        this.authorService = authorService;
    }


    @RequestMapping(value = "/authors", method = RequestMethod.GET)
    public ResponseEntity<Object> getAuthors() {
        return new ResponseEntity<>(authorService.getAuthors(), HttpStatus.OK);
    }


    @RequestMapping(value = "/authors/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getAuthor(@PathVariable("id") int id) {
        return new ResponseEntity<>(authorService.getAuthor(id), HttpStatus.OK);
    }


    @RequestMapping(value = "/authors/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Object> updateAuthor(@PathVariable("id") int id, String firstName, String lastName, int age) {
        firstName = firstName.strip();
        lastName = lastName.strip();
        if (AuthorValidator.isInvalidAuthor(firstName, lastName, age)) {
            return new ResponseEntity<>("Invalid data", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(authorService.updateAuthor(id, firstName, lastName, age), HttpStatus.OK);
    }


    @RequestMapping(value = "/authors/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Object> deleteAuthor(@PathVariable("id") int id) {
        return new ResponseEntity<>(authorService.deleteAuthor(id), HttpStatus.OK);
    }


    @RequestMapping(value = "/authors", method = RequestMethod.POST)
    public ResponseEntity<Object> addAuthor(String firstName, String lastName, int age) {
        firstName = firstName.strip();
        lastName = lastName.strip();
        if (AuthorValidator.isInvalidAuthor(firstName, lastName, age)) {
            return new ResponseEntity<>("Invalid data", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(authorService.addAuthor(firstName, lastName, age), HttpStatus.OK);
    }
}


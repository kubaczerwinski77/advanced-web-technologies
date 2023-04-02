package pl.edu.pwr.ztw.books.controllers;

import com.fasterxml.jackson.databind.node.ObjectNode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.edu.pwr.ztw.books.models.Book;
import pl.edu.pwr.ztw.books.models.ReaderHelper;
import pl.edu.pwr.ztw.books.services.BooksService;
import pl.edu.pwr.ztw.books.services.IBooksService;
import pl.edu.pwr.ztw.books.services.IReaderService;
import pl.edu.pwr.ztw.books.validators.BookValidator;
import pl.edu.pwr.ztw.books.validators.ReaderValidator;

@RestController
public class ReaderController {
    @Autowired
    IReaderService readerService;


    @RequestMapping(value = "/books/rent", method = RequestMethod.POST)
    public ResponseEntity<Object> getBooks(@RequestBody ReaderHelper helper) {
        if (ReaderValidator.isInValidRent(helper.getReaderId(), helper.getBookId())) {
            return new ResponseEntity<>("Invalid data", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(readerService.rentBook(helper.getBookId(), helper.getReaderId()), HttpStatus.OK);
    }

    @RequestMapping(value = "/books/return", method = RequestMethod.POST)
    public ResponseEntity<Object> getBook(@RequestBody ReaderHelper helper) {
        if (ReaderValidator.isInValidRent(helper.getReaderId(), helper.getBookId())) {
            return new ResponseEntity<>("Invalid data", HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity<>(readerService.returnBook(helper.getBookId(), helper.getReaderId()), HttpStatus.OK);
    }

    @RequestMapping(value = "/reader/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> getBook(@PathVariable("id") int id) {
        return new ResponseEntity<>(readerService.getBooks(id), HttpStatus.OK);
    }
}


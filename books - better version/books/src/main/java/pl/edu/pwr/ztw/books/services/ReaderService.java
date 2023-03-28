package pl.edu.pwr.ztw.books.services;


import org.springframework.stereotype.Service;
import pl.edu.pwr.ztw.books.data.Books;
import pl.edu.pwr.ztw.books.data.Readers;
import pl.edu.pwr.ztw.books.models.Book;
import pl.edu.pwr.ztw.books.models.Reader;

import java.util.Collection;
import java.util.List;

@Service
public class ReaderService implements IReaderService {
    @Override
    public Book rentBook(int bookId, int readerId) {
        Book book = Books.findById(bookId);
        if (book == null) {
            return null;
        }
        Reader reader = Readers.findById(readerId);
        if (reader == null) {
            return null;
        }
        Readers.addBook(book, readerId);
        return null;
    }

    @Override
    public Book returnBook(int bookId, int readerId) {
        Book book = Books.findById(bookId);
        if (book == null) {
            return null;
        }
        Reader reader = Readers.findById(readerId);
        if (reader == null) {
            return null;
        }
        Readers.returnBook(reader, book);
        return null;
    }

    @Override
    public List<Book> getBooks(int readerId) {

        Reader reader = Readers.findById(readerId);
        if (reader == null) {
            return null;
        }
        return reader.getBooks();

        }
}


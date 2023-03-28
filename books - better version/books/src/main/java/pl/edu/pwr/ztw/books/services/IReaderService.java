package pl.edu.pwr.ztw.books.services;


import pl.edu.pwr.ztw.books.models.Author;
import pl.edu.pwr.ztw.books.models.Book;

import java.util.Collection;
import java.util.List;

public interface IReaderService {
    public abstract Book rentBook(int bookId, int readerId);
    public abstract Book returnBook(int bookId, int readerId);

    public abstract List<Book> getBooks(int readerId);
}

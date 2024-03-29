package pl.edu.pwr.ztw.books.services;


import pl.edu.pwr.ztw.books.models.Book;

import java.util.Collection;

public interface IBooksService {
    public abstract Collection<Book> getBooks();
    public abstract Book getBook(int id);
    public abstract Book addBook(Book book);
    public abstract Book updateBook(int id,Book book);
    public abstract Book deleteBook(int id);
}


package pl.edu.pwr.ztw.books.services;


import pl.edu.pwr.ztw.books.models.Author;
import pl.edu.pwr.ztw.books.models.Book;

import java.util.Collection;

public interface IAuthorService {
    public abstract Collection<Author> getAuthors();
    public abstract Author getAuthor(int id);
    public abstract Author updateAuthor(int id, String firstName, String lastName, int age);
    public abstract Author deleteAuthor(int id);
    public abstract Author addAuthor(String firstName, String lastName, int age);
    public abstract Book addBook(int id, Book book);
}

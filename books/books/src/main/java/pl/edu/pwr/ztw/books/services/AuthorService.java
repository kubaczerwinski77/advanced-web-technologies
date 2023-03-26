package pl.edu.pwr.ztw.books.services;

import org.springframework.stereotype.Service;
import pl.edu.pwr.ztw.books.data.Authors;
import pl.edu.pwr.ztw.books.data.Books;
import pl.edu.pwr.ztw.books.models.Author;
import pl.edu.pwr.ztw.books.models.Book;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class AuthorService implements IAuthorService {



    @Override
    public Collection<Author> getAuthors() {
        return Authors.getAuthorsRepo();
    }

    @Override
    public Author getAuthor(int id) {
        return Authors.getAuthorsRepo().stream().filter(a -> a.getId() == id).findFirst().orElse(null);
    }

    @Override
    public Author updateAuthor(int id, String firstName, String lastName, int age) {
        Author author = Authors.getAuthorsRepo().stream().filter(a -> a.getId() == id).findFirst().orElse(null);
        if (author == null) {
            return null;
        }
        author.setFirstName(firstName);
        author.setLastName(lastName);
        author.setAge(age);
        return author;
    }

    @Override
    public Author deleteAuthor(int id) {
        Author author = Authors.getAuthorsRepo().stream().filter(a -> a.getId() == id).findFirst().orElse(null);
        if (author == null) {
            return null;
        }
        Authors.removeById(id);;
        return author;
    }

    @Override
    public Author addAuthor(String firstName, String lastName, int age) {
        Author author = new Author(Authors.getAuthorsRepo().size() + 1, firstName, lastName, age, new ArrayList<>());
        Authors.addAuthorToRepo(author);
        return author;
    }

    @Override
    public Book addBook(int id, Book book) {
        Author author = Authors.getAuthorsRepo().stream().filter(a -> a.getId() == id).findFirst().orElse(null);
        if (author == null) {
            return null;
        }
        author.addBook(book);
        return book;
    }
}


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
    public Author updateAuthor(int id, Author author) {
        Author aut = Authors.getAuthorsRepo().stream().filter(a -> a.getId() == id).findFirst().orElse(null);
        if (aut == null) {
            return null;
        }
        aut.setFirstName(author.getFirstName());
        aut.setLastName(author.getLastName());
        aut.setAge(author.getAge());
        return aut;
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
    public Author addAuthor(Author author) {
        Author a = new Author( Authors.getAuthorsRepo().size() + 1,author.getFirstName(), author.getLastName(), author.getAge());
        Authors.addAuthorToRepo(a);
        return a;
    }


}


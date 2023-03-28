package pl.edu.pwr.ztw.books.services;

import org.springframework.stereotype.Service;
import pl.edu.pwr.ztw.books.data.Books;
import pl.edu.pwr.ztw.books.models.Book;

import java.util.Collection;
import java.util.Optional;

@Service
public class BooksService implements IBooksService {

    @Override
    public Collection<Book> getBooks() {
        return Books.getBooksRepo();
    }

    @Override
    public Book getBook(int id) {
        return Books.getBooksRepo().stream()
                .filter(b -> b.getId() == id)
                .findAny()
                .orElse(null);
    }

    @Override
    public Book addBook(Book book) {
        Book b = new Book(Books.getBooksRepo().size() + 1, book.getTitle(), book.getPages(), book.getAuthor());
        Books.addBookToRepo(b);
        return b;
    }

    @Override
    public Book updateBook(int id, Book book) {
        Optional<Book> res = Books.getBooksRepo().stream().filter(b -> b.getId() == id).findFirst();
        if (res.isPresent()) {
            Book b = res.get();
            b.setTitle(book.getTitle());
            b.setPages(book.getPages());
            b.setAuthor(book.getAuthor());
            return b;
        }
        return null;
    }

    @Override
    public Book deleteBook(int id) {
        Optional<Book> book = Books.getBooksRepo().stream().filter(b -> b.getId() == id).findFirst();
        if (book.isEmpty()) {
            return null;
        }
        Books.removeById(id);
        return book.get();
    }
}


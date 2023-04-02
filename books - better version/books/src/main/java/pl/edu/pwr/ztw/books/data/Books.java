package pl.edu.pwr.ztw.books.data;


import pl.edu.pwr.ztw.books.models.Author;
import pl.edu.pwr.ztw.books.models.Book;

import java.util.ArrayList;
import java.util.List;

public class Books {
    private static List<Book> booksRepo = new ArrayList<>();

    static {
        booksRepo.add(new Book(1,"Potop", 936, new ArrayList<>(List.of(new Author(1,"Adam", "Mickiewicz")))));
        booksRepo.add(new Book(2,"Wesele", 150, new ArrayList<>(List.of(new Author(1,"Adam", "Mickiewicz"),
                                                                                      new Author(2,"Anna", "Dunska")))));
        booksRepo.add(new Book(3,"Dziady", 292, new ArrayList<>(List.of(new Author(3, "Henryk", "Sienkiewicz")))));
    }

    public static List<Book> getBooksRepo() {
        return booksRepo;
    }

    public static Book findById(int id) {
        for (Book b: booksRepo) {
            if (b.getId() == id) {
                return b;
            }
        }
        return null;
    }

    public static void setBooksRepo(List<Book> booksRepo) {
        Books.booksRepo = booksRepo;
    }

    public static void addBookToRepo(Book book) {
        booksRepo.add(book);
    }

    public static void removeById(int id) {
        booksRepo.removeIf(b -> b.getId() == id);
    }
}


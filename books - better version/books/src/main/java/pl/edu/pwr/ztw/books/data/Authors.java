package pl.edu.pwr.ztw.books.data;

import pl.edu.pwr.ztw.books.models.Author;
import pl.edu.pwr.ztw.books.models.Book;

import java.util.ArrayList;
import java.util.List;

public class Authors {
    private static List<Author> authorsRepo = new ArrayList<>();

    static {
        authorsRepo.add(new Author(1, "Adam", "Mickiewicz"));
        authorsRepo.add(new Author(2, "Anna", "Dunska"));
        authorsRepo.add(new Author(3, "Henryk", "Sienkiewicz"));
    }

    public static List<Author> getAuthorsRepo() {
        return authorsRepo;
    }

    public static Author findById(int id) {
        for (Author a: authorsRepo) {
            if (a.getId() == id) {
                return a;
            }
        }
        return null;
    }

    public static void setAuthorsRepo(List<Author> authorsRepo) {
        Authors.authorsRepo = authorsRepo;
    }

    public static void addAuthorToRepo(Author author) {
        authorsRepo.add(author);
    }

    public static void removeById(int id) {
        authorsRepo.removeIf(a -> a.getId() == id);
    }
}

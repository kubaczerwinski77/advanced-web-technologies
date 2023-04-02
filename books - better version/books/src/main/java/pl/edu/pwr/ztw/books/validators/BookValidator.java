package pl.edu.pwr.ztw.books.validators;

import pl.edu.pwr.ztw.books.models.Author;

import java.util.List;

public class BookValidator {

    public static boolean isInValidBook(String title, Integer pages, List<Author> authorId) {
        return title.equals("") || pages <= 0 || authorId.stream().count() <= 0;
    }
}

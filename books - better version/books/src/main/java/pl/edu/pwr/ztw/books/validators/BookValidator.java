package pl.edu.pwr.ztw.books.validators;

import java.util.List;

public class BookValidator {

    public static boolean isInValidBook(String title, Integer pages, List<Integer> authorId) {
        return title.equals("") || pages <= 0 || authorId.stream().count() <= 0;
    }
}

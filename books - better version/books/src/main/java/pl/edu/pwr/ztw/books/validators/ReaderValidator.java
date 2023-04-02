package pl.edu.pwr.ztw.books.validators;

import pl.edu.pwr.ztw.books.models.Author;

import java.util.List;

public class ReaderValidator {

    public static boolean isInValidRent(Integer readerId, Integer bookId) {
        return readerId <= 0 || bookId <= 0;
    }
}

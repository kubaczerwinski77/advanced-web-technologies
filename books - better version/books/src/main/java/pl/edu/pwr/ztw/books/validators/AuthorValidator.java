package pl.edu.pwr.ztw.books.validators;

public class AuthorValidator {
    public static boolean isInvalidAuthor(String firstName, String lastName) {
        return firstName.equals("") || lastName.equals("");
    }
}
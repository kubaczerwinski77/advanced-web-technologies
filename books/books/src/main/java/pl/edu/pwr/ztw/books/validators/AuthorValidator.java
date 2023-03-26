package pl.edu.pwr.ztw.books.validators;

public class AuthorValidator {
    public static boolean isInvalidAuthor(String firstName, String lastName, int age) {
        return firstName.equals("") || lastName.equals("") || age < 0;
    }
}
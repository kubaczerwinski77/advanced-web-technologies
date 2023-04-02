package pl.edu.pwr.ztw.books.models;

public class ReaderHelper {

    private int readerId;
    private int bookId;

    public ReaderHelper(int readerId, int bookId) {
        this.readerId = readerId;
        this.bookId = bookId;
    }

    public ReaderHelper(){};

    public int getReaderId() {
        return readerId;
    }

    public void setReaderId(int readerId) {
        this.readerId = readerId;
    }

    public int getBookId() {
        return bookId;
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }
}

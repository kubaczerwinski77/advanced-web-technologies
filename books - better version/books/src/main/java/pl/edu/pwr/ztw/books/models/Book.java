package pl.edu.pwr.ztw.books.models;

import java.util.List;

public class Book {
    private Integer id;
    private String title;
    private List<Author> authorId;
    private Integer pages;

    public Book(Integer id, String title, Integer pages, List<Author> authorId) {
        this.id = id;
        this.title = title;
        this.authorId = authorId;
        this.pages = pages;
    }

    public Book(String title, Integer pages, List<Author> authorId) {
        this.title = title;
        this.authorId = authorId;
        this.pages = pages;
    }

    public Book() {};

    public Integer getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Author> getAuthor() {
        return authorId;
    }

    public void setAuthor(List<Author> author) {
        this.authorId = author;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }
}

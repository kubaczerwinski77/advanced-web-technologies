package pl.edu.pwr.ztw.books.models;

import java.util.List;

public class Book {
    private Integer id;
    private String title;
    private List<Integer> authorId;
    private Integer pages;

    public Book(Integer id, String title, Integer pages, List<Integer> authorId) {
        this.id = id;
        this.title = title;
        this.authorId = authorId;
        this.pages = pages;
    }

    public Book(String title, Integer pages, List<Integer> authorId) {
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

    public List<Integer> getAuthor() {
        return authorId;
    }

    public void setAuthor(List<Integer> author) {
        this.authorId = author;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }
}

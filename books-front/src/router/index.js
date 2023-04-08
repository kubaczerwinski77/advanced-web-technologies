import { createWebHistory, createRouter } from "vue-router";

import AddAuthor from "../views/author/AddAuthor";
import EditAuthor from "../views/author/EditAuthor";
import Author from "../views/author/Author";
import AddBook from "../views/book/AddBook";
import EditBook from "../views/book/EditBook";
import Book from "../views/book/Book";
import Home from "../views/home/Home";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "Home", component: Home },
    { path: "/authors/:id", name: "Author", component: Author },
    { path: "/authors/add", name: "AddAuthor", component: AddAuthor },
    { path: "/authors/update/:id", name: "EditAuthor", component: EditAuthor },
    { path: "/books/:id", name: "Book", component: Book },
    { path: "/books/add", name: "AddBook", component: AddBook },
    { path: "/books/update/:id", name: "EditBook", component: EditBook },
  ],
});

export default router;

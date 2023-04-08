<template>
  <div class="pt-5 pb-3 row">
    <h3 class="display-4 mb-4 font-weight-bold col-12 col-md-12">
      Witamy w Twojej księgarni!
    </h3>

    <div class="col-12 col-md-9">
      <input
        type="text"
        @input="searchBook"
        class="form-control form-control-md mb-3"
        placeholder="Wprowadź tytuł książki lub autora"
      />
    </div>
    <div class="col-12 col-md-3">
      <router-link
        :to="{ name: 'AddBook' }"
        class="btn btn-success rounded w-100"
      >
        Dodaj książkę
      </router-link>
    </div>
  </div>

  <div class="row">
    <div class="col-12 col-md-8">
      <p v-if="filteredBooks.length === 0">
        Nie znaleziono książek spełniających kryteria wyszukiwania.
      </p>
      <button class="btn mb-3" @click="previousPage">Poprzednie</button>
      <button class="btn mb-3" @click="nextPage">Następne</button>
      <div v-if="filteredBooks.length > 0" class="row row-cols-1 g-4">
        <BookItem
          v-bind:book="book"
          v-for="book of filteredBooks.slice(
            (currentPage - 1) * 4,
            currentPage * 4
          )"
          v-bind:key="book.id"
        />
      </div>
    </div>
    <div class="col-12 col-md-4">
      <AuthorsList />
    </div>
  </div>
</template>

<script>
import AuthorsList from "./AuthorsList";
import BookItem from "../../components/BookItem";

export default {
  data: function () {
    return {
      filteredBooks: [],
      loading: false,
      books: [],
      error: null,
      currentPage: 1,
    };
  },
  mounted() {
    this.fetchBooks();
  },
  components: {
    AuthorsList,
    BookItem,
  },
  methods: {
    nextPage() {
      this.currentPage =
        this.currentPage < this.filteredBooks.length / 4
          ? this.currentPage + 1
          : this.currentPage;
    },
    previousPage() {
      this.currentPage = this.currentPage > 1 ? this.currentPage - 1 : 1;
    },
    fetchBooks() {
      this.loading = true;
      fetch("http://localhost:8080/books")
        .then((res) => res.json())
        .then((res) => {
          this.books = res;
          this.filteredBooks = res;
        })
        .catch((err) => {
          console.log(err);
          this.error = err;
        });
    },
    searchBook(e) {
      this.filteredBooks = this.books.filter((book) => {
        return (
          book.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
          book.author[0].firstName
            .toLowerCase()
            .includes(e.target.value.toLowerCase()) ||
          book.author[0].lastName
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        );
      });
    },
  },
};
</script>

<style scoped>
h5 {
  color: #aaa;
}
</style>

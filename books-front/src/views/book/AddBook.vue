<template>
  <div class="d-flex vh-100 align-items-center justify-content-center">
    <div class="card radius-3 bg-light p-5 w-75 h-auto">
      <h3 class="text-left mb-4">Dodaj nową książkę</h3>

      <div
        v-if="error && error.message && !success"
        class="alert alert-danger"
        role="alert"
      >
        {{ error.message }}
      </div>

      <div v-if="success" class="alert alert-success mt-3" role="alert">
        Pomyślnie dodano pozycję
      </div>

      <form @submit="submitForm" ref="bookForm" method="post">
        <div class="mb-4">
          <label for="title" class="form-label">Tytuł</label>
          <input
            v-model="title"
            type="text"
            class="form-control"
            id="title"
            placeholder="Tytuł książki"
            required
          />
        </div>

        <div class="mb-4">
          <label for="pages" class="form-label">Liczba stron</label>
          <input
            v-model.number="pages"
            type="number"
            min="0"
            class="form-control"
            id="pages"
          />
        </div>

        <div class="mb-4 w-50 d-flex flex-column">
          <label for="author" class="form-label">Autor</label>
          <select
            id="author-select"
            v-model="selectedAuthor"
            class="w-100 radius-5 form-select"
            required
          >
            <option
              v-for="author of authors"
              :value="author.value"
              v-bind:key="author.value"
            >
              {{ author.text }}
            </option>
          </select>
        </div>

        <div class="text-right">
          <router-link :to="{ name: 'Home' }" class="btn btn-ghost-danger mr-2">
            Cofnij
          </router-link>
          <button class="btn btn-success">Stwórz</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: {},
      title: "",
      success: false,
      pages: 0,
      selectedAuthor: -1,
      authors: [],
    };
  },
  mounted() {
    this.fetchAuthors();
  },
  methods: {
    validatePages(pages) {
      if (pages < 0) {
        this.error = {
          message: "Liczba stron nie może być ujemna",
        };
        return false;
      } else {
        this.error = {};
      }
      return true;
    },
    fetchAuthors() {
      fetch("http://localhost:8080/authors")
        .then((res) => res.json())
        .then((data) => {
          this.authors = data.map(({ id, firstName, lastName }) => {
            return {
              value: id,
              text: `${firstName} ${lastName}`,
            };
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitForm(e) {
      e.preventDefault();

      fetch("http://localhost:8080/books", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: this.title,
          pages: this.pages,
          author: [
            {
              firstName: this.authors
                .find((author) => author.value === this.selectedAuthor)
                .text.split(" ")[0],
              lastName: this.authors
                .find((author) => author.value === this.selectedAuthor)
                .text.split(" ")[1],
            },
          ],
        }),
      })
        .then((res) => res.json())
        .then(() => {
          this.success = true;
          this.error = {};
          this.title = "";
          this.pages = 0;
          this.selectedAuthor = -1;
        })
        .catch((err) => {
          this.error = err;
          console.log(err);
        });
    },
  },
  watch: {
    pages: function (newPages) {
      this.validatePages(newPages);
    },
  },
};
</script>

<style>
#author-select {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  height: 2.25rem;
  padding: 0.375rem 0.5rem;
  color: #495057;
}
</style>

<template>
  <div v-if="book" class="vh-100 d-flex align-items-center">
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <div class="card border-0 shadow-lg h-100">
            <img
              src="https://source.unsplash.com/random/800x600"
              class="card-img-top object-fit-cover"
              alt="Random image"
            />
            <div class="card-body d-flex flex-column justify-content-center">
              <h2 class="card-title text-center mb-4">Informacje o książce</h2>
              <p class="card-text">
                <strong>Autor:</strong> {{ authors[0].firstName }}
                {{ authors[0].lastName }}
              </p>
              <p class="card-text"><strong>Title:</strong> {{ book.title }}</p>
              <p class="card-text"><strong>ID:</strong> {{ book.id }}</p>
              <p class="card-text"><strong>Strony:</strong> {{ book.pages }}</p>
            </div>
            <div class="p-2 d-flex justify-content-end">
              <router-link
                :to="{ name: 'Home' }"
                class="btn btn-ghost-danger mr-2"
              >
                Cofnij
              </router-link>
              <router-link
                :to="{ name: 'EditBook', params: { id: book.id } }"
                class="btn btn-ghost-primary"
                >Edytuj</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      book: null,
      authors: [],
      loading: false,
      error: {},
    };
  },
  mounted() {
    this.fetchBook();
  },
  methods: {
    fetchBook() {
      fetch("http://localhost:8080/books/" + this.$route.params.id)
        .then((res) => res.json())
        .then((data) => {
          this.book = {
            id: data.id,
            title: data.title,
            pages: data.pages,
          };
          this.authors = data.author;
        })
        .catch((err) => {
          this.error = err;
        });
    },
  },
};
</script>

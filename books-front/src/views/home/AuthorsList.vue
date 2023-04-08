<template>
  <div class="d-flex justify-content-between align-items-center">
    <h4 class="m-0">Autorzy</h4>

    <router-link
      :to="{ name: 'AddAuthor' }"
      class="btn btn-outline-success btn-sm rounded-pill"
    >
      <svg
        class="svg-icon"
        style="
          width: 1em;
          height: 1.5em;
          vertical-align: middle;
          overflow: hidden;
        "
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M539.733333 185.6v298.666667h298.666667v55.466666h-298.666667v298.666667h-55.466666v-298.666667h-298.666667v-55.466666h298.666667v-298.666667z"
          fill="#343a40"
        />
      </svg>
    </router-link>
  </div>
  <div class="list-group mt-3">
    <a
      v-bind:key="author.id"
      v-for="author of authors"
      href="#"
      class="list-group-item list-group-item-action"
    >
      <router-link :to="{ name: 'EditAuthor', params: { id: author.id } }">
        {{ author.firstName }} {{ author.lastName }}
      </router-link>
      <span class="float-right" @click="deleteAuthor(author.id)">
        <svg
          class="svg-icon"
          style="
            width: 1em;
            height: 1em;
            vertical-align: middle;
            fill: currentColor;
            overflow: hidden;
          "
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M810.65984 170.65984q18.3296 0 30.49472 12.16512t12.16512 30.49472q0 18.00192-12.32896 30.33088l-268.67712 268.32896 268.67712 268.32896q12.32896 12.32896 12.32896 30.33088 0 18.3296-12.16512 30.49472t-30.49472 12.16512q-18.00192 0-30.33088-12.32896l-268.32896-268.67712-268.32896 268.67712q-12.32896 12.32896-30.33088 12.32896-18.3296 0-30.49472-12.16512t-12.16512-30.49472q0-18.00192 12.32896-30.33088l268.67712-268.32896-268.67712-268.32896q-12.32896-12.32896-12.32896-30.33088 0-18.3296 12.16512-30.49472t30.49472-12.16512q18.00192 0 30.33088 12.32896l268.32896 268.67712 268.32896-268.67712q12.32896-12.32896 30.33088-12.32896z"
          />
        </svg>
      </span>
    </a>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      authors: null,
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      fetch("http://localhost:8080/authors")
        .then((res) => res.json())
        .then((res) => (this.authors = res))
        .catch((err) => console.log(err));
    },
    deleteAuthor(id) {
      fetch("http://localhost:8080/authors/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then(() => {
          this.authors = this.authors.filter((e) => e.id !== id);
          this.message = "Usunięto autora";
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

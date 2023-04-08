<template>
  <div class="d-flex vh-100 align-items-center justify-content-center">
    <div class="card radius-5 bg-light p-5 w-75 h-auto">
      <h3 class="text-left mb-4">Edytuj autora</h3>

      <div
        v-if="error && error.message && !success"
        class="alert alert-warning mt-4 radius-5"
        role="alert"
      >
        {{ error.message }}
      </div>

      <div v-if="success" class="alert alert-success" role="alert">
        Pomyślnie edytowano
      </div>

      <form @submit="submitForm" method="post">
        <div class="mb-4">
          <label for="title" class="form-label">Imię</label>
          <input
            type="text"
            v-model="firstName"
            class="form-control w-75"
            id="firstName"
            placeholder="Imię autora"
            required
          />
        </div>

        <div class="mb-5">
          <label for="title" class="form-label">Nazwisko</label>
          <input
            required
            type="text"
            v-model="lastName"
            class="form-control w-75"
            id="secondName"
            placeholder="Nazwisko autora"
          />
        </div>

        <div class="text-right">
          <router-link :to="{ name: 'Home' }" class="btn btn-ghost-danger mr-2">
            Cofnij
          </router-link>
          <button class="btn btn-success">
            {{ this.loading ? "Czekaj" : "Zapisz" }}
          </button>
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
      success: false,
      loading: false,
      firstName: "",
      lastName: "",
    };
  },
  mounted() {
    this.fetchAuthor();
  },
  methods: {
    fetchAuthor() {
      fetch("http://localhost:8080/authors/" + this.$route.params.id)
        .then((res) => res.json())
        .then((data) => {
          this.firstName = data.firstName;
          this.lastName = data.lastName;
        })
        .catch((err) => console.log(err));
    },
    submitForm(e) {
      e.preventDefault();
      this.loading = true;

      fetch("http://localhost:8080/authors/" + this.$route.params.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: this.firstName,
          lastName: this.lastName,
        }),
      })
        .then((res) => res.json())
        .then(() => {
          this.success = true;
          this.loading = false;
        })
        .catch((err) => {
          this.error = err;
          this.loading = false;
          console.log(err);
        });
    },
  },
};
</script>

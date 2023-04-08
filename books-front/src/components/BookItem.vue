<template>
  <div class="col mb-3">
    <div class="card">
      <div class="card-body d-flex align-items-center">
        <div class="w-50">
          <h5 class="card-title m-0">
            {{ book.title }}
          </h5>
          <p class="card-text m-0">
            {{ book.author[0].firstName + " " + book.author[0].lastName }}
          </p>
        </div>
        <p class="card-text m-0">{{ book.pages }} stron</p>
        <router-link
          :to="{ name: 'Book', params: { id: book.id } }"
          class="btn btn-light ml-auto"
        >
          Sprawdź
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["book"],
};
</script>

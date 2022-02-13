<template>
  <div class="app-container">
    <div class="app-error-page">
      <h2 class="app-error-page__title app__title">Страница не найдена</h2>
      <div class="app-error-page__description">
        Страница устарела, была удалена или не существовала вовсе
      </div>
      <div class="app-error-page__action">
        <button
          @click="$router.push('/sign-up')"
          class="app__btn app__btn--primary"
        >
          На главную
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default class Page404 extends Vue {}
</script>

<style scoped lang="scss">
  .app-error-page {
    text-align: center;

    &__action {
      display: flex;
      justify-content: center;
    }

    &__title {
      margin-bottom: 15px;
    }

    &__description {
      margin-bottom: 15px;
    }
  }
</style>

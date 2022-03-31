<template>
  <div class="app-container">
    <div class="app-error-page">
      <img
        src="../assets/images/placeholders/page-404.svg"
        alt=""
      >
      <h2 class="app-error-page__title app__title">
        {{ $t('page404.titlePage') }}
      </h2>
      <div class="app-error-page__description">
        {{ $t('page404.descriptionPage') }}
      </div>
      <div class="app-error-page__action">
        <button
          class="app__btn app__btn--primary"
          @click="$router.push('/')"
        >
          {{ $t('global.homePageButton') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default class Page404 extends Vue {}
</script>

<style scoped lang="scss"></style>

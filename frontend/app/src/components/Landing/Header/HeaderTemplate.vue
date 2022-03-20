<template>
  <header class="lp-header">
    <div class="lp-header__logo logo">
      GPT-3
    </div>
    <nav class="lp-header__nav">
      <div class="nav__item">
        Home
      </div>
      <div class="nav__item">
        Home
      </div>
      <div class="nav__item">
        Home
      </div>
      <div class="nav__item">
        Home
      </div>
      <div class="nav__item">
        Home
      </div>
    </nav>
    <div class="lp-header__actions">
      <button class="app__btn app__btn--primary" @click="$router.push('/sign-in')">
        {{ $t('global.signInButton') }}
      </button>
      <button class="app__btn app__btn--primary" @click="$router.push('/sign-up')">
        {{ $t('global.signUpButton') }}
      </button>
    </div>
  </header>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({})
export default class HeaderTemplate extends Vue {
}
</script>

<style scoped lang="scss">

</style>

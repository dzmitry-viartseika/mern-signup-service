<template>
  <div class="app-registration">
    <h2 class="app-registration__title">
      Регистрация
    </h2>
    <div class="app-registration__form">
      <input type="text">
      <input type="text">
      <button>Регистрация</button>
    </div>
    <div class="app-registration__footer">
      Уже есть аккаунт?
      <a href="/sign-in">Войти</a>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
// import { Prop } from 'vue-property-decorator';

@Component({ })
export default class SignUp extends Vue {

}
</script>

<style scoped lang="scss">

</style>

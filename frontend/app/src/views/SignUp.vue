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

<script>
export default {
  name: 'SignUp',
};
</script>

<style scoped lang="scss">

</style>
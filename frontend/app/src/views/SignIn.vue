<template>
  <div class="app-login">
    <h2 class="app-login__title">
      Вход в личный кабинет
    </h2>
    <div class="app-login__form">
      <input type="text">
      <a href="/forgot-password">забыли пароль</a>
      <input type="text">
      <button>Войти</button>
    </div>
    <div class="app-login__footer">
      Уже есть аккаунт?
      <a href="/sign-in">Войти</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
};
</script>

<style scoped>

</style>

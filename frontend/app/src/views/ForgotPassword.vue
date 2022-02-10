<template>
  <div class="app-registration">
    <h2 class="app-registration__title">
      Забыли пароль?
    </h2>
    <div class="app-registration__form">
      еmail
      <input type="text">
      <button>Отправить</button>
    </div>
    <div class="app-registration__footer">
      У вас нет аккаунта?
      <a href="/login">Зарегистрировать</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForgotPassword',
};
</script>

<style scoped>

</style>

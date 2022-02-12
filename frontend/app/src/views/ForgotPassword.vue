<template>
  <div class="app-container">
    <div class="app-modal">
      <h2 class="app-modal__title">
        Забыли пароль?
      </h2>
      <div class="app-modal__form">
        еmail
        <input type="text">
        <button>Отправить</button>
      </div>
      <div class="app-modal__footer">
        У вас нет аккаунта?
        <a href="/sign-up">Зарегистрировать</a>
      </div>
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

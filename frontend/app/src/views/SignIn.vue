<template>
  <div class="app-container">
    <div class="app-modal">
      <h2 class="app-modal__title">
        Вход в личный кабинет
      </h2>
      <div class="app-modal__form">
        <a href="/forgot-password">забыли пароль</a>
        <text-input
          :value.sync="userEmail"
          placeholder-text="Введите вашу почту"
          label-text="Почта"
        />
        <text-input
          :value.sync="userPassword"
          label-text="Пароль"
          placeholder-text="Введите ваш пароль"
        />
        <button @click="SignIn">Войти</button>
      </div>
      <div class="app-modal__footer">
        У вас нет аккаунта?
        <a href="/sign-up">Зарегистрировать</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TextInput from '@/components/Elements/TextInput.vue';
import { IAuthResponse } from '@/model/response/IAuthResponse';
import AuthService from '../services/Auth/AuthService';

@Component({
  components: {
    TextInput,
  },
})
export default class SignIn extends Vue {
  userEmail = '';

  userPassword = '';

  async SignIn(): Promise<void> {
    try {
      const response = await AuthService.login(this.userEmail, this.userPassword);
      const { accessToken } = response.data as IAuthResponse;
      localStorage.setItem('token', accessToken);
      this.$router.push('/dashboard');
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="app-container">
    <div class="app-modal">
      <h2 class="app-modal__title">
        Вход в личный кабинет
      </h2>
      <div class="app-modal__form">
        <text-input
          :value.sync="userEmail"
          input-type="email"
          placeholder-text="Введите вашу почту"
          label-text="Почта"
        />
        <div class="app-modal__form-wrapper">
          <a @click.prevent="$router.push('/forgot-password')">забыли пароль</a>
          <text-input
            :value.sync="userPassword"
            label-text="Пароль"
            placeholder-text="Введите ваш пароль"
          />
        </div>
      </div>
      <button class="app__btn app__btn--primary" @click="signIn">Войти</button>
      <div class="app-modal__footer">
        У вас нет аккаунта?
        <a @click.prevent="$router.push('/sign-up')">Зарегистрировать</a>
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

  async signIn(): Promise<void> {
    try {
      const response = await AuthService.login(this.userEmail, this.userPassword);
      const { accessToken } = response.data as IAuthResponse;
      localStorage.setItem('token', accessToken);
      await this.$router.push('/dashboard');
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped>

</style>

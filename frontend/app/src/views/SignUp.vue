<template>
  <div class="app-container">
    <div class="app-modal">
      <h2 class="app-modal__title">
        Регистрация
      </h2>
      <div class="app-modal__form">
        <text-input
          :value.sync="userEmail"
          placeholder-text="Введите вашу почту"
          input-type="email"
          label-text="Почта"
        />
        <text-input
          :value.sync="userPassword"
          label-text="Пароль"
          placeholder-text="Введите ваш пароль"
        />
      </div>
      <button
        class="app__btn app__btn--primary"
        @click="signUp"
      >
        Регистрация
      </button>
      <div class="app-modal__footer">
        Уже есть аккаунт?
        <a class="app-modal__link" @click.prevent="$router.push('/sign-in')">Войти</a>
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
export default class SignUp extends Vue {
  userEmail = '';

  userPassword = '';

  async signUp(): Promise<void> {
    try {
      const response = await AuthService.registration(this.userEmail, this.userPassword);
      const { accessToken } = response.data as IAuthResponse;
      localStorage.setItem('token', accessToken);
      await this.$router.push('/dashboard');
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss"></style>

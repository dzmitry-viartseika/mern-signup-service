<template>
  <div class="app-container">
    <div class="app-registration">
      <h2 class="app-registration__title">
        Регистрация
      </h2>
      <div class="app-registration__form">
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
      </div>
      <button
        class="ub-btn ub-btn_primary"
        @click="signUp"
      >
        Регистрация
      </button>
      <div class="app-registration__footer">
        Уже есть аккаунт?
        <a href="/sign-in">Войти</a>
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
      this.$router.push('/dashboard');
    } catch (e) {
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss">
  .app-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #f9f9f9;
  }

  .app-registration {
    font-family: Uni Neue,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
    font-weight: 400;
    display: flex;
    width: 500px;
    padding: 20px;
    align-items: center;
    justify-content: center;
    margin: auto;
    flex-direction: column;
    background: #fff;

    &__title {
      font-weight: 700;
      font-size: 25px;
      line-height: 125%;
      text-align: center;
      color: #000;
      margin-bottom: 40px;
    }

    &__footer {
      text-align: center;
      font-weight: 500;
      font-size: 14px;
      line-height: 125%;
      color: #2c2c2c;
      min-height: 36px;
      margin-top: 36px;
    }

    &__form {
      margin-bottom: 30px;
    }
  }
</style>

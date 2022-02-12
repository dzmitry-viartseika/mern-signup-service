<template>
  <div class="app-container">
    <div class="app-modal">
      <h2 class="app-modal__title">
        Забыли пароль?
      </h2>
      <div class="app-modal__form">
        <text-input
          :value.sync="userEmail"
          placeholder-text="Введите вашу почту"
          input-type="email"
          label-text="Почта"
        />
      </div>
      <button class="app__btn app__btn--primary" @click="restorePassword">Отправить</button>
      <div class="app-modal__footer">
        У вас нет аккаунта?
        <a @click.prevent="$router.push('/sign-up')">Зарегистрировать</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import AuthService from '@/services/Auth/AuthService';
import { IAuthResponse } from '@/model/response/IAuthResponse';
import TextInput from '../components/Elements/TextInput.vue';

@Component({
  components: {
    TextInput,
  },
})
export default class ForgotPassword extends Vue {
  userEmail = '';

  async restorePassword(): Promise<void> {
    try {
      const response = await AuthService.restorePassword(this.userEmail);
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

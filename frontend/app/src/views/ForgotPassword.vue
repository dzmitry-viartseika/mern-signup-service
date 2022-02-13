<template>
  <div class="app-container">
    <loader-template v-if="isLoader"/>
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
        <a class="app__link" @click.prevent="$router.push('/sign-up')">Зарегистрировать</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import AuthService from '@/services/Auth/AuthService';
import { IAuthResponse } from '@/model/response/IAuthResponse';
import LoaderTemplate from '@/components/Elements/LoaderTemplate.vue';
import TextInput from '../components/Elements/TextInput.vue';

@Component({
  components: {
    TextInput,
    LoaderTemplate,
  },
  metaInfo() {
    return {
      title: 'Authentication - Forgot password',
      meta: [
        {
          name: 'description',
          content: 'Restore your password before you access in App Dashboard',
        },
      ],
    };
  },
})
export default class ForgotPassword extends Vue {
  userEmail = '';

  isLoader = false;

  async restorePassword(): Promise<void> {
    try {
      this.isLoader = true;
      const response = await AuthService.restorePassword(this.userEmail);
      this.isLoader = false;
      const { accessToken } = response.data as IAuthResponse;
      localStorage.setItem('token', accessToken);
      await this.$router.push('/dashboard');
    } catch (e) {
      this.isLoader = false;
      console.log(e);
    }
  }
}
</script>

<style scoped>

</style>

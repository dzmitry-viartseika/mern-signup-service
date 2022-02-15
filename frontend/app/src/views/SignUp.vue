<template>
  <div class="app-container">
    <loader-template v-if="isLoader"/>
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
        <div class="app-modal__form-wrapper">
          <span  @click="isVisiblePassword = !isVisiblePassword">
            <template v-if="isVisiblePassword">
              <svgicon
                name="Eye"
                width="16"
                height="16"
              />
            </template>
            <template v-else>
              <svgicon
                name="Eye-hidden"
                width="16"
                height="16"
              />
            </template>
          </span>
          <text-input
            :value.sync="userPassword"
            label-text="Пароль"
            :input-type="isVisiblePassword ? 'text' : 'password'"
            placeholder-text="Введите ваш пароль"
          />
        </div>
      </div>
      <button
        class="app__btn app__btn--primary"
        @click="signUp"
      >
        Регистрация
      </button>
      <div class="app-modal__footer">
        Уже есть аккаунт?
        <a class="app__link" @click.prevent="$router.push('/sign-in')">
          {{ $t('global.btnLogin') }}
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TextInput from '@/components/Elements/TextInput.vue';
import LoaderTemplate from '@/components/Elements/LoaderTemplate.vue';
import { IAuthResponse } from '@/model/response/IAuthResponse';
// eslint-disable-next-line import/order
import AuthService from '../services/Auth/AuthService';
import '@/assets/icons/Eye';
import '@/assets/icons/Eye-hidden';
import { namespace } from 'vuex-class';
import { IUser } from '@/model/IUser';

const User = namespace('User');

@Component({
  components: {
    TextInput,
    LoaderTemplate,
  },
  metaInfo() {
    return {
      title: 'Authentication - Sign up',
      meta: [
        {
          name: 'description',
          content: 'Sign up to access your App Dashboard',
        },
      ],
    };
  },
})
export default class SignUp extends Vue {
  userEmail = '';

  userPassword = '';

  isVisiblePassword = false;

  isLoader = false;

  @User.Mutation
  public setUser!: () => void

  async signUp(): Promise<void> {
    try {
      this.isLoader = true;
      const response = await AuthService.registration(this.userEmail, this.userPassword);
      this.isLoader = false;
      this.setUser(response.data.user);
      const { accessToken } = response.data as IAuthResponse;
      localStorage.setItem('token', accessToken);
      await this.$router.push('/crm/dashboard');
    } catch (e) {
      this.isLoader = false;
      console.log(e);
    }
  }
}
</script>

<style scoped lang="scss"></style>

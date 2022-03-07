<template>
  <div class="app-container">
    <loader-template v-if="isLoader"/>
    <div class="app-modal">
      <h2 class="app-modal__title">
        Забыли пароль?
      </h2>
      <div class="app-modal__form">
        <div class="form-field">
          <text-input
            :value.sync="userEmail"
            placeholder-text="Введите вашу почту"
            input-type="email"
            label-text="Почта"
            :errorStatus="$validator.errors.has('userEmail')"
          />
          <transition name="fade-el">
            <div
              v-if="$validator.errors.has('userEmail')"
              class="validation"
            >
              {{ $validator.errors.first('userEmail') }}
            </div>
          </transition>
        </div>
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

  validationError = {
    text: '',
    status: true,
  };

  validator = null;

  beforeMount() {
    const dict = {
      en: {
        custom: {
          userEmail: {
            required: 'Введите электронную почту',
            // required: validationErrorMessage.en.inputRequired,
          },
        },
      },
      ru: {
        custom: {
          userEmail: {
            required: 'Введите электронную почту',
            // required: validationErrorMessage.ru.inputRequired,
          },
        },
      },
    };
    this.$validator.localize(dict);
    this.$validator.attach({ name: 'userEmail', rules: { required: true } });
  }

  async restorePassword(): Promise<void> {
    const result = await this.$validator.validateAll({
      userEmail: this.userEmail,
    });

    if (result) {
      try {
        this.isLoader = true;
        const response = await AuthService.restorePassword(this.userEmail);
        this.isLoader = false;
        const { accessToken } = response.data as IAuthResponse;
        localStorage.setItem('token', accessToken);
        await this.$router.push('/sign-in');
      } catch (err) {
        this.isLoader = false;
        if (err.response && (err.response.status === 400
          || err.response.status === 401
          || err.response.status === 404
        )) {
          this.validationError = {
            status: true,
            text: err.response.data.message,
          };
          this.$toasted.show(`${this.validationError.text}`, {
            theme: 'bubble',
            position: 'top-right',
            duration: 3000,
          });
          setTimeout(() => {
            this.validationError = {
              status: false,
              text: '',
            };
          }, 3000);
        }
      }
    }
    try {
      console.log('w');
    } catch (e) {
      this.isLoader = false;
      console.log(e);
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="app-container">
    <loader-template
      v-if="isLoader"
    />
    <div class="app-modal">
      <div class="app-modal__logo">
        <img
          src="../assets/images/logo.png"
          alt="logo"
          @click="$router.push('/')"
        >
      </div>
      <h2 class="app-modal__title">
        {{ $t('forgotPasswordPage.forgotPasswordTitle') }}
      </h2>
      <div class="app-modal__form">
        <div class="form-field">
          <text-input
            :value.sync="userEmail"
            :placeholder-text="$t('signInPage.inputEmailPlaceholder')"
            :label-text="$t('signInPage.email')"
            input-type="email"
            :required="true"
            :autofocus="true"
            :error-status="$validator.errors.has('userEmail')"
          />
          <transition name="fade-el">
            <div
              v-if="$validator.errors.has('userEmail')"
              class="validation validation--input"
            >
              {{ $validator.errors.first('userEmail') }}
            </div>
          </transition>
        </div>
      </div>
      <button
        class="app__btn app__btn--primary"
        @click="restorePassword"
      >
        {{ $t('global.sendButton') }}
      </button>
      <div class="app-modal__footer">
        {{ $t('signInPage.createAccount') }}
        <a
          class="app__link"
          @click.prevent="$router.push('/sign-up')"
        >
          {{ $t('global.signUpButton') }}
        </a>
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
import validationErrorMessage from '../locales/validationErrorMessage';
import { AxiosResponse } from 'axios';

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

  beforeMount(): void {
    const dict = {
      en: {
        custom: {
          userEmail: {
            required: validationErrorMessage.en.inputRequired,
          },
        },
      },
      ru: {
        custom: {
          userEmail: {
            required: validationErrorMessage.ru.inputRequired,
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
        const { data } = await AuthService.restorePassword(this.userEmail) as AxiosResponse;
        this.isLoader = false;
        const { accessToken } = data as IAuthResponse;
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
  }
}
</script>

<style scoped lang="scss">

</style>

<template>
  <div class="app-container">
    <loader-template v-if="isLoader" />
    <div class="app-modal">
      <div class="app-modal__logo">
        <img
          src="../assets/images/logo.png"
          alt=""
          @click="$router.push('/')"
        >
      </div>
      <h2 class="app-modal__title">
        {{ $t('signUpPage.signUpTitle') }}
      </h2>
      <div class="app-modal__form">
        <div class="form-field">
          <text-input
            :value.sync="userEmail"
            :placeholder-text="$t('signInPage.inputEmailPlaceholder')"
            :label-text="$t('signInPage.email')"
            :autofocus="true"
            input-type="email"
            :required="true"
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
        <div class="app-modal__form-wrapper">
          <span @click="isVisiblePassword = !isVisiblePassword">
            <template v-if="!$validator.errors.has('userPassword')">
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
            </template>
          </span>
          <div class="form-field">
            <text-input
              :value.sync="userPassword"
              :error-status="$validator.errors.has('userPassword')"
              :label-text="$t('signInPage.password')"
              :required="true"
              :placeholder-text="$t('signInPage.inputPasswordPlaceholder')"
              :input-type="isVisiblePassword ? 'text' : 'password'"
            />
            <transition name="fade-el">
              <div
                v-if="$validator.errors.has('userPassword')"
                class="validation validation--input"
              >
                {{ $validator.errors.first('userPassword') }}
              </div>
            </transition>
          </div>
        </div>
      </div>
      <div class="app-divider">
        <span class="app-divider__item">
          {{ $t('signInPage.oauthLogin') }}
        </span>
      </div>
      <div class="app-oauth">
        <oauth-google />
      </div>
      <button
        class="app__btn app__btn--primary"
        @click="signUp"
      >
        {{ $t('signUpPage.signUpTitle') }}
      </button>
      <div class="app-modal__footer">
        {{ $t('signUpPage.haveAccount') }}
        <a
          class="app__link"
          @click.prevent="$router.push('/sign-in')"
        >
          {{ $t('global.signInButton') }}
        </a>
      </div>
      <agreement />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TextInput from '@/components/Elements/TextInput.vue';
import LoaderTemplate from '@/components/Elements/LoaderTemplate.vue';
import { IAuthResponse } from '@/model/response/IAuthResponse';
import Agreement from '@/components/Shared/Agreement.vue';
import AuthService from '../services/Auth/AuthService';
import OauthGoogle from '../components/Oauths/OauthGoogle.vue';
import '@/assets/icons/Eye';
import '@/assets/icons/Eye-hidden';
import validationErrorMessage from '../locales/validationErrorMessage';


@Component({
  components: {
    TextInput,
    LoaderTemplate,
    OauthGoogle,
    Agreement,
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
          userPassword: {
            required: validationErrorMessage.en.inputRequired,
          },
        },
      },
      ru: {
        custom: {
          userEmail: {
            required: validationErrorMessage.ru.inputRequired,
          },
          userPassword: {
            required: validationErrorMessage.ru.inputRequired,
          },
        },
      },
    };
    this.$validator.localize(dict);
    this.$validator.attach({ name: 'userEmail', rules: { required: true } });
    this.$validator.attach({ name: 'userPassword', rules: { required: true } });
  }

  async signUp(): Promise<void> {
    const result = await this.$validator.validateAll({
      userEmail: this.userEmail,
      userPassword: this.userPassword,
    });

    if (result) {
      try {
        this.isLoader = true;
        const response = await AuthService.registration(this.userEmail, this.userPassword);
        this.isLoader = false;
        await this.$store.dispatch('setUser', response.data.user);
        const { accessToken } = response.data as IAuthResponse;
        localStorage.setItem('token', accessToken);
        await this.$router.push('/crm/dashboard');
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

<style scoped lang="scss"></style>

<template>
  <div class="app-container">
    <loader-template v-if="isLoader"/>
    <div class="app-modal">
      <div class="app-modal__logo">
        <img @click="$router.push('/')" src="../assets/images/logo.png" alt="logo">
      </div>
      <h2 class="app-modal__title">
        {{ $t('signInPage.signInTitle') }}
      </h2>
      <div class="app-modal__form">
        <div class="form-field">
          <text-input
            :value.sync="userEmail"
            :errorStatus="$validator.errors.has('userEmail')"
            input-type="email"
            :placeholder-text="$t('signInPage.inputEmailPlaceholder')"
            :label-text="$t('signInPage.email')"
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
          <a class="app__link" @click.prevent="$router.push('/forgot-password')">
            {{ $t('signInPage.forgotPasswordText') }}
          </a>
          <span  @click="isVisiblePassword = !isVisiblePassword">
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
          <text-input
            :value.sync="userPassword"
            :input-type="isVisiblePassword ? 'text' : 'password'"
            :label-text="$t('signInPage.password')"
            :placeholder-text="$t('signInPage.inputPasswordPlaceholder')"
            :errorStatus="$validator.errors.has('userPassword')"
          />
          <transition name="fade-el">
          <div
            v-if="$validator.errors.has('userPassword')"
            class="validation validation--input"
          >
            {{ $validator.errors.first('userPassword') }}
          </div>
          </transition>
          <transition name="fade-el">
            <div
              v-show="validationError.status"
              class="validation validation--input"
            >
              {{ validationError.text }}
            </div>
          </transition>
        </div>
        <checkbox
          name="remember-me"
          :value="isRememberMe"
          :label="$t('signInPage.rememberMe')"
          v-model="isRememberMe"
          id="remember-me"
        />
      </div>
      <div class="app-divider">
        <span class="app-divider__item">
          {{ $t('signInPage.oauthLogin') }}
        </span>
      </div>
      <div class="app-oauth">
        <oauth-google />
      </div>
      <div class="app-actions">
        <button class="app__btn app__btn--primary" @click="signIn">
          {{ $t('global.signInButton') }}
        </button>
      </div>
      <div>
      <div class="app-modal__footer">
        {{ $t('signInPage.createAccount') }}
        <a class="app__link" @click.prevent="$router.push('/sign-up')">
          {{ $t('signUpPage.signUpTitle') }}
        </a>
      </div>
        <div class="app-modal__agreement">
          {{ $t('signUpPage.agreementRulesAccept') }}
          <span class="app-modal__agreement-link"
                @click="$router.push('/terms')"
          >
            {{ $t('signUpPage.termsOfService') }}</span>.
          {{ $t('signUpPage.learnMore') }}
          <span
            class="app-modal__agreement-link"
            @click="$router.push('/privacy')"
          >{{ $t('signUpPage.privacyPolicy') }}
          </span> {{ $t('signUpPage.protectData') }}.
        </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TextInput from '@/components/Elements/TextInput.vue';
import Checkbox from '@/components/Elements/Checkbox.vue';
import { IAuthResponse } from '@/model/response/IAuthResponse';
import LoaderTemplate from '@/components/Elements/LoaderTemplate.vue';
import AuthService from '../services/Auth/AuthService';
import OauthGoogle from '../components/Oauths/OauthGoogle.vue';
import validationErrorMessage from '../locales/validationErrorMessage';
import '@/assets/icons/Eye';
import '@/assets/icons/Eye-hidden';

// TODO ENV link remove
// https://stackoverflow.com/questions/49579028/adding-an-env-file-to-react-project
@Component({
  components: {
    TextInput,
    LoaderTemplate,
    OauthGoogle,
    Checkbox,
  },
  metaInfo() {
    return {
      title: 'Authentication - Sign in',
      meta: [
        {
          name: 'description',
          content: 'Sign in to access your App Dashboard',
        },
      ],
    };
  },
})
export default class SignIn extends Vue {

  userEmail = '';

  userPassword = '';

  isRememberMe = false;

  isLoader = false;

  isVisiblePassword = false;

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

  async signIn(): Promise<void> {
    const result = await this.$validator.validateAll({
      userEmail: this.userEmail,
      userPassword: this.userPassword,
    });

    if (result) {
      try {
        this.isLoader = true;
        const response = await AuthService.login(this.userEmail, this.userPassword);
        this.isLoader = false;
        await this.$store.dispatch('setUser', response.data.user);
        const { accessToken } = response.data as IAuthResponse;
        localStorage.setItem('token', accessToken);
        await this.$router.push({
          name: 'Dashboard',
        });
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

<style lang="scss">
@import "../assets/scss/variables";

</style>

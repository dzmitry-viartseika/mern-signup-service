<template>
  <div class="app-container">
    <loader-template v-if="isLoader"/>
    <div class="app-modal">
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
              class="validation"
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
            class="validation"
          >
            {{ $validator.errors.first('userPassword') }}
          </div>
          </transition>
          <transition name="fade-el">
            <div
              v-show="validationError.status"
              class="validation"
            >
              {{ validationError.text }}
            </div>
          </transition>
        </div>
      </div>
      <div class="app-divider">
        <span class="app-divider__item">
          {{ $t('signInPage.oauthLogin') }}
        </span>
      </div>
      <div class="app-oauth">
        <oauth-google />
        <oauth-github />
      </div>
      <div class="app-actions">
        <button class="app__btn app__btn--primary" @click="signIn">
          {{ $t('signInPage.signInTitle') }}
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
          {{ $t('signUpPage.agreementRules') }}
          <div>{{ $t('signUpPage.membership') }} *</div>
        </div>
    </div>
  </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import TextInput from '@/components/Elements/TextInput.vue';
import { IAuthResponse } from '@/model/response/IAuthResponse';
import LoaderTemplate from '@/components/Elements/LoaderTemplate.vue';
import { namespace } from 'vuex-class';
import axios from 'axios';
import AuthService from '../services/Auth/AuthService';
import OauthGoogle from '../components/Oauths/OauthGoogle.vue';
import OauthGithub from '../components/Oauths/OauthGithub.vue';
import validationErrorMessage from '../locales/validationErrorMessage';
import '@/assets/icons/Eye';
import '@/assets/icons/Eye-hidden';

const User = namespace('User');
// TODO ENV link remove
// https://stackoverflow.com/questions/49579028/adding-an-env-file-to-react-project
@Component({
  components: {
    TextInput,
    LoaderTemplate,
    OauthGoogle,
    OauthGithub,
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
  @User.State
  private user: string;

  @User.Mutation
  public setUser!: () => void

  userEmail = '';

  userPassword = '';

  isLoader = false;

  isVisiblePassword = false;

  validationError = {
    text: '',
    status: true,
  };

  validator = null;

  async test() {
    fetch('http://localhost:5000/auth/login/success', {
      method: 'GET',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true,
      },
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        throw new Error('authentication has been failed!');
      })
      .then((resObject) => {
        this.setUser(resObject.user);
        console.log('resObject.user', resObject.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  created() {
    console.log(this);
    const token = new URLSearchParams(window.location.search).get(
      'access_token',
    );

    console.log('token', token);

    axios
      .get('http://localhost:8010/proxy/user', {
        headers: {
          Authorization: `token ${token}`,
        },
      })
      .then((res) => {
        console.log('res', res);
      })
      .catch((error) => {
        console.log(`error ${error}`);
      });
  }

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
        this.setUser(response.data.user);
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

<style lang="scss">
@import "../assets/scss/variables";
  .app-divider {
    display: flex;
    align-items: center;
    width: 300px;
    margin: 20px 0;

    &__item {
      font-size: 14px;
      line-height: 16px;
      font-weight: normal;
      color: rgb(93, 108, 116);
      text-align: center;
      min-width: 70px;
      max-width: 100px;
      width: 100%;
    }

    &:after {
      content: "";
      flex: 0 1 100%;
      border-bottom: 1px solid rgb(184, 196, 194);
      margin: 0 10px;
      transform: translateY(-50%);
    }

    &:before {
      content: "";
      flex: 0 1 100%;
      border-bottom: 1px solid rgb(184, 196, 194);
      margin: 0 10px;
      transform: translateY(-50%);
    }
  }

  .app-oauth {
    margin-bottom: 20px;

    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
    a + a {
      margin-left: 10px;
    }
  }

  .app-actions {
    display: flex;
    justify-content: center;
  }

  .app-modal__agreement {
    text-align: center;
    font-size: 12px;

    div {
      margin-top: 5px;
      font-weight: bold;
      color: $color-dodger-blue;
      cursor: pointer;
      transition: color .15s ease-in;
      &:hover {
        color: $color-cornflower-blue;
      }
    }
  }
</style>

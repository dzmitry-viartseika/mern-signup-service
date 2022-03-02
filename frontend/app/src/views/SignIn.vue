<template>
  <div class="app-container">
    <loader-template v-if="isLoader"/>
    <div class="app-modal">
      <h2 class="app-modal__title">
        Вход в личный кабинет
      </h2>
      <div class="app-modal__form">
        <div class="form-field">
          <text-input
            :value.sync="userEmail"
            :errorStatus="$validator.errors.has('userEmail')"
            input-type="email"
            placeholder-text="Введите вашу почту"
            label-text="Почта"
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
          <a class="app__link" @click.prevent="$router.push('/forgot-password')">забыли пароль</a>
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
        </div>
      </div>
      <div>
        Oauth
<!--        <img-->
<!--          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"-->
<!--        >-->
        <a
          href="https://github.com/login/oauth/authorize?client_id=6e66afee8531e62fa36a&redirect_uri=http://localhost:8080/oauth/redirect"
        >
          Sign in
        </a>
        Google
        <br>
        <div class="g-signin2" data-onsuccess="GOOGLE SIGN IN"></div>
      </div>
      <button class="app__btn app__btn--primary" @click="signIn">Войти</button>
      <div class="app-modal__footer">
        У вас нет аккаунта?
        <a class="app__link" @click.prevent="$router.push('/sign-up')">Зарегистрировать</a>
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
import '@/assets/icons/Eye';
import '@/assets/icons/Eye-hidden';

const User = namespace('User');
// TODO ENV link remove
// https://stackoverflow.com/questions/49579028/adding-an-env-file-to-react-project
@Component({
  components: {
    TextInput,
    LoaderTemplate,
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

  validationError: {
    text: '',
    status: false,
  };

  validator: null;

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
            required: 'werewt',
            // required: validationErrorMessage.en.inputRequired,
          },
          userPassword: {
            required: 'werewt',
            // required: validationErrorMessage.en.inputRequired,
          },
        },
      },
      ru: {
        custom: {
          userEmail: {
            required: 'werewt',
            // required: validationErrorMessage.ru.inputRequired,
          },
          userPassword: {
            required: 'werewt',
            // required: validationErrorMessage.ru.inputRequired,
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
        console.log('www');
        this.isLoader = true;
        const response = await AuthService.login(this.userEmail, this.userPassword);
        console.log('response', response);
        this.isLoader = false;
        this.setUser(response.data.user);
        const { accessToken } = response.data as IAuthResponse;
        localStorage.setItem('token', accessToken);
        await this.$router.push('/crm/dashboard');
      } catch (err) {
        console.log('statusCode', err.response.status);
        this.isLoader = false;
        if (err.response && (err.response.status === 400
          || err.response.status === 401
          || err.response.status === 404
        )) {
          console.log('err.response', err.response);
          this.validationError = {
            status: true,
            text: 'validationErrorvalidationError',
            // text: err.response.data.message,
            // text: this.$t('loginPage.loginForm.loginValidation'),
          };
          console.log('validationError', this.validationError);
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

<style scoped>

</style>

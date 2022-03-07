<template>
  <div class="app-container">
    <loader-template v-if="isLoader"/>
    <div class="app-modal">
      <h2 class="app-modal__title">
        Регистрация
      </h2>
      <div class="app-modal__form">
        <div class="form-field">
          <text-input
            :value.sync="userEmail"
            placeholder-text="Введите вашу почту"
            input-type="email"
            :errorStatus="$validator.errors.has('userEmail')"
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
          <div class="form-field">
            <text-input
              :value.sync="userPassword"
              :errorStatus="$validator.errors.has('userPassword')"
              label-text="Пароль"
              :input-type="isVisiblePassword ? 'text' : 'password'"
              placeholder-text="Введите ваш пароль"
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

  validationError = {
    text: '',
    status: true,
  };

  validator = null;

  @User.Mutation
  public setUser!: () => void;

  beforeMount() {
    const dict = {
      en: {
        custom: {
          userEmail: {
            required: 'Введите электронную почту',
            // required: validationErrorMessage.en.inputRequired,
          },
          userPassword: {
            required: 'Введите пароль',
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
          userPassword: {
            required: 'Введите пароль',
            // required: validationErrorMessage.ru.inputRequired,
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

<style scoped lang="scss"></style>

<template>
  <div class="app-container">
    <loader-template v-if="isLoader"/>
    <div class="app-modal">
      <h2 class="app-modal__title">
        {{ $t('resetPasswordPage.resetPasswordTitle') }}
      </h2>
      <div class="app-modal__form">
        <div class="form-field">
          <text-input
            :value.sync="userEmail"
            :placeholder-text="$t('resetPasswordPage.inputEmailPlaceholder')"
            :label-text="$t('resetPasswordPage.oldEmailAddress')"
            input-type="email"
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
          <text-input
            :value.sync="userPassword"
            :input-type="isVisiblePassword ? 'text' : 'password'"
            :label-text="$t('resetPasswordPage.newPassword')"
            :placeholder-text="$t('resetPasswordPage.inputNewPasswordPlaceholder')"
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
      <button class="app__btn app__btn--primary" @click="restorePassword">
        {{ $t('global.sendButton') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import validationErrorMessage from '@/locales/validationErrorMessage';
import LoaderTemplate from '@/components/Elements/LoaderTemplate.vue';
import AuthService from '@/services/Auth/AuthService';
import { IAuthResponse } from '@/model/response/IAuthResponse';
import TextInput from '../components/Elements/TextInput.vue';
import '@/assets/icons/Eye';
import '@/assets/icons/Eye-hidden';

@Component({
  components: {
    LoaderTemplate,
    TextInput,
  },
  metaInfo() {
    return {
      title: 'Authentication - Reset password',
      meta: [
        {
          name: 'description',
          content: 'Reset your password before you access in App Dashboard',
        },
      ],
    };
  },
})
export default class ForgotPassword extends Vue {
  userEmail = '';

  userPassword = '';

  isLoader = false;

  isVisiblePassword = false;

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

  async restorePassword(): Promise<void> {
    const result = await this.$validator.validateAll({
      userEmail: this.userEmail,
      userPassword: this.userPassword,
    });

    if (result) {
      try {
        this.isLoader = true;
        const { data } = await AuthService.changePassword(this.userEmail, this.userPassword);
        this.isLoader = false;
        const { accessToken } = data as IAuthResponse;
        localStorage.setItem('token', accessToken);
        await this.$router.push('/crm/dashboard');
      } catch (err) {
        this.isLoader = false;
        console.error(err);
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>

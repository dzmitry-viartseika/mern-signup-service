<template>
  <div class="app-container">
    <loader-template v-if="isLoader"/>
    <div class="app-modal">
      <h2 class="app-modal__title">
        {{ $t('resetPasswordPage.resetPasswordTitle') }}
      </h2>
      <div class="app-modal__form">
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
            :label-text="$t('signInPage.password')"
            :placeholder-text="$t('signInPage.inputPasswordPlaceholder')"
          />
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
  userPassword = '';

  isLoader = false;

  isVisiblePassword = false;

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

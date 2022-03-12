<template>
  <div class="lp">
    <div class="lp__container" v-if="false">
      <header-template />
    </div>
    <button class="app__btn app__btn--primary" @click="$router.push('/sign-in')">
      {{ $t('global.signInButton') }}
    </button>
    <dropDown
      :dropdownOptions="dropdownOptions"
      :customClass="'ub-dropdown_landing'"
      :arrowAlt="true"
      @changeDropdown="changeLanguage"
    />
    <modal-template
      v-if="!isAgreePolicy"
      position='bottom'
      width="100%"
    >
      <div slot="content" class="app-modal__content">
        {{ $t('modalsTextContent.cookies') }}
        <button
          class="app__btn app__btn--primary"
          @click="agreePolicy"
        >
          {{ $t('global.agreeButton') }}
        </button>
      </div>
    </modal-template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ModalTemplate from '@/components/Modals/ModalTemplate.vue';
import DropDown from '@/components/Elements/DropDown.vue';
import HeaderTemplate from '@/components/Landing/Header/HeaderTemplate.vue';

@Component({
  components: {
    ModalTemplate,
    DropDown,
    HeaderTemplate,
  },
})
export default class LandingPage extends Vue {
  isAgreePolicy: boolean | null = null;

  get language(): string {
    return this.$i18n.locale;
  }

  set language(data: string) {
    this.$i18n.locale = data;
  }

  get dropdownOptions() {
    return {
      list: [
        {
          code: 'ru',
          text: 'Russian',
        },
        {
          code: 'en',
          text: 'English',
        },
      ],
      value: this.language,
    };
  }

  agreePolicy(): void {
    this.isAgreePolicy = !this.isAgreePolicy;
    localStorage.setItem('isAgreePolicy', 'true');
  }

  changeLanguage(code: string) {
    this.language = code;
    localStorage.setItem('language', code);
  }

  created() {
    this.language = localStorage.getItem('language') || this.$i18n.locale;
    this.isAgreePolicy = !!(localStorage.getItem('isAgreePolicy') || '');
  }
}
</script>

<style scoped lang="scss">

</style>

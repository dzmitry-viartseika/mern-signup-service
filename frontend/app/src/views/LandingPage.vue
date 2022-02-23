<template>
  <div>
    <button class="app__btn app__btn--primary" @click="$router.push('/sign-in')">
      {{ $t('global.btnLogin') }}
    </button>
    <dropDown
      :dropdownOptions="dropdownOptions"
      :customClass="'ub-dropdown_landing'"
      :arrowAlt="true"
      @changeDropdown="changeLanguage"
    />
    <modal-template
      v-if="!isAgreePolicy"
    >
      <div slot="content" class="app-modal__content">
        Мы используем файлы cookie, чтобы обеспечивать правильную работу нашего веб-сайта,
        персонализировать рекламные объявления и другие материалы, обеспечивать работу функций
        социальных сетей и анализировать сетевой трафик. Мы также предоставляем информацию об
        использовании вами нашего веб-сайта своим партнерам по социальным сетям, рекламе и
        аналитическим системам.
        <button
          class="app__btn app__btn--primary"
          @click="agreePolicy"
        >Согласен</button>
      </div>
    </modal-template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import ModalTemplate from '@/components/Modals/ModalTemplate.vue';
import DropDown from '@/components/Elements/DropDown.vue';

@Component({
  components: {
    ModalTemplate,
    DropDown,
  },
})
export default class LandingPage extends Vue {
  isAgreePolicy: boolean | null = null;

  get language(): string {
    console.log('this.$i18n.locale', this.$i18n.locale);
    return this.$i18n.locale;
  }

  set language(data: string) {
    this.$i18n.locale = data;
  }

  get dropdownOptions() {
    console.log('this', this);
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
    console.log('this', this);
    localStorage.setItem('language', code);
  }

  created() {
    this.language = localStorage.getItem('language') || this.$i18n.locale;
    this.isAgreePolicy = !!(localStorage.getItem('isAgreePolicy') || '');
  }
}
</script>

<style scoped>

</style>

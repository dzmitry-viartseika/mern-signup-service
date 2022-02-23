<template>
  <div>
    <button class="app__btn app__btn--primary" @click="$router.push('/sign-in')">Sign IN</button>
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

@Component({
  components: {
    ModalTemplate,
  },
})
export default class LandingPage extends Vue {
  isAgreePolicy: boolean | null = null;

  agreePolicy(): void {
    this.isAgreePolicy = !this.isAgreePolicy;
    localStorage.setItem('isAgreePolicy', 'true');
  }
}
</script>

<style scoped>

</style>

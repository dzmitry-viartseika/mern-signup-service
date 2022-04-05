<template>
  <div class="app-privacy">
    <div class="app-privacy__logo">
      <img
        src="../assets/images/logo.png"
        alt=""
        @click="$router.push('/')"
      >
    </div>
    <section class="app-privacy__content">
      <button
        class="app__btn app__btn--primary"
        @click="$router.back()"
      >
        {{ $t('global.back') }}
      </button>
      <h2>
        {{ $t('privacyPage.title') }}
      </h2>

      <div>
        {{ $t('privacyPage.information1') }}
      </div>

      <h2>
        {{ $t('privacyPage.title1') }}
      </h2>
      <div>
        {{ $t('privacyPage.information2') }}
      </div>
      <a
        class="app__link app__link--mt"
        @click.prevent="$router.push('/terms')"
      >
        {{ $t('links.cookiePolicy') }}
      </a>
    </section>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';

@Component({
  metaInfo() {
    return {
      title: 'Privacy',
      meta: [
        {
          name: 'description',
          content: 'Privacy',
        },
      ],
    };
  },
})
export default class Privacy extends Vue {}
</script>

<style scoped lang="scss">
  .app-privacy {
  padding: 20px;

  &__logo {
    display: flex;
    justify-content: center;

    img {
      width: 80px;
      height: 80px;
    }
  }

  &__content {
    margin-top: 20px;

    ul {
      padding-left: 30px;
    }

    h3, h2 {
      margin: 10px 0;
    }

    p + p {
      margin-bottom: 15px;
    }
  }
}
</style>

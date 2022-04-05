<template>
  <div class="app-terms">
    <div class="app-terms__logo">
      <img
        src="../assets/images/logo.png"
        alt=""
        @click="$router.push('/')"
      >
    </div>
    <section class="app-terms__content">
      <button
        class="app__btn app__btn--primary"
        @click="$router.back()"
      >
        {{ $t('global.back') }}
      </button>
      <h2>
        {{ $t('termsPage.title') }}
      </h2>

      <p>
        {{ $t('termsPage.information') }}
      </p>

      <p>
        {{ $t('termsPage.information1') }}
      </p>

      <p>
        {{ $t('termsPage.information2') }}
      </p>

      <p>
        {{ $t('termsPage.information3') }}
      </p>

      <h2>{{ $t('termsPage.title1') }}</h2>

      <p>
        {{ $t('termsPage.information4') }} <a href="mailto:support@app.org">support@app.org</a>
      </p>
      <a
        class="app__link app__link--mt"
        @click.prevent="$router.push('/privacy')"
      >
        {{ $t('links.privacyPolicy') }}
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
      title: 'Terms',
      meta: [
        {
          name: 'description',
          content: 'Terms',
        },
      ],
    };
  },
})
export default class Terms extends Vue {}
</script>

<style scoped lang="scss">
  .app-terms {
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

      a + a {
        margin-top: 15px;
        display: block;
      }
    }
  }
</style>

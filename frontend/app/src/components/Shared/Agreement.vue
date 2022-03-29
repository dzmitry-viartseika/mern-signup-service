<template>
  <div class="app__agreement">
    {{ $t('signUpPage.agreementRulesAccept') }}
    <span class="app__agreement-link"
          @click="$router.push('/terms')"
    >
            {{ $t('signUpPage.termsOfService') }}</span>.
    {{ $t('signUpPage.learnMore') }}
    <span
      class="app__agreement-link"
      @click="$router.push('/privacy')"
    >{{ $t('signUpPage.privacyPolicy') }}
          </span> {{ $t('signUpPage.protectData') }}.
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component({})
export default class Agreement extends Vue {}
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

  .app {
    &__agreement {
      text-align: center;
      font-size: 12px;
      max-width: 330px;

      &-link {
        color: $color-denim;
        font-weight: 600;
        transition: color .15s ease-in;
        cursor: pointer;

        &:hover {
          color: rgba($color-denim, .6);
        }
      }

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
  }
</style>

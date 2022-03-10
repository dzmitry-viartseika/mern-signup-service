<template>
  <a href="http://localhost:5000/auth/google" target="_self" class="btn red darken-1">
    <img src="../../assets/images/sign-in-with-google.svg" alt="google" title="Google">
  </a>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class OauthGoogle extends Vue {}
</script>

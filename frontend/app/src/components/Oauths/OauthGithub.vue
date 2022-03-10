<template>
  <a href="http://localhost:5000/auth/github" target="_self" class="btn red darken-1">
    <img src="../../assets/images/iconmonstr-github-1.svg" alt="Github" title="Github">
  </a>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class OauthGithub extends Vue {}
</script>

<template>
  <div class="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.$router.push('/sign-up');
    } else {
      this.$router.push('/dashboard');
    }
  },
};
</script>

<style lang="scss">
@import "assets/scss/core";
</style>

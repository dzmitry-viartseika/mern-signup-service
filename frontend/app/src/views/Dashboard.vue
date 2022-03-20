<template>
  <div class="app-dashboard">
    Dashboard
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';
import UsersService from "@/services/Users/UsersService";

@Component({
  metaInfo() {
    return {
      title: 'Dashboard',
      meta: [
        {
          name: 'description',
          content: 'App Dashboard',
        },
      ],
    };
  },
})
export default class Dashboard extends Vue {

  async created() {
    try {
      const response = await UsersService.success();
      console.log('response', response.data);
      // this.userName = response.data.user.displayName;
      // this.avatar = response.data.user.photos[0].value;
      // this.email = response.data.user.emails[0].value;
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped lang="scss">

</style>

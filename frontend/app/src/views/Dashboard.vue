<template>
  <div class="app-dashboard">
    Dashboard
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';
import { namespace } from 'vuex-class';
import UsersService from "@/services/Users/UsersService";

const User = namespace('User');

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
      const response = await UsersService.getCurrentUser();
      console.log('response.data', response.data);
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped lang="scss">

</style>

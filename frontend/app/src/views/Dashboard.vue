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
 @User.Mutation
 public setUser!: () => void;

 created() {
   console.log(this);
   console.log('Dashboard');
 }
}
</script>

<style scoped lang="scss">

</style>

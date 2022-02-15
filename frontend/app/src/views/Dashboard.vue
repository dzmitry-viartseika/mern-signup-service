<template>
  <div class="app-dashboard">
    <main>
      <h1>My Dashboard</h1>
      <p class="text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur animi voluptatibus cum
        maxime distinctio
        iste quod deleniti eius, autem voluptates cumque suscipit iure quasi eligendi ullam.
        Sapiente eligendi porro
        reprehenderit corrupti error facilis quo, fugiat fugit? Maiores aliquam ad, molestiae iste
        nihil, commodi
        doloremque tempore excepturi aut id ducimus unde?
      </p>
      <p class="copyright">
        &copy; 2021 - <span>Aqumex</span> All Rights Reserved.
      </p>
    </main>
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
}
</script>

<style scoped lang="scss">

</style>

<template>
  <div class="container">
    <!-- Sidebar -->
    <aside class="container__sidebar">
      ...
    </aside>

    <!-- Main -->
    <main class="container__main">
      ...
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

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
}
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.container__sidebar {
  width: 10%;
  max-width: 350px;
}

.container__main {
  /* Take the remaining width */
  flex: 1;

  /* Make it scrollable */
  overflow: auto;
}
</style>

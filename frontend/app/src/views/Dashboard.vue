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

<script>
export default {
  name: 'Dashboard',
};
</script>

<style scoped>
.container {
  display: flex;
  height: 100vh;
}

.container__sidebar {
  width: 10%;
  max-width: 350px;
  background: green;
}

.container__main {
  /* Take the remaining width */
  flex: 1;

  /* Make it scrollable */
  overflow: auto;
}
</style>

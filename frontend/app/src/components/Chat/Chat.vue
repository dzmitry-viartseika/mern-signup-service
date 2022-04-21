<template>
  <div class="app-chat">
    Chat
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';

@Component({})
export default class Chat extends Vue {
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

  .app-chat {
    position: fixed;
    right: 25px;
    bottom: 25px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: #0F57DD;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-white;
  }

</style>

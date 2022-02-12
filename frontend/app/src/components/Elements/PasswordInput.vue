<template>
  <div class="app-password-eye">
    <span v-if="isVisiblePassword"
          @click="toggleIcon(true)">1</span>
    <span v-else @click="toggleIcon(false)">2</span>
  </div>
</template>

<script lang="ts">
import { Prop, Vue } from 'vue-property-decorator';

export default class PasswordInput extends Vue {
  @Prop({ required: true })
  isVisiblePassword = false;

  toggleIcon(data: boolean): void {
    this.$emit('update:isVisiblePassword', data);
  }
}
</script>

<style scoped>

</style>

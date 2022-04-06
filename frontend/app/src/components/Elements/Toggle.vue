<template>
  <div class="app-toggle">
    <label class="switch">
      <input
        v-model="toggleValue"
        type="checkbox"
        @click="toggleCheckbox"
      >
      <div class="slider round" />
    </label>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({})
export default class Toggle extends Vue {
  @Prop({ required: false, type: String })
  text;

  @Prop({ required: true, type: Boolean })
  value;

  get toggleValue(): boolean {
    return this.value;
  }

  set toggleValue(data: boolean) {
    this.$emit('setToggleVal', data);
  }

  toggleCheckbox(): void {
    this.toggleValue = !this.toggleValue;
    this.$emit('setToggleVal', this.toggleValue);
  }
}
</script>

<style scoped>

</style>

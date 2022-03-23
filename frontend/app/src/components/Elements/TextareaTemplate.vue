<template>
  <div class="app-textarea">
    <label for="">
      {{ label }}
    </label>
    <textarea
      cols="30"
      rows="5"
      autofocus
      v-model="textAreaValue"/>
    maxLenght={{ maxLenght }}
  </div>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({})
export default class TextareaTemplate extends Vue {
  @Prop({ required: false, type: String })
  value: string;

  @Prop({ required: true, type: String })
  label: string;

  @Prop({ required: true, type: Number })
  maxLenght: number;

  get textAreaValue() {
    return this.value;
  }

  set textAreaValue(data) {
    this.$emit('update:value', data);
  }

  input(event): void {
    this.textAreaValue = event.target.value;
    // this.$emit('update:value', event.target.value);
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/scss/variables";

</style>

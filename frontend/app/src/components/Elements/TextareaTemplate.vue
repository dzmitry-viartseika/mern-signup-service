<template>
  <div class="app-textarea">
    <label class="app-textarea__label">
      {{ label }}
    </label>
    <textarea
      class="app-textarea__input"
      cols="30"
      rows="5"
      :placeholder="placeholder"
      v-model="textAreaValue"/>
    <p class='text-right text-small'>{{ maxLenght }}</p>
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

  @Prop({ required: false, type: String })
  placeholder: string;

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
  .app-textarea {
    &__label {
      display: inline-flex;
      margin-bottom: 4px;
      color: #A9A9A9;
      font: 10px Ubuntu-medium, sans-serif;
      line-height: 1.55;
    }

    &__input {
      width: 100%;
      border: 1px solid #EEEEEE;
      border-radius: 4px;
      padding: 12px;
      resize: none;
      font: 14px Ubuntu, sans-serif;
      line-height: 1.42;
      transition: border-color .15s ease-in;
      &:focus {
        border-color: #276EF1;
      }
    }
  }
</style>

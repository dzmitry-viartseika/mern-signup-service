<template>
  <div class="app-checkbox" v-bind:class="{ inverted: inverted }">
    <input type="checkbox"
           :name="name"
           :class="className"
           :id="id"
           :value="value"
           :checked="checked"
           :required="required"
           @change="updateInput"
           v-model="statusCheckbox"
    >
    <label v-bind:for="id">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import '@/assets/icons/Caution-sign';

@Component({})
export default class Checkbox extends Vue {
  @Prop({ required: false, type: String })
  name: string;

  @Prop({ required: false, type: String })
  className: string;

  @Prop({ required: false, type: String })
  id: string;

  @Prop({ required: false, type: Boolean })
  value: boolean;

  @Prop({ required: false, type: Boolean })
  required: boolean = false;

  @Prop({ required: false, type: Boolean })
  checked: boolean = false;

  @Prop({ required: false, type: Boolean })
  inverted: boolean = false;

  @Prop({ required: true, type: String })
  label: string;

  get statusCheckbox(): boolean {
    return  this.value;
  }

  set statusCheckbox(data) {
    console.log('data', data);
    this.$emit('update:value', data);
    this.$emit('changeCheckBox', event.target.checked);
  }

  updateInput(event): void {
    this.$emit('input', event.target.checked);
  }

  created() {
    console.log('isVisibleWeekends', this.value);
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";
.app-checkbox {
  padding-top: 10px;
  display: flex;
  align-items: center;

  input[type=checkbox], input[type=radio], label {
    user-select: none;
    padding-left: 5px;
    font-size: 14px;
  }

  input[type=checkbox], input[type=radio] {
    position: relative;
    border: 1px solid $color-dodger-blue;
    margin: 0 0.2em 0 0;
    padding: 0;
    text-align: center;
    width: 16px;
    height: 16px;
    background: $color-white;
    -webkit-appearance: none;
    -webkit-border-radius: 0;
    border-radius: 0;
    color: rgba( $color-white, 0);
    transition: all 0.2s ease;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &:before {
      content: "✔";
      font-size: 10px;
      position: absolute;
      top: 0;
      left: 3px;
    }

    &:focus {
      outline: 0;
      border: 1px solid darken($color-dodger-blue, 5%);
    }

    &:active {
      outline: none;
    }

    &:hover {
      outline: none;
    }

    &:checked {
      background: $color-dodger-blue;
      color: rgba($color-white, 1);
    }
  }

  &.inverted {
    input[type=checkbox], input[type=radio] {
      border: 1px solid $color-black;

      &:focus {
        border: 1px solid darken($color-black, 5%);
      }

      &:checked {
        background: $color-black;
      }
    }
  }
}

</style>

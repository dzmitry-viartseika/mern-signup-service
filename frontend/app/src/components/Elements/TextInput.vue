<template>
  <div
    class="text-field"
    :class="{'text-field--validation': errorStatus}"
  >
    <label
      class="text-field__label"
      :class="{'validation--required': required}"
    >
      {{ labelText }}
    </label>
    <div class="text-field-wrapper">
      <input
        ref="inputRef"
        data-test="input"
        :type="inputType"
        class="text-field__input"
        :value="value"
        :placeholder="placeholderText"
        :autofocus="autofocus"
        :disabled="disabled"
        @input="$emit('update:value', $event.target.value)"
      >
      <i
        v-if="errorStatus"
        class="text-field__validation"
      >
        <svgicon
          name="Caution-sign"
          width="32"
          height="32"
        />
      </i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import '@/assets/icons/Caution-sign';

@Component({})
export default class TextInput extends Vue {
  @Prop({ required: false, type: String })
  labelText: string;

  @Prop({ type: String, required: true })
  value: string;

  @Prop({ type: String, required: false })
  placeholderText: string;

  @Prop({ type: String, default: 'text' })
  inputType: string;

  @Prop({ type: Boolean, default: false })
  disabled: boolean;

  @Prop({ type: Boolean, default: false })
  errorStatus: boolean;

  @Prop({ type: Boolean, default: false })
  required: boolean;

  @Prop({ type: Boolean, default: false })
  autofocus: boolean;

  setFocus() {
    (this.$refs.inputRef as HTMLElement).focus();
  }

  created() {
    if (this.autofocus) {
      this.$nextTick(() => this.setFocus());
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.text-field {

  &--validation {

    input {
      transition: border-color .15s ease-in;
      border: 1px solid $color-cardinal;
    }
  }

  &__validation {
    fill: $color-cardinal;
    position: absolute;
    right: -3px;
    top: 12px;
  }

  &_medium {
    input {
      font-family: $font-global-medium;
    }
  }

  &_364 {
    min-width: 364px;
    max-width: 364px;
  }

  &_200 {
    min-width: 200px;
    max-width: 200px;
  }

  &-wrapper {
    position: relative;

    &__circle {
      width: 20px;
      height: 20px;
      background: rgba($color-dodger-blue, .08);
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      position: absolute;
      top: 11px;
      right: 12px;
      cursor: pointer;
      transition: opacity .15s ease-in;

      &:hover {
        opacity: .8;
      }

      i {
        color: $color-dodger-blue;
        font-size: 7px;
      }
    }

    &_error {

      .text-field__input {
        border: 1px solid $color-cardinal!important;
      }
    }
  }

  &__icon {
    position: absolute;
    right: 12px;
    top: 50%;
    color: $color-silver-chalice;
    transition: color .15s ease-in;
    cursor: pointer;
    transform: translateY(-50%);

    &_error {
      pointer-events: none;
      color: $color-cardinal!important;
    }

    &:hover {
      color: $color-dodger-blue;
    }
  }

  &__input {
    border: 1px solid $color-gallery;
    border-radius: $borderRadius;
    width: 100%;
    height: 40px;
    padding: 12px 35px 12px 12px;
    font: $font-size-base $font-global;
    line-height: 1.42 ;
    transition: border-color .15s ease-in;

    &_capitalize {
      text-transform: capitalize;
    }

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }

    &_padding {
      padding-right: 35px;
    }

    &:focus {
      border-color: $color-dodger-blue;
    }
  }

  &.active {
    i {
      color: $color-dodger-blue;
    }
  }
}
</style>

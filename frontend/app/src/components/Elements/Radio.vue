<template>
  <div
    class="app-radio"
    :class="[
      customClass,
      {'app-radio--checked': checked},
      {'app-radio--border': border},
      {'app-radio--border--active': checked}
    ]"
    @click.stop="statusRadio"
  >
    <input
      :id="id"
      v-model="radioTextModel"
      type="radio"
      class="app-radio__text-field"
      :name="name"
      :value="value"
      :checked="checked"
    >
    <!--    <span-->
    <!--      v-else-if="radioText"-->
    <!--      class="app-radio__text"-->
    <!--      :class="{'app-radio__text_active': checked}"-->
    <!--    >-->
    <!--      {{ radioText }}-->
    <!--    </span>-->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import '@/assets/icons/Caution-sign';

@Component({})
export default class Radio extends Vue {
  @Prop({ required: false, type: String })
  name: string;

  @Prop({ required: false, type: String })
  radioText: string;

  @Prop({ required: false, type: String })
  border: string;

  @Prop({ required: false, type: String })
  customClass: string;

  @Prop({ required: false, type: String })
  id: string;

  @Prop({ required: false, type: Boolean })
  checked: boolean;

  @Prop({ required: true, type: String })
  value: string;

  get radioTextModel() {
    return this.radioText;
  }

  set radioTextModel(data) {
    this.$emit('update:radioText', data);
  }

  statusRadio(e) {
    e.stopPropagation();
    this.$emit('radioChange', this.value);
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.app-radio {
  position: relative;
  display: flex;
  align-items: center;
  min-height: 16px;
  cursor: pointer;
  transition: 0.3s;

  &--full {
    width: 100%;
    height: 100%;
    padding: 12px;
  }

  &-container {
    position: relative;
    cursor: pointer;
    width: 16px;
    height: 16px;
    top: -1px;

    &__checkmark-wrapper {
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 16px;
      width: 16px;
      border: 1px solid $color-dodger-blue;
      box-sizing: border-box;
      border-radius: 50%;
    }

    &__checkmark {
      font-size: 0;
      color: $color-white;
      transition: all 150ms;
    }

    &__input {
      position: absolute;
      top:0;
      left: 0;
      height: 16px;
      width: 16px;
      margin: 0;
      opacity: 0;

      &:checked + span {
        span {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: $color-dodger-blue;
        }
      }
    }
  }

  &__text {
    margin-left: 6px;
    font-size: 14px;
    line-height: 1.5;
    user-select: none;
    &_ellipsis {
      max-width: 210px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;
    }
    &_active {
      color: $color-dodger-blue;
    }
  }

  &__text-field {
    margin-left: 6px;
    flex-grow: 1;
  }

  &_alt {
    border: 1px solid $color-gallery;
    border-radius: $borderRadius;
    width: 100%;
    height: 40px;
    padding: 12px;
    font-size: 14px;
    line-height: 1.42;
    transition: border-color .15s ease-in;

    span {
      font-size: $font-size-base;
      color: $color-black;
      transition: color .15s ease-in;
    }

    &:hover {
      border-color: $color-dodger-blue;

      span {
        color: $color-dodger-blue;
      }
    }
  }

  &--checked {
    span {
      color: $color-dodger-blue;
    }
  }
  &.render {
    .app-radio {
      &__text {
        font-size: 14px;
        position: relative;
        top: -1px;
      }
    }
  }
}
</style>

<template>
  <div
    class="ub-dropdown"
    :class="customClass"
  >
    <div class="ub-dropdown__select">
      <div class="ub-dropdown__label">
        <div
          class="ub-dropdown__wrap"
          @click="toggleDropdown()"
        >
          <div class="ub-dropdown__image">
            <img
              :src="getOptionImage(dropDownValue)"
              :alt="dropDownValue"
            >
          </div>
          <span class="ub-dropdown__text">
            {{ dropDownValue }}
          </span>
          <template v-if="!arrowAlt">
            <i
              class="ub-icon-arrow ub-dropdown__arrow"
              :class="{'ub-dropdown__arrow_down': !visible}"
            >
            </i>
          </template>
          <template v-else>
            <i
              class="ub-icon-rectangle ub-dropdown__arrow ub-dropdown__arrow_alt"
              :class="[
                {'ub-dropdown__arrow_down': !visible},
                {'ub-dropdown__arrow_up': visible}
              ]"
            >
            </i>
          </template>
        </div>
      </div>
    </div>
    <transition name="fade-el">
      <div
        class="ub-dropdown-modal"
        :class="!visible ? 'ub-dropdown-modal_hidden' : 'ub-dropdown-modal_visible'"
      >
        <div
          class="ub-dropdown-modal__list"
        >
          <div
            v-for="item in list"
            :key="item.code"
            class="ub-dropdown-modal__item"
            :class="{'ub-dropdown-modal__item_current' : item.code === dropDownValue}"
            @click="changeDropdown(item.code)"
          >
            <div class="ub-dropdown-modal__item-image">
              <img
                :src="getOptionImage(item.code)"
                :alt="item.code"
              >
            </div>
            <span>{{ item.text }}</span>
            <i
              v-if="item.code === dropDownValue"
              class="ub-icon-check-mark-select ub-dropdown-modal__item-icon"
            >
            </i>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  props: {
    dropdownOptions: {
      type: Object,
    },
    customClass: {
      type: String,
    },
    arrowAlt: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
  },
  data: () => ({
    visible: false,
  }),
  computed: {
    list() {
      return this.dropdownOptions.list;
    },
    dropDownValue() {
      return this.dropdownOptions.value;
    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  },
  methods: {
    getOptionImage(image) {
      try {
        /* eslint-disable */
        return require(`@/assets/images/countryLangs/${image}.svg`);
        /* eslint-enable */
      } catch (e) {
        return false;
      }
    },
    closeDropdown(e) {
      if (!this.$el.contains(e.target)) {
        this.visible = false;
      }
    },
    toggleDropdown() {
      this.visible = !this.visible;
    },
    changeDropdown(code) {
      this.$emit('changeDropdown', code);
      this.visible = false;
    },
  },
};
</script>

<style scoped lang="scss">

.ub-dropdown {
  min-width: 164px;
  max-width: 164px;
  text-align: right;
  position: relative;
  margin-right: 8px;
  &__wrap {
    min-width: 50px;
    cursor: pointer;
    transition: opacity .15s ease-in;
    display: flex;
    &:hover {
      opacity: .8;
    }
  }
  &__image {
    max-width: 20px;
    min-width: 20px;
    height: 20px;
    border: 2px solid white;
    border-radius: 50%;
    position: relative;
    top: 0;
    left: -4px;
    img {
      border-radius: 50%;
    }
  }
  &__arrow {
    position: relative;
    top: 1px;
    color: blue;
    left: -3px;
    &:before {
      transform: rotate(180deg);
    }
    &_down:before {
      transform: rotate(0);
    }
    &_alt {
      color: white;
      font-size: 4px;
      top: -3px;
      left: -5px;
      &.ub-dropdown__arrow_up {
        left: -2px;
        top: -4px;
      }
    }
  }
  &__text {
    margin-right: 6px;
    display: inline-block;
    color: blue;
    text-transform: capitalize;
  }
  &__label {
    display: flex;
    justify-content: flex-end;
  }
  &-modal {
    &_hidden {
      visibility: hidden;
    }
    &_visible {
      visibility: visible;
    }
    &__list {
      width: 100%;
      max-width: 170px;
      min-width: 170px;
      font-size: 14px;
      position: absolute;
      z-index: 25;
      background: white;
      box-shadow: 0 0 8px rgba(black, .06);
      border-radius: 2px;
      text-align: left;
      padding: 2px 0;
      top: 24px;
      right: 6px;
    }
    &__item {
      padding: 11px 12px;
      color: black;
      position: relative;
      cursor: pointer;
      height: 42px;
      transition: background-color .15s ease-in;
      display: flex;
      align-items: center;
      span {
        position: relative;
        top: -1px;
        display: inline-block;
      }
      &-image {
        max-width: 16px;
        min-width: 16px;
        height: 16px;
        position: relative;
        left: -2px;
        top: -2px;
        margin-right: 4px;
        img {
          border-radius: 50%;
        }
      }
      &_current {
        background: lightgray;
      }
      &-icon {
        position: absolute;
        right: 12px;
        top: 11px;
        color: blue;
        font-size: 14px;
      }
      &:hover {
        background-color: lightgray;
      }
    }
  }
  &_landing {
    padding-right: 7px;
    margin-left: auto;
    margin-right: 20px;
    position: relative;
    height: 100%;
    .ub-dropdown__select {
      height: 100%;
    }
    &:after {
      position: absolute;
      content: '';
      width: 1px;
      height: 16px;
      background: rgba(blue, .08);
      top: 20px;
      right: -2px
    }
    &_color {
      &:after {
        background: rgba(white, .07);
      }
    }
    .ub-dropdown {
      &__text {
        color: white;
        text-transform: uppercase;
      }
      &__wrap {
        display: block;
      }
      &__image {
        top: 19px;
        left: -2px;
      }
      &-modal {
        &__list {
          border-radius: 0;
          padding: 4px 0;
          right: 8px;
          top: 45px;
        }
        &__item {
          padding: 11px 14px;
          &_current {
            color: blue;
            background: transparent;
          }
          &-icon {
            display: none;
          }
          &:hover {
            color: blue;
          }
        }
      }
    }
  }
}
.landing-header_secondary {
  .ub-dropdown__text {
    color: blue;
  }
  .ub-dropdown__arrow_alt {
    color: blue;
  }
}
</style>

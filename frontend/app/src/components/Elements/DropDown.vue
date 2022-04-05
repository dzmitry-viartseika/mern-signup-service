<template>
  <div
    class="app-dropdown"
    :class="customClass"
  >
    <div class="app-dropdown__select">
      <div class="app-dropdown__label">
        <div
          class="app-dropdown__wrap"
          @click="toggleDropdown()"
        >
          <div class="app-dropdown__image">
            <img
              :src="getOptionImage(dropDownValue)"
              :alt="dropDownValue"
            >
          </div>
          <span class="app-dropdown__text">
            {{ dropDownValue }}
          </span>
          <template v-if="!arrowAlt">
            <i
              class="app-icon-arrow app-dropdown__arrow"
              :class="{'app-dropdown__arrow_down': !visible}"
            />
          </template>
          <template v-else>
            <i
              class="app-icon-rectangle app-dropdown__arrow app-dropdown__arrow_alt"
              :class="[
                {'app-dropdown__arrow_down': !visible},
                {'app-dropdown__arrow_up': visible}
              ]"
            />
          </template>
        </div>
      </div>
    </div>
    <transition name="fade-el">
      <div
        class="app-dropdown-modal"
        :class="!visible ? 'app-dropdown-modal_hidden' : 'app-dropdown-modal_visible'"
      >
        <div
          class="app-dropdown-modal__list"
        >
          <div
            v-for="item in list"
            :key="item.code"
            class="app-dropdown-modal__item"
            :class="{'app-dropdown-modal__item_current' : item.code === dropDownValue}"
            @click="changeDropdown(item.code)"
          >
            <div class="app-dropdown-modal__item-image">
              <img
                :src="getOptionImage(item.code)"
                :alt="item.code"
              >
            </div>
            <span>{{ item.text }}</span>
            <i
              v-if="item.code === dropDownValue"
              class="app-icon-check-mark-select app-dropdown-modal__item-icon"
            />
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
        return require(`@/assets/images/flags/${image}.svg`);
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

.app-dropdown {
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
      &.app-dropdown__arrow_up {
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
  &--landing {
    padding-right: 7px;
    margin-left: auto;
    margin-right: 20px;
    position: relative;
    height: 100%;
    .app-dropdown__select {
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
    .app-dropdown {
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
  .app-dropdown__text {
    color: blue;
  }
  .app-dropdown__arrow_alt {
    color: blue;
  }
}

.app-dropdown--profile {
  min-width: auto;
  max-width: 100%;

  .app-dropdown__wrap {
    align-items: center;
  }

  .app-dropdown-modal__list {
    left: 0;
  }
}
</style>

<template>
  <div
    :ref="refId"
    class="select"
    :class="[
      {'select_open': isOpen,
       'select_disabled': settings.disable}
    ]"
    @click.stop="handleClick()"
  >
    <i
      class="ub-icon-arrow select__icon"
      :class="{'select__icon_up': isOpen}"
    ></i>
    <img
      v-if="settings.showImageInput && getOptionImage(inputImage)"
      class="select__image"
      :src="getOptionImage(inputImage)"
      :alt="inputText"
    >
    <input
      :ref="'selectInput-' + refId"
      v-model="inputText"
      :readonly="!isOpen"
      type="text"
      class="select__input"
      :class="{'select__input_image': settings.showImageInput && getOptionImage(inputImage)}"
      :tabindex="settings.tabindex"
      :placeholder="settings.placeholderText"
      @blur="checkValue()"
      @keydown.stop="selectInputKeyDown($event)"
    >
    <template
      v-if="mobileStatus"
    >
      <select
        v-model="settings.selectedKey"
        class="select-mobile"
        @change="changeValueSelect($event)"
      >
        <option
          v-for="option in computedOptionsList"
          :key="option.key"
          class="select-mobile__item"
          :value="option.key"
        >
          {{ option.text }}
        </option>
      </select>
    </template>
    <template v-else>
      <transition name="fade-content">
        <VuePerfectScrollbar
          v-show="isOpen"
          class="select__drop"
          :class="{'select__drop_top': settings.toTop}"
        >
          <div
            class="select__drop-list"
            @click.stop
          >
            <div
              v-for="option in computedOptionsList"
              :key="option.key"
              :style="[(settings.fontFamily === true) ? {'font-family': option.key} : '']"
            >
              <a
                :ref="'select__drop-link_first-' + refId"
                class="select__drop-link"
                :class="{'select__drop-link_checked': option.key === inputValue}"
                @keydown.prevent.stop="selectDropLinkKeyDown($event, option.key)"
                @click.stop="updateSelect(option.key, $event)"
              >
                <template v-if="option.type === 'label'">
                  <hr />
                  <i :class="option.icon"></i>
                </template>
                <span>{{ option.text }}</span>
                <i
                  v-if="option.key === inputValue"
                  class="ub-icon-check-mark-select select__drop-icon"
                ></i>
                <img
                  v-if="option.image && getOptionImage(option.image)"
                  class="select__drop-link-image"
                  :src="getOptionImage(option.image)"
                  :class="{'select__drop-link-image_left': settings.imagePosition === 'left'}"
                  :alt="option.text"
                >
                <template v-if="option.type === 'label'">
                  <hr />
                </template>
              </a>
            </div>
          </div>
          <InfiniteLoading
            v-if="settings.infinity"
            ref="infiniteLoading"
            spinner="spiral"
            :distance="loadingStart"
            @infinite="infiniteHandler"
          >
            <span slot="no-more"></span>
            <span slot="no-results"></span>
          </InfiniteLoading>
        </VuePerfectScrollbar>
      </transition>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import VuePerfectScrollbar from 'vue-perfect-scrollbar';
import InfiniteLoading from 'vue-infinite-loading';
import '@/assets/icons/Caution-sign';
import { includes, find } from 'lodash';

@Component({
  components: {
    VuePerfectScrollbar,
    InfiniteLoading,
  },
})
export default class TextInput extends Vue {
  @Prop({ required: true })
  settings: any;

  @Prop({ required: false })
  selectOpenStatus: any;

  loadingStart = 100;
  isOpen = false;
  value = this.settings!.selectedKey;
  refId = Math.floor(new Date().valueOf() * Math.random());
  searchValue = '';
  inputValueStr = '';
  inputImageDef = '';
  isOpenSelect = false;
  cancelCloseEl = false;

  infiniteHandler($state) {
    this.$emit('infiniteHandler', $state);
  }

  checkValue() {
    if (!this.isOpen) {
      const el = find(this.computedOptionsList, (obj) => obj.key === this.inputValue);
      if (el === undefined) {
        this.inputText = '';
        this.inputImage = '';
      } else {
        this.inputText = el.text;
        if (this.settings.showImageInput && el.image) {
          this.inputImage = el.image;
        }
      }
    }
  }

  selectDropLinkKeyDown(e, key) {
    switch (e.keyCode) {
      case 13:
        e.target.classList.remove('select__drop-link_hover');
        this.updateSelect(key);
        this.$refs[`selectInput-${this.refId}`].focus();
        this.isOpen = false;
        break;
      case 27:
        e.target.classList.remove('select__drop-link_hover');
        this.$refs[`selectInput-${this.refId}`].focus();
        this.isOpen = false;
        break;
      case 38:
        if (e.target.parentNode.previousSibling !== null) {
          e.target.classList.remove('select__drop-link_hover');
          e.target.parentNode.previousSibling.firstChild.classList.add('select__drop-link_hover');
          e.target.parentNode.previousSibling.firstChild.focus();
        } else {
          this.$refs[`selectInput-${this.refId}`].focus();
          e.target.parentNode.firstChild.classList.remove('select__drop-link_hover');
        }
        break;
      case 40:
        if (e.target.parentNode.nextSibling !== null) {
          e.target.classList.remove('select__drop-link_hover');
          e.target.parentNode.nextSibling.firstChild.classList.add('select__drop-link_hover');
          e.target.parentNode.nextSibling.firstChild.focus();
        }
        break;
      default:
        this.$refs[`selectInput-${this.refId}`].focus();
        break;
    }
  }

  selectInputKeyDown(e) {
    // if (!this.isOpen) {
    //   e.preventDefault();
    // }
    switch (e.keyCode) {
      case 9:
        this.isOpen = false;
        break;
      case 27:
        e.preventDefault();
        this.isOpen = false;
        break;
      case 38: {
        e.preventDefault();
        break;
      }
      case 40:
        e.preventDefault();
        this.isOpen = true;
        this.$refs[`select__drop-link_first-${this.refId}`][0].focus();
        this.$refs[`select__drop-link_first-${this.refId}`][0].classList.add('select__drop-link_hover');
        break;
      default:
        if (!this.isOpen) this.isOpen = true;
        break;
    }
  }

  handleClick() {
    if (this.settings.disable !== undefined) {
      if (!this.settings.disable) {
        this.isOpen = !this.isOpen;
        if (this.selectOpenStatus !== undefined) {
          setTimeout(() => { // TODO Временное решение позже поправить
            this.$emit('update:selectOpenStatus', !this.selectOpenStatus);
          }, 150);
        }
      }
    } else {
      this.isOpen = !this.isOpen;
      if (this.selectOpenStatus !== undefined) {
        setTimeout(() => {
          this.$emit('update:selectOpenStatus', !this.selectOpenStatus);
        }, 150);
      }
    }
  }

  closeSelect(e) {
    e.stopPropagation();
    e.preventDefault();
    if (this.$refs[this.refId] !== undefined) {
      if (!this.$refs[this.refId].contains(e.target)) {
        this.isOpen = false;
        if (this.selectOpenStatus !== undefined) {
          setTimeout(() => {
            this.$emit('update:selectOpenStatus', !this.selectOpenStatus);
          }, 150);
        }
      }
    }
  }

  changeValueSelect(e) {
    const { target = {} } = e;
    const { value = '' } = target;
    this.updateSelect(value);
  }

  updateSelect(key, ev, prop) {
    this.cancelCloseEl = true;
    if (ev) {
      ev.stopPropagation();
      ev.preventDefault();
    }
    if (this.inputValue === key) return;
    this.inputValue = key;
    const el = find(this.computedOptionsList, (obj) => obj.key === key);
    if (el === undefined) {
      this.inputValueStr = '';
      this.inputImage = '';
    } else {
      this.inputValueStr = el.text;
      if (this.settings.showImageInput && el.image) {
        this.inputImage = el.image;
      } else {
        this.inputImage = '';
      }
    }
    if (this.selectOpenStatus !== undefined) {
      setTimeout(() => { // TODO Временное решение позже поправить
        this.$emit('update:selectOpenStatus', !this.selectOpenStatus);
      }, 150);
    }
    this.isOpen = false;
    this.$refs[`selectInput-${this.refId}`].blur();
    if (!prop) this.$emit('changeSelect', key);
  }

  mounted() {
    const el = find(this.computedOptionsList, (obj) => obj.key === this.inputValue);
    if (el === undefined) {
      this.inputText = '';
      this.inputImage = '';
    } else {
      this.inputText = el.text;
      if (this.settings.showImageInput && el.image) {
        this.inputImage = el.image;
      }
    }
  }

  get inputImage() {
    return this.inputImageDef;
  }

  set inputImage(data) {
    this.inputImageDef = data;
  }

  get inputValue() {
    return this.value;
  }

  set inputValue(data) {
    this.value = data;
  }

  get inputText() {
    return this.inputValueStr;
  }

  set inputText(data) {
    this.inputValueStr = data;
    this.searchValue = data;
  }

  @Watch('isOpen')
  test(newVal) {
    if (newVal) {
      this.isOpenSelect = true;
      if (this.settings.infinity) this.$refs.infiniteLoading.stateChanger.reset();
      this.searchValue = '';
      document.addEventListener('click', this.closeSelect);
    } else {
      this.isOpenSelect = false;
      document.removeEventListener('click', this.closeSelect);
      const el = find(this.computedOptionsList, (obj) => obj.key === this.inputValue);
      if (el === undefined) this.inputText = '';
      else this.inputText = el.text;
    }
  }

  @Watch('settings.selectedKey')
  test2(newVal) {
    this.updateSelect(newVal, false, true);
  }

  @Watch('settings.optionList')
  test3() {
    this.checkValue();
  }

  beforeDestroy() {
    document.removeEventListener('click', this.closeSelect);
  }

  get computedOptionsList() {
    const arr = [];
    if (this.isOpen) {
      const { optionList = [] } = this.settings;
      if (optionList.length) {
        arr.push(...optionList.filter((obj) => {
          const { text = '' } = obj;
          return includes(
            text.toLowerCase(), this.searchValue.toLowerCase(),
          );
        }));
      }
    } else {
      arr.push(...this.settings.optionList);
    }
    return arr;
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.select{
  position: relative;
  height: 40px;
  background: $color-white;
  cursor: pointer;
  font-size: 14px;
  color: $color-dodger-blue;
  flex-grow: 1;
  transition: background-color .2s ease-in;
  user-select: none;
  border-radius: $borderRadius;
  &.error  {
    .select__input {
      border: 1px solid $color-cardinal;
    }
  }
  &__icon {
    z-index: 0;
    right: 10px;
    top: 15px;
    font-size: 11px;
    position: absolute;
    &_up {
      transform: rotate(180deg);
    }
  }
  &__image {
    width: 20px;
    height: 20px;
    z-index: 0;
    left: 12px;
    top: 10px;
    position: absolute;
    border-radius: 50%;
  }
  .ps-container {
    height: auto;
    max-height: 327px;
  }
  &_disabled{
    cursor: default;
    background-color: $color-alabaster;
    pointer-events: none;
    .select__input {
      cursor: default;
      border: 1px solid $color-alabaster;
      background: $color-alabaster;
    }
    .select__icon {
      display: none;
    }
  }
  &:hover, &_open{
    &:before{
      z-index: 6;
    }
    .select__input {
      border-color: $color-dodger-blue;
    }
  }
  &_checked{
    .select__input{
      border-color: pink;
    }
  }
  &_open {
    z-index: 20!important;
    .select__drop {
      display: block;
    }
  }
  &__input{
    width: 100%;
    border: 1px solid $color-gallery;
    color: $color-black;
    padding: 10px 40px 10px 10px;
    height: 40px;
    font-size: 14px;
    cursor: pointer;
    font-size: inherit;
    transition: border-color .2s ease-in;
    border-radius: $borderRadius;
    &:focus {
      border-color: $color-dodger-blue;
    }
    &_image {
      padding-left: 38px;
    }
    &::-webkit-input-placeholder {
      font-family: $font-global;
      text-shadow: none !important;
      color: $color-silver-chalice;
    }
    &::-moz-placeholder {
      font-family: $font-global;
      text-shadow: none !important;
      color: $color-silver-chalice;
    }
    &:-moz-placeholder {
      font-family: $font-global;
      text-shadow: none !important;
      color: $color-silver-chalice;
    }
    &:-ms-input-placeholder {
      font-family: $font-global;
      text-shadow: none !important;
      color: $color-silver-chalice;
    }
    &:focus {
      color: $color-black!important;
      &::-webkit-input-placeholder,
      &::-moz-placeholder,
      &:-moz-placeholder,
      &:-ms-input-placeholder {
        opacity: 0;
        color: $color-black!important;
      }
    }
  }
  &__drop {
    display: none;
    position: absolute !important;
    top: 35px;
    left: 0;
    z-index: $z-index-big;
    width: 100%;
    margin-top: 10px;
    overflow: hidden;
    padding: 4px 0;
    background: $color-white;
    color: $color-dodger-blue;
    box-shadow: 0 0 4px rgba($color-black, .25);
    border-radius: $borderRadius;
    &-icon {
      position: absolute;
      right: 14px;
      color: $color-dodger-blue;
      font-size: 16px;
    }
    &_top {
      bottom: 100%;
      margin-bottom: 2px;
      top: auto;
    }
    &_bottom {
      bottom: 0;
      top: auto;
    }
    &-link {
      padding: 10px 13px;
      text-decoration: none;
      display: flex;
      align-items: center;
      color: $color-black;
      height: 46px;
      transition: color 200ms ease-in;
      font-size: 14px;
      border-bottom: 1px solid $color-alabaster;
      span {
        margin-left: 6px;
      }
      &_checked {
        position: relative;
        border-color: transparent;
        font-weight: 500;
      }
      &:hover {
        &:before, &:after {
          display: none;
        }
      }
      &_hover {
      }
    }
    &-link-image {
      width: 20px;
      height: 20px;
      object-fit: cover;
      border-radius: 50%;
      &_left {
        order: -1;
      }
    }
    &-list > div {
      position: relative;
      &:hover {
        a {
          background: $color-alabaster!important;
        }
      }
    }
    &-list {
      max-height: 180px;
    }
  }
  &__check {
    position: absolute;
    display: none;
    top: 50%;
    right: 16px;
    transform: translateY(-50%);
    font-size: 10px;
    color: blue;
    &_checked {
      display: block;
    }
  }
  &-mobile {
    position: relative;
    top: -40px;
    height: 40px;
    width: 100%;
    opacity: 0;
  }
}
.select-row {
  display: flex;
  .select + .select {
    margin-left: 10px;
  }
  .select + .text-field {
    margin-left: 10px;
  }
}
.select__drop > div:hover a {
  background-color: transparent;
}
.ps-container.select__drop .ps__scrollbar-y-rail {
  right: 4px!important;
}
.style-website-countriesList .select__input {
  font-size: 14px;
  color: transparent !important;
  text-shadow: 0 0 0 green;
}
</style>

<style lang="scss">
@import "../../assets/scss/variables";

.select {
  &_light-loader {
    .infinite-loading-container {
      .loading-spiral {
        border-color: red !important;
        border-right-color: transparent !important;
      }
    }
  }
}
</style>

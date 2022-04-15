<template>
  <div
    class="app-select"
    :class="{'app-select--validation': errorStatus}"
  >
    <div
      v-if="label"
      class="app-select__label"
      :class="{'validation--required': required}"
    >
      {{ label }}
    </div>
    <model-select
      v-model="itemValue"
      :options="options"
      :placeholder="placeholderText"
      @select="onSelect"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { ModelSelect } from 'vue-search-select';
import '@/assets/icons/Caution-sign';

@Component({
  components: {
    ModelSelect,
  },
})
export default class SelectTemplate extends Vue {
  @Prop({ required: true, type: Array })
  options: object[];

  @Prop({ required: true, type: String })
  item: string;

  @Prop({ required: false, type: String })
  label: string;

  @Prop({ required: false, type: Boolean })
  required: boolean;

  @Prop({ type: Boolean, default: false })
  errorStatus: boolean;

  @Prop({  type: String })
  placeholderText: string;

  get itemValue() {
    return this.item;
  }

  set itemValue(data) {
    this.$emit('update:item', data);
  }

  onSelect() {
    /* eslint-disable */
    /* tslint:disable */
    // @ts-ignore
    console.log('wertey');
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";
  .app-select {
    height: 40px;

    .ui.selection.dropdown {
      height: 40px;
      border: 1px solid #EEEEEE;
    }

    &--validation {

      .ui.selection.dropdown {
        transition: border-color .15s ease-in !important;
        border: 1px solid $color-cardinal !important;
      }
    }

    &__label {
      color: $color-silver-chalice;
      font: 10px Ubuntu-medium, sans-serif;
      line-height: 1.55;
    }
  }
</style>

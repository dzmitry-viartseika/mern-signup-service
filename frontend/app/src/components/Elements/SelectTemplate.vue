<template>
  <div class="app-select"
       :class="{'app-select--validation': errorStatus}"
  >
    <div
      class="app-select__label"
      v-if="label"
      :class="{'validation--required': required}"
    >
      {{ label }}
    </div>
    <model-select
      v-model="itemValue"
      :options="options"
      placeholder="select item"
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

  @Prop({ required: true, type: Object })
  item: object;

  @Prop({ required: false, type: String })
  label: string;

  @Prop({ required: false, type: Boolean })
  required: boolean;

  @Prop({ type: Boolean, default: false })
  errorStatus: boolean;

  get itemValue() {
    return this.item;
  }

  set itemValue(data) {
    this.$emit('update:item', data);
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";
  .app-select {

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

<template>
  <div class="app-select">
    <model-select :options="options"
                  v-model="itemValue"
                  placeholder="select item" />
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

</style>

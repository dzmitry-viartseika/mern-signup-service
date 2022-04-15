<template>
  <ag-grid-vue
    style="width: auto; height: auto"
    class="ag-theme-alpine"
    :column-defs="columnDefs"
    :row-data="rowData"
    dom-layout="autoHeight"
    :is-numerable="true"
    :suppress-cell-selection="true"
    :auto-size-columns-with-headers="true"
    :row-selection="'single'"
    @cell-clicked="onClientSelected($event)"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { AgGridVue } from 'ag-grid-vue';

@Component({
  components: {
    AgGridVue,
  },
})
export default class AGGridTable extends Vue {
  @Prop({ type: Array, required: true })
  columnDefs: any[];

  @Prop({ type: Array, required: true })
  rowData: any[];

  @Prop({ type: Object, required: false })
  defaultColDef: object;

  onClientSelected(item) {
    this.$emit('onClientSelected', item.data);
  }
}
</script>

<style scoped>

</style>

<template>
  <span class="document-editor-form__counter">
    {{ valueLength }} / {{ validMaxLength }}
  </span>
</template>

<script lang="ts">
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component({})
export default class SymbolCounter extends Vue {
  @Prop()
  valueLength: number;

  @Prop()
  validMaxLength: number;
}
</script>

<style scoped>

</style>

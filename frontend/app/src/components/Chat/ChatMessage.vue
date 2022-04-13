<template>
  <div class="message-item__value">
    <div
      class="message-item__label"
    >
      LabelText
    </div>
    <span>
      {{ item.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ChatMessage extends Vue {
  @Prop({ required: false, type: Object })
  item: object;
}
</script>

<style scoped lang="scss">

</style>

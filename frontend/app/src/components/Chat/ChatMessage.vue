<template>
  <div class="message-item__value">
    <div
      class="message-item__label"
    >
      <template>
        {{ labelText }}
      </template>
    </div>
    <span>
      {{ item.message }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import IChatMessage from '@/model/chat/IChatMessage';

@Component({})
export default class ChatMessage extends Vue {
  @Prop({ required: false, type: Object }) item: IChatMessage;

  get labelText(): string {
    const { user } = this.item;
    return user;
  }
}
</script>

<style scoped lang="scss">

</style>

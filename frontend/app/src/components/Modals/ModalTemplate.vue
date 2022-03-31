<template>
  <portal to="popup">
    <div
      class="app-modal"
      :class="position"
      :style="{ 'width': width }"
    >
      <slot name="content" />
    </div>
  </portal>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class ModalTemplate extends Vue {
  @Prop({ required: false, type: String, default: 'center' })
  position: string;

  @Prop({ required: false, type: String, default: '400px' })
  width: string;
}
</script>

<style scoped lang="scss">

  .app-modal {
    position: fixed;
    z-index: 1;
    width: 100%;
    transform: translate(-50%, -50%);

    &.center {
      top: 50%;
      left: 50%;
    }

    &.bottom {
      bottom: 0;
      left: 0;
    }

    &__content {
      display: flex;
    }
  }
</style>

<template>
  <div class="admin-modal">
    <div class="admin-modal-wrap">
      <div class="admin-modal-wrap-header">
        <div class="admin-modal-wrap-header__title">
          {{ modalTitle }}
        </div>
        <div
          class="admin-modal-wrap-header__close"
          @click="closeModal"
        >
          x
        </div>
      </div>
      <div class="admin-modal-wrap-content">
        <slot name="content"></slot>
      </div>
      <div class="admin-modal-wrap-footer">
        <div class="landing-page-modal-wrap-footer__item">
          <button
            class="app__btn app__btn--primary"
            @click="closeModal"
          >
            ok
          </button>
        </div>
      </div>
    </div>
    <div
      v-shortkey="['esc']"
      class="admin-modal__overlay"
      @click="closeModal"
      @shortkey="closeModal"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ClickOutside from 'vue-click-outside';

@Component({
  directives: {
    ClickOutside,
  },
})
export default class ModalTemplateWithAction extends Vue {
  @Prop({ required: true, type: String })
  modalTitle: string;

  closeModal(): void {
    console.log('wishesModalActions');
    this.$emit('wishesModalActions', false);
  }
}
</script>

<style scoped lang="scss">

.admin-modal-wrap {
  width: 400px;
}
</style>

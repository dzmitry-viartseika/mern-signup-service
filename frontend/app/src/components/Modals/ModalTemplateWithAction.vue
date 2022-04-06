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
          <svgicon
            name="Close"
            width="18"
            height="18"
          />
        </div>
      </div>
      <div class="admin-modal-wrap-content">
        <slot name="content" />
      </div>
      <div class="admin-modal-wrap-footer">
        <div class="landing-page-modal-wrap-footer__item">
          <button
            class="app__btn app__btn--primary"
            @click="sendAction"
          >
            Отправить
          </button>
        </div>
      </div>
    </div>
    <div
      v-shortkey="['esc']"
      class="admin-modal__overlay"
      @click="closeModal"
      @shortkey="closeModal"
    />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import ClickOutside from 'vue-click-outside';
import '@/assets/icons/Close';

@Component({
  directives: {
    ClickOutside,
  },
})
export default class ModalTemplateWithAction extends Vue {
  @Prop({ required: true, type: String })
  modalTitle: string;

  closeModal(): void {
    this.$emit('modalActions', false);
  }

  sendAction(): void {
    this.$emit('actionButton');
  }
}
</script>

<style scoped lang="scss">

.admin-modal-wrap {
  width: 400px;
}
</style>

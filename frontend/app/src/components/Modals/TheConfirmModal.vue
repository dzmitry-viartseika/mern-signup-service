<template>
  <div class="app-confirm-modal">
    <div class="app-confirm-modal__content">
      Вы уверены, что хотите удалить файл "{{ nameText }}"
    </div>
    <div class="app-confirm-modal__footer">
      <button @click="closeConfirmModal">
        Нет
      </button>
      <button @click="actionConfirmModal">
        Да
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component({})
export default class TheConfirmModal extends Vue {
  @Prop({ required: true, type: String })
  nameText: string;

  closeConfirmModal(): void {
    this.$emit('closeConfirmModal');
  }

  actionConfirmModal(): void {
    this.$emit('actionConfirmModal');
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/scss/variables';

  .app-confirm-modal {
    width: 200px;
    height: auto;
    background: $color-white;
    padding: 10px;
    border-radius: $borderRadius;
    box-shadow: 0 0 15px rgba($color-black, .2);
    position: absolute;
    left: 70px;
    top: 70px;
    z-index: 1;

    &__content {
      font-size: 14px;
      text-align: center;
      margin-bottom: 15px;
    }

    &__footer {
      display: flex;
      justify-content: flex-end;

      button + button {
        margin-left: 10px;
      }
    }
  }

</style>


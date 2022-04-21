<template>
  <div class="app-files">
    <div class="app-files-header">
      <h1 class="app__title">
        My Files
      </h1>
      <div class="app-files-header__actions">
        <input
          id="file"
          ref="file"
          type="file"
          class="app-files__input"
          @change="fileHandler($event)"
        >
        <button
          class="app__btn app__btn--primary app__btn--rounded"
          @click="uploadFile"
        >
          <svgicon
            name="Plus"
            width="24"
            height="24"
          />
        </button>
        <button
          class="app__btn app__btn--primary app__btn--rounded"
          @click="modalActions(true)"
        >
          <svgicon
            name="Upload"
            width="24"
            height="24"
          />
        </button>
      </div>
    </div>
    <div
      v-if="folders.length"
      class="app-files-content"
      @contextmenu.prevent.stop="$refs.contextMenu.open"
      @click="isVisibleConfirmModal = ''"
    >
      <div
        v-for="folder in folders"
        :key="folder._id"
        class="app-files-content__item"
        :class="{'app-files-content__item--selected': selectedFolder._id === folder._id}"
        @click="selectFolderAction(folder)"
        @contextmenu.prevent.stop="$refs.selectedContextMenu.open"
        @dblclick="proceedTo"
      >
        <transition name="fade-el">
          <the-confirm-modal
            v-if="isVisibleConfirmModal === folder._id"
            :name-text="folder.name"
            @closeConfirmModal="closeConfirmModal"
            @actionConfirmModal="actionConfirmModal"
          />
        </transition>
        <svgicon
          class="icon"
          name="FolderFiles"
          width="60"
          height="60"
        />
        <div class="app-files-content__item-name">
          <template v-if="!isEditMode || selectedFolder._id !== folder._id">
            {{ folder.name }}
          </template>
          <template v-if="isEditMode && selectedFolder._id === folder._id">
            <input
              ref="inputEdit"
              v-model="folder.name"
              class="app-files-content__item-input"
              type="text"
              :style="{'width': '70px'}"
              @change="changedName"
            >
          </template>
        </div>
      </div>
    </div>
    <div v-else>
      <div
        class="app-files-placeholder"
      >
        <h2 class="app-files-placeholder__title">
          Список файлов пуст
        </h2>
        <img
          class="app-files-placeholder__image"
          src="../assets/images/placeholders/clients-placeholder.png"
          alt="placeholder"
        >
        <button
          class="app__btn app__btn--primary"
          @click="modalActions(true)"
        >
          Add Folder
        </button>
      </div>
    </div>
    <transition name="fade-el">
      <modal-template-with-action
        v-if="isVisibleAddFolderModal"
        :modal-title="'Укажите название папки'"
        @modalActions="modalActions"
        @actionButton="addNewFolder"
      >
        <div slot="content">
          <div class="form-field">
            <text-input
              :value.sync="folderName"
              :autofocus="true"
              :error-status="$validator.errors.has('folderName')"
              input-type="text"
              :required="true"
              :placeholder-text="'Укажите название папки'"
              :label-text="'Название папки'"
            />
            <transition name="fade-el">
              <div
                v-if="$validator.errors.has('folderName')"
                class="validation validation--input"
              >
                {{ $validator.errors.first('folderName') }}
              </div>
            </transition>
          </div>
        </div>
      </modal-template-with-action>
    </transition>
    <transition name="fade-el">
      <vue-context
        ref="contextMenu"
        class="app-context-menu"
      >
        <div class="app-context-menu__item">
          <svgicon
            name="Plus"
            width="16"
            height="16"
          />
          <div
            class="app-context-menu__item-text"
            @click.prevent="modalActions(true)"
          >
            Создать папку
          </div>
        </div>
        <div class="app-context-menu__item">
          <svgicon
            name="Upload"
            width="16"
            height="16"
          />
          <div
            class="app-context-menu__item-text"
            @click.prevent="uploadFile"
          >
            Загрузить файл
          </div>
        </div>
      </vue-context>
    </transition>
    <transition name="fade-el">
      <vue-context
        ref="selectedContextMenu"
        class="app-context-menu"
      >
        <div class="app-context-menu__item">
          <svgicon
            name="EditFolder"
            width="16"
            height="16"
          />
          <div
            class="app-context-menu__item-text"
            @click.prevent="editFolderName"
          >
            Переименовать папку
          </div>
        </div>
        <div class="app-context-menu__item">
          <svgicon
            name="Delete"
            width="16"
            height="16"
          />
          <div
            class="app-context-menu__item-text"
            @click.prevent="deleteFolder"
          >
            Удалить папку
          </div>
        </div>
      </vue-context>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Plus';
import '@/assets/icons/Upload';
import '@/assets/icons/EditFolder';
import '@/assets/icons/Delete';
import ModalTemplateWithAction from '@/components/Modals/ModalTemplateWithAction.vue';
import TextInput from '@/components/Elements/TextInput.vue';
import validationErrorMessage from '@/locales/validationErrorMessage';
import FolderService from '@/services/Folder/FolderService';
import VueContext from 'vue-context';
import '@/assets/icons/FolderFiles';
import TheConfirmModal from '@/components/Modals/TheConfirmModal.vue';
import getUniqueId from '@/utils/uniqueId';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  components: {
    ModalTemplateWithAction,
    TextInput,
    VueContext,
    TheConfirmModal,
  },
  metaInfo() {
    return {
      title: 'Files',
      meta: [
        {
          name: 'description',
          content: 'App Files',
        },
      ],
    };
  },
})
export default class Files extends Vue {
  folderName: string = '';

  isVisibleAddFolderModal: boolean = false;

  isVisibleContextMenu: boolean = false;

  folders: any[] = [];

  file: any = {};

  isEditMode: boolean = false;
  isAgreedDeletingFile: boolean = false;

  isVisibleConfirmModal: string = '';

  selectedFolder: any = {};

  async changedName(): Promise<void> {
    this.isEditMode = false;
    try {
      const updatedData = {
        name: this.selectedFolder.name,
      };
      await FolderService.updateCreatedFolder(this.selectedFolder._id, updatedData);
      this.selectedFolder = {};
    } catch (e) {
      console.error(e);
    }
  }

  async created(): Promise<void> {
    try {
      const user = this.$store.getters.user;
      const { data } = await FolderService.getAllFilesByUserId(user.id);
      this.folders = data.folders;
      // eslint-disable-next-line no-console
      console.log('1', this.folders.sort((prev, next) => prev.folderType - next.folderType));
      this.folders = this.folders.sort((prev, next) => prev.folderType - next.folderType);
    } catch (e) {
      console.error(e);
    }
    const dict = {
      en: {
        custom: {
          folderName: {
            required: validationErrorMessage.en.inputRequired,
          },
        },
      },
      ru: {
        custom: {
          folderName: {
            required: validationErrorMessage.ru.inputRequired,
          },
        },
      },
    };
    this.$validator.localize(dict);
    this.$validator.attach({ name: 'folderName', rules: { required: true } });
  }

  showModal(): void {
    this.isVisibleContextMenu = true;
  }

  selectFolder(id: string): void {
    this.selectedFolder = id;
  }

  editFolderName(): void {
    this.isEditMode = true;
    this.isEditMode = this.selectedFolder._id;
  }

  modalActions(data: boolean): void {
    this.isVisibleAddFolderModal = data;
  }

  uploadFile(): void {
    this.$refs.file.click();
  }

  async fileHandler(event?: HTMLInputEvent): Promise<void> {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        /* eslint-disable */
        /* tslint:disable */
        // @ts-ignore
        this.file = this.$refs!.file!.files[0];
      }
    };
    if (event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      reader.readAsDataURL(files![0]);
    }
  }

  closeConfirmModal(): void {
    this.isVisibleConfirmModal = '';
  }

  async actionConfirmModal(): Promise<void> {
    this.isAgreedDeletingFile = true;
    await this.deleteFolderRequest();
  }

  selectFolderAction(folder): void {
    // this.isEditMode = false;
    this.selectedFolder = folder;
  }

  proceedTo(): void {
    console.log('selectedFolder', this.selectedFolder);
    this.$router.push({
      name: 'Files',
      query: {
        id: this.selectedFolder.parentFolder,
      },
    });
    // this.folders = [];
  }

  deleteFolder(): void {
    this.isVisibleConfirmModal = this.selectedFolder._id;
  }

  async deleteFolderRequest(): Promise<void> {
    const { showNotify } = this.$store.getters.user;
    const { data } = await FolderService.deleteFolder(this.selectedFolder._id);
    if (showNotify) {
      this.$toasted.show(`Папка ${this.selectedFolder.name} успешно удалена`, {
        theme: 'bubble',
        position: 'top-right',
        duration: 3000,
      });
    }
    const currentIndex = this.folders.findIndex((item) => item._id === this.selectedFolder._id);
    this.folders.splice(currentIndex, 1);
  }

  async addNewFolder(): Promise<void> {
    const result = await this.$validator.validateAll({
      folderName: this.folderName,
    });

    if (result) {
      try {
        const { showNotify, _id } = this.$store.getters.user;
        const parentFolderId = `${getUniqueId()}`;
        const { data } = await FolderService.createFolder(this.folderName, parentFolderId, _id, 2);
        if (showNotify) {
          this.$toasted.show(`Новая папка ${this.folderName} успешно создана`, {
            theme: 'bubble',
            position: 'top-right',
            duration: 3000,
          });
        }
        this.folders.push(data.folder);
        this.isVisibleAddFolderModal = false;
        this.folderName = '';
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import '~vue-context/src/sass/vue-context';
@import "../assets/scss/variables";

  .app-files {

    &-placeholder {
      margin-top: 20vh;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 100%;
      height: 100%;

      &__image {
        margin-bottom: 10px;
      }

      &__title {
        font-size: 30px;
      }
    }

    &__input {
      display: none;
    }

    &-header {
      display: flex;
      justify-content: space-between;

      &__actions {
        margin-left: auto;
        display: flex;

        button + button {
          margin-left: 10px;
        }
      }
    }

    &-content {
      position: relative;
      margin-top: 20px;
      box-shadow: 0 0 15px rgba($color-black, .2);
      border-radius: 4px;
      padding: 35px 24px 24px;
      height: calc(100vh - 90px);
      display: grid;
      grid-template-columns: repeat(auto-fill,minmax(130px,1fr));
      grid-template-rows: repeat(auto-fit,142px);
      align-items: start;
      justify-content: center;
      grid-gap: 15px;
      overflow: auto;

      &__item {
        width: 120px;
        height: 120px;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        display: flex;
        border-radius: $borderRadius;
        transition: background-color .15s ease-in;
        cursor: pointer;
        position: relative;

        &-input {
          border: none;
        }

        &:hover {
          background-color: rgba(#695CFE, .2);
        }

        &--selected {
          background-color: rgba(#695CFE, .2);
        }

        &-name {
          margin-top: 10px;
          overflow: hidden;
          word-break: break-all;
          text-align: center;
          user-select: none;
        }
      }
    }
  }
</style>

<style lang="scss">
@import "../assets/scss/variables";

.app-context-menu {
  border: none!important;
  box-shadow: none!important;
  display: flex;
  align-items: center;
  justify-content: center;

  &__item {
    cursor: pointer;
    text-decoration: none!important;
    transition: background-color .15s ease-in;
    display: flex;
    align-items: center;
    padding: 10px;

    &-text {
      margin-left: 15px;
    }

    &:hover {
      background-color: rgba(#695CFE, .2)!important;
    }
  }
}

</style>

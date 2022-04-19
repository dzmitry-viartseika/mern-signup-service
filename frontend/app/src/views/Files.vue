<template>
  <div class="app-files">
    <div class="app-files-header">
      <h1 class="app__title">
        Files
      </h1>
      <button
        class="app__btn app__btn--primary"
      >
        Add file
      </button>
      <button
        class="app__btn app__btn--primary"
        @click="modalActions(true)"
      >
        Create Folder
      </button>
    </div>
    <div
      class="app-files-content"
      @contextmenu.prevent.stop="$refs.contextMenu.open"
    >
      <div
        v-for="folder in folders"
        :key="folder._id"
        class="app-files-content__item"
        :class="{'app-files-content__item--selected': selectedFolder === folder._id}"
        @click="selectedFolder = folder._id"
        @contextmenu.prevent.stop="selectFolder(folder._id)"
      >
        <svgicon
          class="icon"
          name="FolderFiles"
          width="60"
          height="60"
        />
        <div class="app-files-content__item-name">
          {{ folder.name }}
        </div>
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
      <vue-context ref="contextMenu">
        <li>
          <a @click.prevent="modalActions(true)">Создать папку</a>
        </li>
        <li>
          <a @click.prevent="false">Загрузить файл</a>
        </li>
      </vue-context>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';
import ModalTemplateWithAction from '@/components/Modals/ModalTemplateWithAction.vue';
import TextInput from '@/components/Elements/TextInput.vue';
import validationErrorMessage from '@/locales/validationErrorMessage';
import FolderService from '@/services/Folder/FolderService';
import VueContext from 'vue-context';
import '@/assets/icons/FolderFiles';

@Component({
  components: {
    ModalTemplateWithAction,
    TextInput,
    VueContext,
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

  selectedFolder: string = '';

  async created() {
    try {
      const user = this.$store.getters.user;
      const { data } = await FolderService.getAllFilesByUserId(user.id);
      this.folders = data.folders;
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
    // ref.$refs.list.style.top = `${top - ref.optimizedHeight}px`;
  }

  selectFolder(id: string): void {
    // eslint-disable-next-line no-console
    console.log('selectFolder');
    this.selectedFolder = id;
  }

  modalActions(data: boolean): void {
    this.isVisibleAddFolderModal = data;
  }

  async addNewFolder(): Promise<void> {
    const result = await this.$validator.validateAll({
      folderName: this.folderName,
    });

    if (result) {
      try {
        const { showNotify, _id } = this.$store.getters.user;
        // eslint-disable-next-line no-console
        console.log('showNotify', showNotify);
        const { data } = await FolderService.createFolder(this.folderName, '123', _id, 2);
        // eslint-disable-next-line no-console
        console.log('data', data.folder);
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

  .app-files {

    &-header {
      display: flex;
      justify-content: space-between;
    }

    &-context-menu {
      width: 15%;
      height: 150px;
      padding: 5px 4px;
      display: none;
      position: absolute;
      background: red;
    }

    &-content {
      position: relative;
      margin-top: 20px;
      box-shadow: 0 0 15px rgba(black, .2);
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
        //border-radius: $borderRadius;
        transition: background-color .15s ease-in;
        cursor: pointer;

        &:hover {
          background-color: rgba(#695CFE, .2);
        }

        &--selected {
          background-color: rgba(#695CFE, .2);
        }

        &-name {
          margin-top: 10px;
        }
      }
    }
  }
</style>

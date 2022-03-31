<template>
  <div class="app-profile">
    <loader-template v-if="!Object.keys(userData).length" />
    <div
      v-else
      class="app-profile-form"
    >
      <!--      <div class="avatar">-->
      <!--        <input class="avatar__file" type="file">-->
      <!--        <img class="avatar__image" src="../assets/images/placeholders/avatar.jpg" alt="">-->
      <!--      </div>-->
      <div
        class="profile-pic"
        :class="{'disabled': !isEditMode}"
      >
        <label
          class="-label"
          :class="{'active': isEditMode}"
          for="file"
        >
          <span>
            <svgicon
              class="camera"
              name="Camera"
              width="50"
              height="50"
              @click="editProfile"
            />
          </span>
        </label>
        <svgicon
          v-if="isEditMode"
          class="delete"
          name="Delete"
          width="50"
          height="50"
          @click="deletePhoto"
        />
        <input
          id="file"
          ref="file"
          type="file"
          @change="imageHandler($event)"
        >
        <img
          v-if="!userData.avatar"
          src="../assets/images/placeholders/avatar.jpg"
          width="200"
        >
        <img
          v-else
          :src="userData.avatar"
          width="200"
        >
      </div>
      <div class="app-profile-form app-profile--language">
        <h2>Язык интерфейса</h2>
        <dropDown
          :dropdown-options="dropdownOptions"
          custom-class="app-dropdown--profile"
          @changeDropdown="changeLanguage"
        />
      </div>
      <div class="app-profile-form app-content">
        <div class="app-edit">
          <h2>Основные сведения</h2>
          <svgicon
            name="Edit"
            width="16"
            height="16"
            @click="editProfile"
          />
        </div>
        <div class="form-field">
          <text-input
            :value="userData.firstName"
            input-type="text"
            label-text="Имя"
            :disabled="!isEditMode"
          />
        </div>
        <div class="form-field">
          <text-input
            :value="userData.lastName"
            input-type="text"
            label-text="Фамилия"
            :disabled="!isEditMode"
          />
        </div>
        <div class="form-field">
          <div class="text-field">
            <label class="text-field__label">
              Телефон
            </label>
            <vue-tel-input
              v-model="userData.phoneNumber"
              :disabled="!isEditMode"
              :show-dial-code-in-selection="true"
              mode="international"
            />
          </div>
        </div>
        <div class="form-field">
          <text-input
            :value="userData.email"
            input-type="email"
            label-text="Почта"
            :disabled="true"
          />
        </div>
      </div>
      <hr>
      <div
        v-if="!isEditMode"
        class="app-edit"
      >
        <h2>Пароль</h2>
        <svgicon
          name="Edit"
          width="16"
          height="16"
          @click="showModalChangingPassword = true"
        />
      </div>
      <div
        v-if="isEditMode"
        class="app-action"
      >
        <button
          class="app__btn app__btn--primary"
          @click="cancelEdit"
        >
          Отменить
        </button>
        <button
          class="app__btn app__btn--primary"
          @click="saveProfile"
        >
          Сохранить
        </button>
      </div>
    </div>
    <modal-template
      v-if="showModalChangingPassword"
      width="400px"
    >
      <div
        slot="content"
        class="app-modal__content"
      >
        <div>
          <span>
            <template v-if="!$validator.errors.has('userPassword')">
              <template v-if="isVisiblePassword">
                <svgicon
                  name="Eye"
                  width="16"
                  height="16"
                />
              </template>
              <template v-else>
                <svgicon
                  name="Eye-hidden"
                  width="16"
                  height="16"
                />
              </template>
            </template>
          </span>
          <text-input
            :value.sync="userPassword"
            :input-type="isVisiblePassword ? 'text' : 'password'"
            :label-text="$t('signInPage.password')"
            :placeholder-text="$t('signInPage.inputPasswordPlaceholder')"
            :error-status="$validator.errors.has('userPassword')"
          />
          <transition name="fade-el">
            <div
              v-if="$validator.errors.has('userPassword')"
              class="validation"
            >
              {{ $validator.errors.first('userPassword') }}
            </div>
          </transition>
        </div>
        <button
          class="app__btn app__btn--primary"
        >
          {{ $t('global.agreeButton') }}
        </button>
      </div>
    </modal-template>
  </div>
</template>

<script lang="ts">
import { VueTelInput } from 'vue-tel-input';
import { IUser } from '@/model/IUser';
import { Component, Vue } from 'vue-property-decorator';
import TextInput from '@/components/Elements/TextInput.vue';
import UsersService from '@/services/Users/UsersService';
import ModalTemplate from '@/components/Modals/ModalTemplate.vue';
import LoaderTemplate from '@/components/Elements/LoaderTemplate.vue';
import '@/assets/icons/Edit';
import '@/assets/icons/Camera';
import '@/assets/icons/Delete';
import DropDown from '@/components/Elements/DropDown.vue';

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

interface IDropDownOptions {
  list: IItemDropDown[];
  value: string;
}

interface IItemDropDown {
  code: string;
  text: string;
}

@Component({
  components: {
    TextInput,
    ModalTemplate,
    VueTelInput,
    LoaderTemplate,
    DropDown,
  },
  metaInfo() {
    return {
      title: 'Settings',
      meta: [
        {
          name: 'description',
          content: 'App Settings',
        },
      ],
    };
  },
})
export default class Settings extends Vue {
  file = '';

  isEditMode = false;

  showModalChangingPassword = false;

  cachedUser: IUser = {} as IUser;

  userData: IUser = {} as IUser;

  get language(): string {
    return this.$i18n.locale;
  }

  set language(data: string) {
    this.$i18n.locale = data;
  }

  get dropdownOptions(): IDropDownOptions {
    return {
      list: [
        {
          code: 'ru',
          text: 'Russian',
        },
        {
          code: 'en',
          text: 'English',
        },
      ],
      value: this.language,
    };
  }

  changeLanguage(code: string): void {
    this.language = code;
    localStorage.setItem('language', code);
    this.$root.$i18n.locale= code;
  }

  async mounted(): Promise<any> {
    this.language = localStorage.getItem('language') || this.$i18n.locale;
    if (Object.keys(this.$store.getters.user).length === 0) {
      const response = await UsersService.getCurrentUser();
      this.userData = response.data;
    } else {
      this.userData = this.user;
      this.cachedUser =  JSON.parse(JSON.stringify(this.$store.getters.user));
    }
  }

  deletePhoto(): void {
    this.userData.avatar = '';
  }

  editProfile(): void {
    this.isEditMode = !this.isEditMode;
  }

  get user(): IUser {
    return this.$store.getters.user;
  }

  set user(data: IUser) {
    this.$store.dispatch('setUser', data);
  }

  async imageHandler(event?: HTMLInputEvent): Promise<void> {
    this.isEditMode = true;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        /* eslint-disable */
        /* tslint:disable */
        // @ts-ignore
        this.file = this.$refs!.file!.files[0];
        this.userData.avatar = reader.result;
      }
    };
    if (event) {
      const target = event.target as HTMLInputElement;
      const files = target.files;
      reader.readAsDataURL(files![0]);
    }
  }

  cancelEdit(): void {
    this.isEditMode = false;
    this.userData = { ...this.user };
    this.user = { ...this.userData };
  }

  async saveProfile(): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('file', this.file);
      const response = await UsersService.updateUser(this.$store.getters.user.email, this.userData);
      this.user = response.data;
    } catch (e) {
      console.error(e);
    } finally {
      this.isEditMode = false;
    }
  }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";

  .app-profile {
    max-width: 600px;
    margin: 50px auto;
    width: 100%;

    &--language {
      width: 100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;

      h2 {
        margin-bottom: 10px;
      }
    }

    &-form {
      padding-top: 50px;
    }
  }

  .app-avatar {
    display: grid;
    justify-content: center;

    img {
      width: 160px;
      height: 160px;
    }
  }

  .app-edit {
    display: grid;
    grid-template-columns: 95% 5%;
  }

  .app-action {
    display: grid;
    grid-template-columns: 150px 150px;
    justify-content: space-between;
    margin-top: 20px;
    grid-gap: 1fr;
  }

  .avatar__file {
    border-radius: 50%;
    height: 150px;
    width: 150px;
    background: red;
    display: grid;
    justify-content: center;
    position: absolute;
    z-index: 0;
  }

  .avatar {
    border-radius: 50%;
    height: 150px;
    width: 150px;
    display: grid;
    justify-content: center;
  }

  .avatar__image {
    border-radius: 50%;
    height: 100%;
    width: 100%;
    z-index: 1;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      width: 150px;
      height: 150px;
      background: #e41111;
      top: 0;
      left: 0;
      z-index: 100;
    }
  }

  $circleSize: 165px;
  $radius: 100px;
  $shadow: 0 0 10px 0 rgba(255,255,255,.35);
  $fontColor: rgb(250,250,250);

  @mixin object-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .profile-pic {
    color: transparent;
    transition: all .3s ease;
    @include object-center;
    position: relative;
    transition: all .3s ease;

    input {
      display: none;
    }

    img {
      position: absolute;
      object-fit: cover;
      width: $circleSize;
      height: $circleSize;
      box-shadow: $shadow;
      border-radius: $radius;
      z-index: 0;
    }

    .-label {
      cursor: pointer;
      height: $circleSize;
      width: $circleSize;
      display: flex;
      align-items: center;
      justify-content: center;

      svg {
        fill: white;
      }

      span {
        position: relative;
        top: 10px;
        left: 10px;
      }
    }

    .-label.active {
      @include object-center;
      background-color: rgba($color-black,.3);
      z-index: 10000;
      color: $fontColor;
      transition: background-color .2s ease-in-out;
      border-radius: $radius;
      margin-bottom: 0;
    }

    .camera {
      display: inline-flex;
      padding: .2em;
      height: 2em;
    }
  }

  .disabled {
    pointer-events: none;
    cursor: default;
  }

  .text-field {
    margin-bottom: 15px;

    &__label {
      color: $color-silver-chalice;
      font: 10px Ubuntu-medium, sans-serif;
      line-height: 1.55;
    }
  }

</style>

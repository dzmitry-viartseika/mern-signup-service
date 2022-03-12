<template>
  <div class="app-profile">
    <div class="app-profile-form">
<!--      <div class="avatar">-->
<!--        <input class="avatar__file" type="file">-->
<!--        <img class="avatar__image" src="../assets/images/placeholders/avatar.jpg" alt="">-->
<!--      </div>-->
      <div class="profile-pic"
           :class="{'disabled': !isEditMode}"
      >
        <label class="-label"
               for="file">
          <span class="glyphicon glyphicon-camera"></span>
          <span>Change Image</span>
        </label>
        <input type="file" id="file" ref="file" @change="imageHandler($event)"/>
        <img
          v-if="!user.avatar"
          src="../assets/images/placeholders/avatar.jpg"
          width="200" />
        <img
          v-else
          :src="user.avatar"
          width="200" />
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
            :value.sync="user.firstName"
            input-type="text"
            label-text="Имя"
            :disabled="!isEditMode"
          />
        </div>
        <div class="form-field">
          <text-input
            :value.sync="user.lastName"
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
              v-model="user.phoneNumber"
              :disabled="!isEditMode"
              :showDialCodeInSelection="true"
              mode="international"
            />
          </div>
        </div>
        <div class="form-field">
          <text-input
            :value.sync="user.email"
            input-type="email"
            label-text="Почта"
            :disabled="true"
          />
        </div>
      </div>
      <hr>
      <div class="app-edit" v-if="!isEditMode">
        <h2>Пароль</h2>
        <svgicon
          name="Edit"
          width="16"
          height="16"
          @click="showModalChangingPassword = true"
        />
      </div>
      <div class="app-action"
           v-if="isEditMode"
      >
        <button
          class="app__btn app__btn--primary"
          @click="cancelEdit"
        >Отменить</button>
        <button
          class="app__btn app__btn--primary"
          @click="saveProfile"
        >Сохранить</button>
      </div>
    </div>
    <modal-template
      v-if="showModalChangingPassword"
    >
      <div slot="content" class="app-modal__content">
        <div>
          <span  @click="isVisiblePassword = !isVisiblePassword">
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
            :errorStatus="$validator.errors.has('userPassword')"
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
<!--        <button-->
<!--          class="app__btn app__btn&#45;&#45;primary"-->
<!--        >-->
<!--          {{ $t('global.agreeButton') }}-->
<!--        </button>-->
      </div>
    </modal-template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { VueTelInput } from 'vue-tel-input';
import { namespace } from 'vuex-class';
import { IUser } from '@/model/IUser';
import Component from 'vue-class-component';
import TextInput from '@/components/Elements/TextInput.vue';
import UsersService from '@/services/Users/UsersService';
import ModalTemplate from '@/components/Modals/ModalTemplate.vue';
import '@/assets/icons/Edit';

const User = namespace('User');

@Component({
  components: {
    TextInput,
    ModalTemplate,
    VueTelInput,
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
  @User.State
  public user: IUser;

  file = '';

  isEditMode = false;

  showModalChangingPassword = false;

  editProfile(): void {
    this.isEditMode = !this.isEditMode;
  }

  imageHandler(e): void {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        const { file = [] } = this.$refs.file.files[0];
        this.file = file;
        this.avatar = reader.result;
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  }

  cancelEdit(): void {
    this.isEditMode = false;
  }

  async saveProfile(): void {
    try {
      const formData = new FormData();
      formData.append('file', this.file);
      // const file = await UploadService.upload(formData);
      // console.log('file', file.data.id);
      // updatedUser.avatar = file.data.id;
      const user = await UsersService.updateUser(this.user.email, this.user);
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
    margin: 0 auto;
    width: 100%;
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
    grid-template-columns: 40% 40%;
    justify-content: space-between;
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
    }

    &:hover {
      .-label {
        @include object-center;
        background-color: rgba(0,0,0,.8);
        z-index: 10000;
        color: $fontColor;
        transition: background-color .2s ease-in-out;
        border-radius: $radius;
        margin-bottom: 0;
      }
    }

    span {
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

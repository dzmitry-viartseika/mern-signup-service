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
        <input id="file" type="file" onchange="loadFile(event)"/>
        <img src="../assets/images/placeholders/avatar.jpg"
             id="output" width="200" />
      </div>
      <div class="app-profile-form app-content">
        <div class="app-edit">
          <h2>Основные сведения</h2>
          <svgicon
            name="Eye"
            width="16"
            height="16"
            @click="editProfile"
          />
        </div>
        <div class="form-field">
          <text-input
            :value.sync="userName"
            input-type="text"
            label-text="Имя"
            :disabled="!isEditMode"
          />
          <transition name="fade-el">
            <div
              v-if="$validator.errors.has('userName')"
              class="validation"
            >
              {{ $validator.errors.first('userName') }}
            </div>
          </transition>
        </div>
        <div class="form-field">
          <text-input
            :value.sync="userSurname"
            input-type="text"
            label-text="Фамилия"
            :disabled="!isEditMode"
          />
          <transition name="fade-el">
            <div
              v-if="$validator.errors.has('userSurname')"
              class="validation"
            >
              {{ $validator.errors.first('userSurname') }}
            </div>
          </transition>
        </div>
        <div class="form-field">
          <text-input
            :value.sync="phoneNumber"
            input-type="text"
            label-text="Телефон"
            :disabled="!isEditMode"
          />
          <transition name="fade-el">
            <div
              v-if="$validator.errors.has('phoneNumber')"
              class="validation"
            >
              {{ $validator.errors.first('phoneNumber') }}
            </div>
          </transition>
        </div>
        <div class="form-field">
          <text-input
            :value.sync="userEmail"
            input-type="email"
            label-text="Почта"
            :disabled="true"
          />
          <transition name="fade-el">
            <div
              v-if="$validator.errors.has('userEmail')"
              class="validation"
            >
              {{ $validator.errors.first('userEmail') }}
            </div>
          </transition>
        </div>
      </div>
      <hr>
      <div class="app-edit" v-if="!isEditMode">
        <h2>Пароль</h2>
        <svgicon
          name="Eye"
          width="16"
          height="16"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { namespace } from 'vuex-class';
import { IUser } from '@/model/IUser';
import Component from 'vue-class-component';
import TextInput from '@/components/Elements/TextInput.vue';

const User = namespace('User');

@Component({
  components: {
    TextInput,
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

  userName = '';

  userSurname = '';

  phoneNumber = '';

  userEmail = '';

  isEditMode = false;

  created() {
    console.log('user', this.user);
    const { email } = this.user;
    this.userEmail = email;
  }

  editProfile(): void {
    console.log('wwww');
    this.$notify('text');
    this.isEditMode = !this.isEditMode;
  }

  cancelEdit(): void {
    this.isEditMode = false;
  }

  saveProfile(): void {
    this.isEditMode = false;
  }
}
</script>

<style scoped lang="scss">
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
</style>

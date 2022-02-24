<template>
  <div class="app-profile">
    <div class="app-profile-form">
      <div class="app-profile-form app-avatar">
        <img src="../assets/images/placeholders/avatar.svg" alt="">
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
            :disabled="!isEditMode"
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

  editProfile(): void {
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
</style>

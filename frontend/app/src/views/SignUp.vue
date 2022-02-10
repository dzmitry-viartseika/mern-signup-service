<template>
  <div class="app-container">
    <div class="app-registration">
      <h2 class="app-registration__title">
        Регистрация
      </h2>
      <div class="app-registration__form">
        <text-input
          :value.sync="userEmail"
          label-text="Почта"
        />
        <text-input
          :value.sync="userPassword"
          label-text="Пароль"
        />
        <button @click="signUp">Регистрация</button>
      </div>
      <div class="app-registration__footer">
        Уже есть аккаунт?
        <a href="/sign-in">Войти</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import TextInput from '@/components/Elements/TextInput.vue';

@Component({
  components: {
    TextInput,
  },
})
export default class SignUp extends Vue {
  userEmail = '';

  userPassword = '';

  signUp(): void {
    console.log('userPassword', this.userPassword);
    console.log('userEmail', this.userEmail);
  }
}
</script>

<style scoped lang="scss">
  .app-container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
    background-color: #f9f9f9;
  }

  .app-registration {
    font-family: Uni Neue,Helvetica Neue,Helvetica,Arial,Lucida Grande,sans-serif;
    font-weight: 400;
    display: flex;
    width: 487px;
    padding: 60px;
    align-items: center;
    justify-content: center;
    margin: auto;
    flex-direction: column;
    background: #fff;
  }
</style>

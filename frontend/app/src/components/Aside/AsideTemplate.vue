<template>
  <nav
    class="sidebar"
    :class="{'close': isShortAside}"
  >
    <header>
      <div class="image-text">
        <span class="image">
          <img
            src="../../assets/images/logo.png"
            alt=""
          >
        </span>

        <div class="text logo-text">
          <span class="name">Codinglab</span>
          <!--          <span class="profession">Web developer</span>-->
        </div>
      </div>

      <svgicon
        class="toggle"
        name="ChevronBarLeft"
        width="16"
        height="16"
        @click="hideAside"
      />
    </header>

    <nav class="admin-left-sidebar-menu">
      <template
        v-for="(item, index) in navList"
      >
        <a
          :key="item.id"
          class="admin-left-sidebar-menu__item"
          :href="`#${item.route}`"
          :class="[
            {'admin-left-sidebar-menu__item--active': activeMenuItem === item.route},
            {'admin-left-sidebar-menu__item_height': item.children}
          ]"
          @click.stop.prevent="proceedTo(item.route, item.children)"
        >
          <div class="admin-left-sidebar-menu__content">
            <svgicon
              class="icon"
              :name="item.icon"
              width="20"
              height="20"
            />
            <transition
              name="fade-content"
              mode="out-in"
              tag="div"
            >
              <span
                v-if="!isShortAside"
                :key="index"
              >
                {{ $t(`${item.name}`) }}
              </span>
            </transition>
          </div>
          <div
            v-if="item.children && isVisibleDropDown"
            class="admin-left-sidebar-menu__dropdown"
          >
            <transition-group name="fade-el">
              <div
                v-for="el in item.children"
                :key="el.id"
                class="admin-left-sidebar-menu__dropdown-item"
                :class="{'admin-left-sidebar-menu__dropdown-item--active': el.route === activeSubMenuItem
                  || el.route === activeSubMenuItem}"
                @click.stop.prevent="proceedTo(el.route)"
              >
                {{ $t(`${el.name}`) }}
              </div>
            </transition-group>
          </div>
        </a>
      </template>
    </nav>

    <div
      class="bottom-content"
    >
      <li>
        <a
          @click.prevent="modalActions(true)"
        >
          <svgicon
            class="icon"
            name="Message"
            width="22"
            height="22"
          />
          <span
            class="text nav-text"
          >
            {{ $t('supportTeam.improveService') }}
          </span>
        </a>
      </li>
      <li>
        <a
          @click.prevent="logOut"
        >
          <svgicon
            class="icon icon--logout"
            name="LogOut"
            width="22"
            height="22"
          />
          <span
            class="text nav-text"
          >
            {{ $t('asideMenu.logout') }}
          </span>
        </a>
      </li>

      <li class="mode">
        <div class="sun-moon">
          <i class="bx bx-moon icon moon" />
          <i class="bx bx-sun icon sun" />
        </div>
        <span class="mode-text text">
          <template v-if="toggleValue">
            Dark mode
          </template>
          <template v-else>
            Light mode
          </template>
        </span>
        <Toggle
          text="wertey"
          :value.sync="toggleValue"
          @setToggleVal="setToggleVal"
        />
        <div class="toggle-switch">
          <span class="switch" />
        </div>
      </li>
    </div>

    <transition name="fade-el">
      <!--      // TODO проверить placeholder-->
      <modal-template-with-action
        v-if="isVisibleWishesModal"
        :modal-title="$t('supportTeam.wishes')"
        placeholder="Describe yourself here..."
        @modalActions="modalActions"
        @actionButton="sendWishes"
      >
        <div slot="content">
          <h2 class="app-modal__subtitle app-modal__subtitle--middle">
            {{ $t('supportTeam.modalTitle') }}
          </h2>
          <div class="form-field">
            <textarea-template
              :value.sync="wishesValue"
              :label="$t('supportTeam.wishes')"
              :required="true"
              :error-status="$validator.errors.has('wishesValue')"
            />
            <transition name="fade-el">
              <div
                v-if="$validator.errors.has('wishesValue')"
                class="validation validation--textarea"
              >
                {{ $validator.errors.first('wishesValue') }}
              </div>
            </transition>
          </div>
        </div>
      </modal-template-with-action>
    </transition>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import '@/assets/icons/Eye';
import '@/assets/icons/Bell';
import '@/assets/icons/House';
import '@/assets/icons/Person';
import '@/assets/icons/Chart';
import '@/assets/icons/Calendar';
import '@/assets/icons/LogOut';
import '@/assets/icons/Message';
import '@/assets/icons/ChevronBarLeft';
import Component from 'vue-class-component';
import asideMenuItems from '@/constants/AsideMenuItems';
import { IAsideItem } from '../../model/aside/IAsideItem';
import Toggle from '@/components/Elements/Toggle.vue';
import TextareaTemplate from '@/components/Elements/TextareaTemplate.vue';
import ModalTemplateWithAction from '@/components/Modals/ModalTemplateWithAction.vue';
import validationErrorMessage from '@/locales/validationErrorMessage';
import WishesService from '@/services/Wishes/Wishes';
import { IUser } from '@/model/IUser';

@Component({
  components: {
    ModalTemplateWithAction,
    Toggle,
    TextareaTemplate,
  },
})
export default class AsideTemplate extends Vue {

  isShortAside: boolean | null = false;

  toggleValue: boolean = false;

  isVisibleWishesModal: boolean | null = false;

  showSubmenuActive: boolean = false;

  isVisibleDropDown: boolean = false;

  activeSubMenuItem: string = '';
  activeMenuItem: string = '';

  navList: IAsideItem[] = [];

  wishesValue = '';

  get userInfo(): IUser {
    return this.$store.getters.user;
  }

  beforeMount(): void {
    const dict = {
      en: {
        custom: {
          wishesValue: {
            required: validationErrorMessage.en.inputRequired,
          },
        },
      },
      ru: {
        custom: {
          wishesValue: {
            required: validationErrorMessage.ru.inputRequired,
          },
        },
      },
    };
    this.$validator.localize(dict);
    this.$validator.attach({ name: 'wishesValue', rules: { required: true } });
  }

  setToggleVal(data: boolean): void {
    this.toggleValue = data;
    localStorage.setItem('mode', data ? 'dark': '');
    const body = document.querySelector('body');
    if (!!data) {
      body.setAttribute('class', 'dark');
    } else {
      body.setAttribute('class', 'light');
    }
  }

  async sendWishes(): Promise<void> {
    const result = await this.$validator.validateAll({
      wishesValue: this.wishesValue,
    });
    if (result) {
      try {
        const email = this.userInfo.email;
        await WishesService.sendWishesTextToEmail(email, this.wishesValue);
      } catch (e) {
        console.error(e);
      } finally {
        this.isVisibleWishesModal = false;
      }
    }
  }

  // async mounted() {
  //   if (Object.keys(this.$store.getters.user).length === 0) {
  //     const response = await UsersService.getCurrentUser();
  //     this.$store.dispatch('setUser', response.data);
  //   }
  // }

  created(): void {
    this.activeMenuItem = this.$route.path;
    if (this.$route.name === 'Others' || this.$route.name === 'Test') {
      this.isVisibleDropDown = true;
      this.activeSubMenuItem = this.$route.path;
    }
    this.navList = asideMenuItems;
    const mode = localStorage.getItem('mode');
    const body = document.querySelector('body');
    if (!!mode) {
      this.toggleValue = !!mode;
      body.setAttribute('class', 'dark');
    } else {
      body.setAttribute('class', 'light');
    }
  }

  showSubmenu(): void {
    // eslint-disable-next-line no-console
    console.log('showSubmenuActive');
    this.showSubmenuActive = true;
  }

  hideAside(): void {
    this.isShortAside = !this.isShortAside;
  }

  logOut(): void {
    // this.setUser(null);
    localStorage.removeItem('token');
    this.$store.dispatch('setUser', {});
    this.$router.push('/sign-in');
  }

  modalActions(data: boolean): void {
    this.isVisibleWishesModal = data;
  }

  proceedTo(page: string, sub: any[] = []): void {
    this.isVisibleDropDown = !!sub.length;
    if (sub.length) {
      const { route } = sub[0];
      this.$router.push(route);
      this.activeSubMenuItem = route;
    }
    this.activeMenuItem = page;
    this.$router.push(page);
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

.dark .sidebar {
  background: yellow;
}

  .app--short {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidebar {
    position: relative;
    top: 0;
    left: 0;
    width: 250px;
    min-width: 250px;
    padding: 10px 14px;
    background: #E4E9F7;
    transition: all 0.3s ease;
    z-index: 100;
  }

  .sidebar.close{
    width: 88px;
    min-width: 88px;

    .icon--logout {
      top: 2px;
    }
  }

  .icon--logout {
    left: 4px;
  }

  /* ===== Reusable code - Here ===== */
  .sidebar li{
    height: 50px;
    list-style: none;
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .sidebar header .image,
  .sidebar .icon{
    min-width: 60px;
    border-radius: 6px;
  }

  .icon {

    &--logout {
      position: relative;
      top: 3px;
    }
  }

  .sidebar .icon{
    min-width: 60px;
    border-radius: 6px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .sidebar .text,
  .sidebar .icon{
    color: #707070;
    transition: all 0.3s ease;
  }

  .sidebar .text{
    font-size: 17px;
    font-weight: 500;
    white-space: nowrap;
    opacity: 1;
    min-width: 100px;
  }
  .sidebar.close .text{
    opacity: 0;
  }

  .sidebar header{
    position: relative;
  }

  .sidebar header .image-text{
    display: flex;
    align-items: center;
  }
  .sidebar header .logo-text{
    display: flex;
    flex-direction: column;
  }
  header .image-text .name {
    margin-top: 2px;
    font-size: 18px;
    font-weight: 600;
  }

  header .image-text .profession{
    font-size: 16px;
    margin-top: -2px;
    display: block;
  }

  .sidebar header .image{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .sidebar header .image img{
    width: 40px;
    border-radius: 6px;
  }

  .sidebar header .toggle{
    position: absolute;
    top: 50%;
    right: -23px;
    height: 28px;
    width: 28px;
    padding-left: 4px;
    padding-top: 4px;
    transform: translateY(-50%) rotate(0deg);
    background-color: #695CFE;
    color: #FFF;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    cursor: pointer;
    transition: var(--tran-05);
  }

  body.dark .sidebar header .toggle{
    color: #707070;
  }

  .sidebar.close .toggle{
    transform: translateY(-50%) rotate(180deg);
  }

  .sidebar .menu{
    margin-top: 40px;
  }

  .sidebar li.search-box{
    border-radius: 6px;
    background-color: var(--primary-color-light);
    cursor: pointer;
    transition: var(--tran-05);
  }

  .sidebar li.search-box input{
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
    background-color: var(--primary-color-light);
    color: #707070;
    border-radius: 6px;
    font-size: 17px;
    font-weight: 500;
    transition: var(--tran-05);
  }
  .sidebar li a{
    list-style: none;
    height: 100%;
    background-color: transparent;
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    border-radius: 6px;
    text-decoration: none;
    transition: all 0.3s ease;
  }

  .sidebar li a:hover{
    background-color: var(--primary-color);
  }
  .sidebar li a:hover .icon,
  .sidebar li a:hover .text{
    color: #FFF;
    fill: #fff;
  }
  body.dark .sidebar li a:hover .icon,
  body.dark .sidebar li a:hover .text{
    color: #707070;
  }

  .sidebar .menu-bar{
    height: calc(100% - 55px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: scroll;
  }
  .menu-bar::-webkit-scrollbar{
    display: none;
  }
  .sidebar .menu-bar .mode{
    border-radius: 6px;
    background-color: var(--primary-color-light);
    position: relative;
    transition: var(--tran-05);
  }

  .menu-bar .mode .sun-moon{
    height: 50px;
    width: 60px;
  }

  .mode .sun-moon i{
    position: absolute;
  }
  .mode .sun-moon i.sun{
    opacity: 0;
  }
  body.dark .mode .sun-moon i.sun{
    opacity: 1;
  }
  body.dark .mode .sun-moon i.moon{
    opacity: 0;
  }

  .home{
    position: absolute;
    top: 0;
    left: 250px;
    //height: 100vh;
    width: calc(100% - 250px);
    background-color: #E4E9F7;
    transition: var(--tran-05);
  }
  .home .text{
    font-size: 30px;
    font-weight: 500;
    color: #707070;
    padding: 12px 60px;
  }

  .sidebar.close ~ .home{
    left: 78px;
    //height: 100vh;
    width: calc(100% - 78px);
  }
  body.dark .home .text{
    color: #707070;
  }

  .nav-link.active {
    background-color: #695CFE;
    border-radius: 6px;

    svg {
      fill: $color-white;
    }

    .text.nav-text {
      color: #fff;
    }
  }

  .sidebar li a:hover{
    background-color: #695CFE;
  }


.admin-left-sidebar {
  display: flex;
  flex-direction: column;
  min-width: 66px;
  max-width: 66px;
  background: $color-white;
  padding: 21px 0 0;
  justify-content: space-between;
  position: sticky;
  top: 0;
  transition: all .15s ease-in;
  z-index: 10;
  height: 98vh;

  &--active {
    min-width: 240px;
    max-width: 240px;

    .logout {

      &__content {
        padding: 0 25px;
      }
    }

    .account {
      padding: 0 25px;
    }
  }

  &__scroll {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 98vh;
  }

  &-toggle {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: -15px;
    bottom: 59px;
    min-width: 28px;
    max-width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid $color-gallery;
    background: $color-white;
    transition: background-color .15s ease-in;
    cursor: pointer;

    i {
      color: $color-silver-chalice;
      font-size: $font-size-small;
      transition: color .15s ease-in;
      position: relative;
    }

    &:hover {
      background: green;

      i {
        color: $color-dodger-blue;
      }
    }

    &--active {
      i {
        transform: rotate(180deg);
        top: -1px;
        left: -1px;
      }
    }
  }

  &__image {
    max-width: 163px;
    position: relative;

    &_mini {
      max-width: 26px;
    }
  }

  &__logo {
    margin-bottom: 20px;
    padding: 0 20px;
    cursor: pointer;
    width: 100%;
    max-height: 30px;
    min-height: 30px;

    &_full {
      img {
        left: 2px;
      }
    }
  }

  &-popup {
    position: fixed;
    width: 195px;
    background: $color-white;
    min-height: 46px;
    padding: 12px 0;
    left: 70px;
    top: 72px;
    box-shadow: 0 0 8px rgba($color-black, .04);
    border-radius: $borderRadius;
    display: flex;
    align-items: center;
    z-index: 10;

    &:before {
      content: '';
      position: absolute;
      left: -4px;
      width: 4px;
      height: 100%;
      background: transparent;
    }

    &__list {
      width: 100%;
    }

    &__title {
      top: 0;
      color: $color-silver-chalice !important;
      padding: 0 16px;

      &_disabled {
        cursor: default;
        color: $color-silver-chalice;
      }
    }

    &:hover {
      .admin-left-sidebar-popup{
        &__title {
          color: $color-dodger-blue !important;
        }
      }
    }

    &_no-hover {
      &:hover {
        .admin-left-sidebar-popup{
          &__title {
            color: $color-silver-chalice !important;
          }
        }
      }
    }
  }

  &-menu {
    display: flex;
    flex-direction: column;
    margin-top: 50px;

    &__dropdown {
      padding:  12px 10px 10px 60px;

      &-item {
        font: $font-size-md $font-global;
        display: flex;
        align-items: center;
        height: 26px;

        &--active {
          font: $font-size-md $font-global-medium;
        }
      }

      &_alt {
        padding: 0;
        margin-top: 16px;
        border-top: 1px solid $color-gallery;

        .admin-left-sidebar-menu {
          &__dropdown {
            &-item {
              padding: 0 16px;
              height: 34px;
              color: $color-silver-chalice;
              font-family: $font-global;

              &:hover {
                background: $color-alabaster;
              }
            }
          }
        }
      }
    }

    &__content {
      display: flex;
    }

    &__item {
      display: block;
      padding: 15px 0;
      position: relative;
      cursor: pointer;
      transition: background-color .15s ease-in;
      user-select: none;
      text-decoration: none;

      & + .admin-left-sidebar-menu__item {
        margin-top: 7px;
      }

      &:focus {

        span {
          color: $color-white;
        }
      }

      span {
        color: $color-silver-chalice;
        text-decoration: none;
        transition: all .15s ease-in;
        display: inline-block;
        width: 100%;
        white-space: nowrap;
        position: relative;
        top: 1px;
      }

      &--active {
        background: #695CFE;
        border-radius: 5px;

        span, i {
          color: $color-white;
        }

        .icon {
          fill: $color-white;
        }
      }

      &_height {
        padding-bottom: 14px;
        min-height: 105px;
      }
    }
  }

  //&__bottom {
  //  position: absolute;
  //  bottom: 0;
  //}
}

.sidebar {
  display: flex;
  flex-direction: column;

  .header {
    flex: 0 0 auto;
  }

  nav {
    flex: 1 0 auto;
  }

  .bottom-content {
    flex: 0 0 auto;
  }
}
</style>

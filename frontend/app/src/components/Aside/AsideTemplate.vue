<template>
  <nav class="sidebar"
       :class="{'close': isShortAside}"
  >
    <header>
      <div class="image-text">
                <span class="image">
                    <img src="../../assets/images/logo.png" alt="">
                </span>

        <div class="text logo-text">
          <span class="name">Codinglab</span>
          <span class="profession">Web developer</span>
        </div>
      </div>

      <svgicon
        class="toggle"
        name="ChevronBarLeft"
        width="16"
        height="16"
        @click="hideAside"
      />

<!--      <i class='bx bx-chevron-right toggle'></i>-->
    </header>

    <div class="menu-bar">
      <div class="menu">

        <ul class="menu-links">

          <li class="nav-link"
              v-for="item in navList"
              :key="item.id"
              :class="{'active': item.route === $route.path}"
          >
            <a
               @click.prevent="proceedTo(item.route)"
            >
              <svgicon
                class="icon"
                :name="item.icon"
                width="20"
                height="20"
              />
              <span class="text nav-text">
                {{ item.name }}
              </span>
            </a>
          </li>

        </ul>
      </div>

      <div class="bottom-content">
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
            <i class='bx bx-moon icon moon'></i>
            <i class='bx bx-sun icon sun'></i>
          </div>
          <span class="mode-text text">Dark mode</span>

          <div class="toggle-switch">
            <span class="switch"></span>
          </div>
        </li>

      </div>
    </div>

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
import '@/assets/icons/ChevronBarLeft';
import Component from 'vue-class-component';
import asideMenuItems from '@/constants/AsideMenuItems';
import { IUser } from '@/model/IUser';
import { IAsideItem } from '../../model/constants/IAsideItem';

@Component({})
export default class AsideTemplate extends Vue {

  isShortAside: boolean | null = false;

  navList: IAsideItem[] = [];

  created() {
    this.navList = asideMenuItems;
  }

  hideAside(): void {
    this.isShortAside = !this.isShortAside;
  }

  logOut(): void {
    // this.setUser(null);
    localStorage.removeItem('token');
    this.$router.push('/sign-in');
  }

  proceedTo(route: string) {
    console.log('this', this.$route.path);
    this.$router.push(route);
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables";

  .app--short {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sidebar{
    position: relative;
    top: 0;
    left: 0;
    height: 100vh;
    width: 250px;
    padding: 10px 14px;
    background: #E4E9F7;
    transition: all 0.3s ease;
    z-index: 100;
  }
  .sidebar.close{
    width: 88px;
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
  }
  .sidebar.close .text{
    opacity: 0;
  }
  /* =========================== */

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

  .menu-bar .bottom-content .toggle-switch{
    position: absolute;
    right: 0;
    height: 100%;
    min-width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    cursor: pointer;
  }
  .toggle-switch .switch{
    position: relative;
    height: 22px;
    width: 40px;
    border-radius: 25px;
    background-color: var(--toggle-color);
    transition: var(--tran-05);
  }

  .switch::before{
    content: '';
    position: absolute;
    height: 15px;
    width: 15px;
    border-radius: 50%;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    background-color: #FFF;
    transition: var(--tran-04);
  }

  body.dark .switch::before{
    left: 20px;
  }

  .home{
    position: absolute;
    top: 0;
    left: 250px;
    height: 100vh;
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
    height: 100vh;
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

</style>

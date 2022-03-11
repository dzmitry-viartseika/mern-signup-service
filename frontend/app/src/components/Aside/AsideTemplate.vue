<template>
  <nav :class="{'app--short': isShortAside}">
    <div class="sidebar-top"
         @click="proceedTo('/crm/dashboard')"
    >
      <span class="shrink-btn"
            @click="hideAside"
      >
      <svgicon
        name="Eye"
        width="16"
        height="16"
      />
      </span>
      <img src="../../assets/images/logo.png" class="logo" alt="">
      <h3
        v-if="!isShortAside"
        class="hide">Aqumex</h3>
    </div>

    <div class="sidebar-links">
      <ul>
        <li
          v-for="item in navList"
          :key="item.id"
          class="tooltip-element"
          :data-tooltip="item.id"
        >
          <a @click.prevent="proceedTo(item.route)"
             :class="{'active': item.route === $route.path}" :data-active="item.id">
            <div class="icon">
              <svgicon
                :name="item.icon"
                width="16"
                height="16"
              />
            </div>
            <span
              v-if="!isShortAside"
              class="link hide">{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>

    <div class="sidebar-footer">
      <a href="#" class="account tooltip-element" data-tooltip="0">
        <i class='bx bx-user'></i>
      </a>
      <div class="admin-user tooltip-element" data-tooltip="1">
        <div class="admin-profile hide">
          <img
            v-if="!user.avatar"
            src="../../assets/images/placeholders/avatar.jpg" alt="">
          <img
            v-else
            :src="user.avatar" alt="">
          <div class="admin-info" v-if="!isShortAside">
            <h3 v-if="user.firstName">{{ user.firstName }}</h3>
<!--            <h5 v-if="user.role">{{ user.role }}</h5>-->
          </div>
        </div>
        <a @click.prevent="logOut" class="log-out">
          <svgicon
            name="Eye"
            width="16"
            height="16"
          />
        </a>
      </div>
      <div class="tooltip">
        <span class="show">John Doe</span>
        <span>Logout</span>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue';
import '@/assets/icons/Eye';
import { namespace } from 'vuex-class';
import Component from 'vue-class-component';
import asideMenuItems from '@/constants/AsideMenuItems';
import { IUser } from '@/model/IUser';
import { IAsideItem } from '../../model/constants/IAsideItem';

const User = namespace('User');

@Component({})
export default class AsideTemplate extends Vue {
  @User.State
  public user: IUser;

  @User.Mutation
  public setUser!: () => void;

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
  .app--short {
    width: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>

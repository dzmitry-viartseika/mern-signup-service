<template>
  <nav>
    <div class="sidebar-top"
         @click="proceedTo('/crm/dashboard')"
    >
      <span class="shrink-btn"
      >
        <svgicon
          name="Eye"
          width="16"
          height="16"
        />
      </span>
      <img src="../../assets/images/logo.png" class="logo" alt="">
      <h3 class="hide">Aqumex</h3>
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
            <span class="link hide">{{ item.name }}</span>
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
          <img src="../../assets/images/face-1.png" alt="">
          <div class="admin-info">
            <h3>John Doe</h3>
            <h5>Admin</h5>
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

const User = namespace('User');

@Component({})
export default class AsideTemplate extends Vue {
  @User.Mutation
  public setUser!: () => void;

  isShortAside: boolean | null = false;

  navList = [];

  created() {
    this.navList = asideMenuItems;
  }

  hideAside(): void {
    this.isShortAside = true;
  }

  logOut(): void {
    console.log('logOut');
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

<style scoped>

</style>

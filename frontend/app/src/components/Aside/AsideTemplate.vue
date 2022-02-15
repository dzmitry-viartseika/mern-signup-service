<template>
  <nav>
    <div class="sidebar-top">
      <span class="shrink-btn">
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
        <div class="active-tab"></div>
        <li class="tooltip-element" data-tooltip="0">
          <a @click.prevent="$router.push('/crm/dashboard')" class="active" data-active="0">
            <div class="icon">
              <svgicon
                name="Eye"
                width="16"
                height="16"
              />
            </div>
            <span class="link hide">Dashboard</span>
          </a>
        </li>
        <li class="tooltip-element" data-tooltip="1">
          <a @click.prevent="$router.push('/crm/settings')" data-active="1">
            <div class="icon">
              <svgicon
                name="Eye"
                width="16"
                height="16"
              />
            </div>
            <span class="link hide">Settings</span>
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

export default class AsideTemplate extends Vue {
  logOut(): void {
    this.setUser(null);
    localStorage.removeItem('token');
    this.$router.push('/sign-in');
  }
}
</script>

<style scoped>

</style>

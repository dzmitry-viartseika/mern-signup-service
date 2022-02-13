<template>
  <div class="app-dashboard">
    <nav>
      <div class="sidebar-top">
      <span class="shrink-btn">
        <svgicon
          name="Eye"
          width="16"
          height="16"
        />
      </span>
        <img src="../assets/images/logo.png" class="logo" alt="">
        <h3 class="hide">Aqumex</h3>
      </div>

      <div class="sidebar-links">
        <ul>
          <div class="active-tab"></div>
          <li class="tooltip-element" data-tooltip="0">
            <a @click.prevent="$router.push('/dashboard')" class="active" data-active="0">
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
            <a @click.prevent="$router.push('/settings')" data-active="1">
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
            <img src="../assets/images/face-1.png" alt="">
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

    <main>
      <h1>My Dashboard</h1>
      <p class="text">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur animi voluptatibus cum
        maxime distinctio
        iste quod deleniti eius, autem voluptates cumque suscipit iure quasi eligendi ullam.
        Sapiente eligendi porro
        reprehenderit corrupti error facilis quo, fugiat fugit? Maiores aliquam ad, molestiae iste
        nihil, commodi
        doloremque tempore excepturi aut id ducimus unde?
      </p>
      <p class="copyright">
        &copy; 2021 - <span>Aqumex</span> All Rights Reserved.
      </p>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';
import { namespace } from 'vuex-class';

const User = namespace('User');

@Component({
  metaInfo() {
    return {
      title: 'Dashboard',
      meta: [
        {
          name: 'description',
          content: 'App Dashboard',
        },
      ],
    };
  },
})
export default class Dashboard extends Vue {
 @User.Mutation
 public setUser!: () => void;

 logOut(): void {
   this.setUser(null);
   localStorage.removeItem('token');
   this.$router.push('/sign-in');
 }
}
</script>

<style scoped lang="scss">
@import "../assets/scss/variables";
@import
url("https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700&display=swap");

*,
*::before,
*::after {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

.app-dashboard {
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;
  background-color: #e4e2f5;
  min-height: 100vh;
  display: flex;
  position: relative;
}

a {
  text-decoration: none;
}

ul {
  list-style: none;
}

nav {
  position: sticky;
  top: 0;
  left: 0;
  height: 100vh;
  background-color: $color-dodger-blue;
  width: 16rem;
  padding: 1.8rem 0.85rem;
  color: #fff;
  display: flex;
  flex-direction: column;
  transition: width 0.5s ease-in-out;
}

nav::before {
  content: "";
  position: absolute;
  width: 2rem;
  height: 100%;
  top: 0;
  left: 100%;
}

main {
  flex: 1;
  padding: 2rem;
  color: #1f2027;
  display: flex;
  flex-direction: column;
}

main h1 {
  margin-bottom: 1rem;
}

main .copyright {
  margin-top: auto;
  font-size: 0.9rem;
}

main .copyright span {
  color: $color-dodger-blue;
  font-weight: 500;
  cursor: pointer;
}

.sidebar-top {
  position: relative;
  display: flex;
  align-items: center;
}

.sidebar-top .logo {
  width: 2.1rem;
  margin: 0 0.8rem;
}

.sidebar-top h3 {
  padding-left: 0.5rem;
  font-weight: 600;
  font-size: 1.15rem;
}

.shrink-btn {
  position: absolute;
  top: 50%;
  height: 27px;
  padding: 0 0.3rem;
  background-color: $color-dodger-blue;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 0 3px 10px -3px rgba(70, 46, 118, 0.3);
  right: -2.65rem;
  transform: translateY(-50%) translateX(-8px);
  opacity: 0;
  pointer-events: none;
  transition: 0.3s;
}

.shrink-btn i {
  line-height: 27px;
  transition: 0.3s;
}

.shrink-btn:hover {
  background-color: #3651d4;
}

nav:hover .shrink-btn,
.shrink-btn.hovered {
  transform: translateY(-50%) translateX(0px);
  opacity: 1;
  pointer-events: all;
}

.search {
  min-height: 2.7rem;
  background-color: #5872f5;
  margin: 2rem 0.5rem 1.7rem;
  display: grid;
  grid-template-columns: 2.7rem 1fr;
  align-items: center;
  text-align: center;
  border-radius: 50px;
  cursor: pointer;
}

.search input {
  height: 100%;
  border: none;
  background: none;
  outline: none;
  color: #fff;
  caret-color: #fff;
  font-family: inherit;
}

.search input::placeholder {
  color: #cfcde7;
}

.sidebar-links {
  margin-top: 20px;
}

.sidebar-links ul {
  position: relative;
}

.sidebar-links li {
  position: relative;
  padding: 2.5px 0;
}

.sidebar-links a {
  color: #cfcde7;
  font-weight: 400;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  height: 53px;
}

.icon {
  font-size: 1.3rem;
  text-align: center;
  min-width: 3.7rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
}

.icon i {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: 0.3s;
}

.icon i:last-child {
  opacity: 0;
  color: #fff;
}

.sidebar-links a.active,
.sidebar-links a:hover {
  color: #fff;
}

.sidebar-links a .link {
  transition: opacity 0.3s 0.2s, color 0.3s;
}

.sidebar-links a.active i:first-child {
  opacity: 0;
}

.sidebar-links a.active i:last-child {
  opacity: 1;
}

.active-tab {
  width: 100%;
  height: 53px;
  background-color: #3651d4;
  border-radius: 10px;
  position: absolute;
  top: 2.5px;
  left: 0;
  transition: top 0.3s;
}

.sidebar-links h4 {
  position: relative;
  font-size: 0.8rem;
  text-transform: uppercase;
  font-weight: 600;
  padding: 0 0.8rem;
  color: #cfcde7;
  letter-spacing: 0.5px;
  height: 45px;
  line-height: 45px;
  transition: opacity 0.3s 0.2s, height 0.5s 0s;
}

.sidebar-footer {
  position: relative;
  margin-top: auto;
}

.account {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.3rem;
  color: #cfcde7;
  height: 53px;
  width: 3.7rem;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s 0s, color 0.3s 0s;
}

.account:hover {
  color: #fff;
}

.admin-user {
  display: flex;
  align-items: center;
}

.admin-profile {
  white-space: nowrap;
  max-width: 100%;
  transition: opacity 0.3s 0.2s, max-width 0.7s 0s ease-in-out;
  display: flex;
  align-items: center;
  flex: 1;
  overflow: hidden;
}

.admin-user img {
  width: 2.9rem;
  border-radius: 50%;
  margin: 0 0.4rem;
}

.admin-info {
  padding-left: 0.3rem;
}

.admin-info h3 {
  font-weight: 500;
  font-size: 1rem;
  line-height: 1;
}

.admin-info h5 {
  font-weight: 400;
  font-size: 0.75rem;
  color: #cfcde7;
  margin-top: 0.3rem;
  line-height: 1;
}

.log-out {
  display: flex;
  height: 40px;
  min-width: 2.4rem;
  background-color: #3651d4;
  color: #cfcde7;
  align-items: center;
  justify-content: center;
  font-size: 1.15rem;
  border-radius: 10px;
  margin: 0 0.65rem;
  transition: color 0.3s;
}

.log-out:hover {
  color: #fff;
}

.tooltip {
  background-color: $color-dodger-blue;
  position: absolute;
  right: -1.2rem;
  top: 0;
  transform: translateX(100%) translateY(-50%);
  padding: 0 0.8rem;
  font-size: 0.85rem;
  display: none;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  height: 30px;
  align-items: center;
  border-radius: 7px;
  box-shadow: 0 3px 10px -3px rgba(70, 46, 118, 0.3);
  opacity: 0;
  pointer-events: none;
  transition: all 0.3s;
  text-align: center;
  white-space: nowrap;
}

.tooltip span {
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  opacity: 0;
  transition: 0.3s;
}

.tooltip span.show {
  opacity: 1;
}

.tooltip-element:hover ~ .tooltip {
  opacity: 1;
  pointer-events: all;
}

/* When the menu shrinks */

.hide {
  transition: opacity 0.3s 0.2s;
}

.app-dashboard.shrink nav {
  width: 5.4rem;
}

.app-dashboard.shrink .hide {
  opacity: 0;
  pointer-events: none;
  transition-delay: 0s;
}

.app-dashboard.shrink .shrink-btn i {
  transform: rotate(-180deg);
}

.app-dashboard.shrink .sidebar-links h4 {
  height: 10px;
}

.app-dashboard.shrink .account {
  opacity: 1;
  pointer-events: all;
  transition: opacity 0.3s 0.3s, color 0.3s 0s;
}

.app-dashboard.shrink .admin-profile {
  max-width: 0;
  transition: opacity 0.3s 0s, max-width 0.7s 0s ease-in-out;
}

.app-dashboard.shrink .tooltip {
  display: grid;
}
</style>

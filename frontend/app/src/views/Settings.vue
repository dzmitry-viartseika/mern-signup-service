<template>
  <div>
    Settings
    <div>
      user={{ user }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { namespace } from 'vuex-class';
import { IUser } from '@/model/IUser';
import Component from 'vue-class-component';

const User = namespace('User');

@Component({
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

  created() {
    console.log('wertey', this.user);
  }
}
</script>

<style scoped>

</style>

<template>
  <div class="app-notification">
    <div class="app-notification-header">
      <h1 class="app__title">
        Dashboard
      </h1>
      <button
        class="app__btn app__btn--primary"
        @click="acceptSettings"
      >
        Accept
      </button>
    </div>
    <h2>
      Отключить уведомления действий в системе
    </h2>
    <checkbox
      id="remember-me"
      v-model="isSendNotify"
      name="send-notify"
      :label="'Отправлять уведомление'"
    />
    <h2>
      Изменить частоту оповещений по электронной почте
    </h2>
    <SelectTemplate
      :options="periods"
      :item.sync="selectedPeriod"
      :label="'Период отправки писем'"
    />
    <!--    Отправка писем…-->

    <!--    Никогда-->
    <!--    Не отправлять письма.-->

    <!--    Периодически-->
    <!--    Отправлять письма примерно раз в час.-->

    <!--    Мгновенно-->
    <!--    Отправлять письма как можно скорее.-->
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator';
import SelectTemplate from '@/components/Elements/SelectTemplate.vue';
import Checkbox from '@/components/Elements/Checkbox.vue';
import '@/assets/icons/Eye';

@Component({
  components: {
    SelectTemplate,
    Checkbox,
  },
  metaInfo() {
    return {
      title: 'Notification',
      meta: [
        {
          name: 'description',
          content: 'App Notification',
        },
      ],
    };
  },
})
export default class Notification extends Vue {
  selectedPeriod: null | string = null;

  isSendNotify: null | boolean = null;

  periods = [
    {
      value: 'NEVER', text: 'Не отправлять письма',
    },
    {
      value: 'FROMTIMETOTIME', text: 'Периодически',
    },
    {
      value: 'INSTANTLY', text: 'Мгновенно',
    },
  ];

  created() {
    const { showNotify = true, emailNotify = 'INSTANTLY' } = this.$store.getters.user;
    this.isSendNotify = showNotify;
    this.selectedPeriod = emailNotify;
  }

  acceptSettings(): void {
    // eslint-disable-next-line no-console
    console.log('acceptSettings');
    // eslint-disable-next-line no-console
    console.log('this.selectedPeriod', this.selectedPeriod);
  }
}
</script>

<style scoped lang="scss">
  .app-notification {

    &-header {
      display: flex;
      justify-content: space-between;
    }
  }
</style>

<template>
  <div class="app-notification">
    <h1 class="app__title">
      Notification
    </h1>
    <h2>
      Отключить уведомления действий в системе
    </h2>
    <h2>
      Изменить частоту оповещений по электронной почте
    </h2>
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
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';

@Component({
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
export default class Notification extends Vue {}
</script>

<style scoped lang="scss">

</style>

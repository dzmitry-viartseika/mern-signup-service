<template>
  <div class="app-dashboard">
    <div class="app-dashboard-header">
      <h1 class="app__title">
        Dashboard
      </h1>
      <button class="app__btn app__btn--primary">
        Add user
      </button>
    </div>
    item={{ item }}
    <div>
      <text-input
        :value.sync="searchValue"
        input-type="text"
        :placeholder-text="'поиск'"
        :label-text="'Поиск'"
      />
      <SelectTemplate :options="options" :item.sync="item"/>
    </div>
    <vuetable ref="vuetable"
              :data="usersList"
              :fields="fields"
    />
    <!--    <Radio name='wertey' :value.sync="test"/>-->
    <!--    <Radio name='wertey' :value.sync="test"/>-->
    <!--    pagi-->
    <!--    <Pagination-->
    <!--      v-if="false"-->
    <!--      :data="fullInfo"-->
    <!--      :getQuery="getRequests"-->
    <!--      :limit="queryParams.perPage"-->
    <!--    />-->
    <!--    select-->
    <!--    <SelectWithKeyTemplate-->
    <!--      :settings="typeServiceSelectSettings"-->
    <!--      :class="{'error': errors.has('setActiveTypeService')}"-->
    <!--      @changeSelect="changeTypeService($event)"-->
    <!--    />-->
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import '@/assets/icons/Eye';
import UsersService from '@/services/Users/UsersService';
import Radio from '@/components/Elements/Radio.vue';
import Pagination from '@/components/Paginations/Pagination.vue';
import SelectTemplate from '@/components/Elements/SelectTemplate.vue';
import TextInput from '@/components/Elements/TextInput.vue';
import Vuetable from 'vuetable-2';
import { IUsersListResponse } from '@/model/response/IUsersListResponse';

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
  components: {
    Radio,
    Pagination,
    SelectTemplate,
    Vuetable,
    TextInput,
  },
})
export default class Dashboard extends Vue {

  options = [
    { value: 'firstName', text: 'Имя' },
    { value: 'lastName', text: 'Фамилия' },
    { value: 'phoneNumber', text: 'Телефон' },
    { value: 'role', text: 'Роль' },
  ];

  fields = [
    {
      name: 'firstName',
      sortField: 'firstName',
    },
    {
      name: 'email',
      title: 'Email Address',
    },
    {
      name: 'phoneNumber',
      sortField: 'phoneNumber',
      titleClass: 'center aligned',
      dataClass: 'center aligned',
    },
  ];

  searchValue: string = '';

  usersList: IUsersListResponse[] = [];

  item = {
    value: '',
    text: '',
  };

  test = '';

  fullInfo = {};

  allTypeServicesList: any[] = [];

  servicesList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];

  queryParams = {
    page: 1,
    perPage: 20,
    search: '',
    filter: '',
  };

  getPaginationData({ totalDocs, page, perPage }) {
    const totalPages = Math.ceil(totalDocs / perPage);
    const nextPage = totalPages > page ? page + 1 : undefined;
    const prevPage = page !== 1 ? page - 1 : undefined;
    this.fullInfo = {
      totalPages,
      page,
      nextPage,
      prevPage,
      totalDocs,
    };
  }

  mounted() {
    this.allTypeServicesList = [
      {
        id: '1',
        name: 'wertey',
      },
      {
        id: '2',
        name: 'test',
      },
      {
        id: '3',
        name: 'gdfgdfgd',
      },
    ];
  }

  currentService = {};

  changeTypeService(key) {
    this.currentService.country = 2;
  }

  selectTypeServicesList() {
    const newArr = [];
    this.allTypeServicesList.forEach((item) => {
      newArr.push({
        text: item.name,
        key: item.id,
      });
    });
    return newArr;
  }

  get typeServiceSelectSettings() {
    return {
      optionList: this.selectTypeServicesList,
      placeholderText: this.$t('servicesPage.addServiceModal.typeServicePlaceholder'),
      selectedKey: '2',
      disable: false,
      toTop: false,
      tabindex: 1,
      selectClass: '',
    };
  }

  getRequests(queryParams) {
    const {
      page = this.queryParams.page,
      perPage = this.queryParams.perPage,
      search = this.queryParams.search,
      filter = this.queryParams.filter,
    } = queryParams;
    this.queryParams = {
      page,
      perPage,
      search,
      filter,
    };
    const filterQuery = filter ? JSON.stringify({ 'country._id': filter }) : undefined;
    this.$router.push({
      query: {
        page,
        perPage,
        search: search || undefined,
        filter: filter || undefined,
      },
    }).catch(() => {});
    const { totalDocs, resource } = { totalDocs: 20, resource: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,17] };
    this.getPaginationData({ totalDocs, page, perPage });
    // this.loader = true;
    // serviceApi.getServicesList({
    //   page, perPage, filter: filterQuery, search,
    // })
    //   .then((resp) => {
    //     this.loader = false;
    //     const { totalDocs, resource } = resp.data;
    //     this.noData = {
    //       ...this.noData,
    //       status: totalDocs === 0,
    //     };
    //     this.getPaginationData({ totalDocs, page, perPage });
    //     this.servicesList = [];
    //     resource.forEach((service) => {
    //       this.servicesList.push({
    //         ...service,
    //         country: {
    //           ...service.country,
    //           image: this.getOptionImage(service.country.code),
    //         },
    //       });
    //     });
    //   }).catch((err) => {
    //   this.loader = false;
    //   console.error(err);
    // });
  }

  async created() {
    try {
      const response = await UsersService.success();
      const usersResponse = await UsersService.getUsers();
      console.log('response', response.data);
      this.usersList = usersResponse.data;
      // this.userName = response.data.user.displayName;
      // this.avatar = response.data.user.photos[0].value;
      // this.email = response.data.user.emails[0].value;
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style scoped lang="scss">
  .app-dashboard {
    display: flex;
    flex-direction: column;
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 40px;
      width: 100%;
    }
  }
</style>

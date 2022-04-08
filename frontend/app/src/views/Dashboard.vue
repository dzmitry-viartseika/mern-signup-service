<template>
  <div class="app-dashboard">
    <div class="app-dashboard-header">
      <h1 class="app__title">
        Dashboard
      </h1>
      <button
        class="app__btn app__btn--primary"
        @click="modalActions(true)"
      >
        Add Client
      </button>
    </div>
    <div>
      <text-input
        :value.sync="searchValue"
        input-type="text"
        :placeholder-text="'поиск'"
        :label-text="'Поиск'"
      />
      <SelectTemplate
        :options="options"
        :item.sync="item"
      />
    </div>
    <vuetable
      ref="vuetable"
      :data="usersList"
      :fields="fieldsList"
    />
    <transition name="fade-el">
      <modal-template-with-action
        v-if="isVisibleAddUserModal"
        :modal-title="$t('addNewUser.modalTitle')"
        placeholder="Describe yourself here..."
        @modalActions="modalActions"
        @actionButton="addNewUser"
      >
        <div slot="content">
          <div class="form-field">
            <text-input
              :value.sync="firstName"
              :error-status="$validator.errors.has('firstName')"
              input-type="text"
              :required="true"
              :placeholder-text="$t('addNewUser.placeholderFirstName')"
              :label-text="$t('addNewUser.firstName')"
            />
            <transition name="fade-el">
              <div
                v-if="$validator.errors.has('firstName')"
                class="validation validation--input"
              >
                {{ $validator.errors.first('firstName') }}
              </div>
            </transition>
          </div>
          <div class="form-field">
            <text-input
              :value.sync="lastName"
              :error-status="$validator.errors.has('lastName')"
              input-type="text"
              :required="true"
              :placeholder-text="$t('addNewUser.placeholderLastName')"
              :label-text="$t('addNewUser.lastName')"
            />
            <transition name="fade-el">
              <div
                v-if="$validator.errors.has('lastName')"
                class="validation validation--input"
              >
                {{ $validator.errors.first('lastName') }}
              </div>
            </transition>
          </div>
          <div class="form-field">
            <text-input
              :value.sync="email"
              :error-status="$validator.errors.has('email')"
              input-type="email"
              :required="true"
              :placeholder-text="$t('addNewUser.placeholderEmail')"
              :label-text="$t('addNewUser.email')"
            />
            <transition name="fade-el">
              <div
                v-if="$validator.errors.has('email')"
                class="validation validation--input"
              >
                {{ $validator.errors.first('email') }}
              </div>
            </transition>
          </div>
          <div class="form-field">
            <SelectTemplate
              :options="roles"
              :item.sync="selectedRole"
            />
          </div>
          <div class="form-field">
            <div class="text-field">
              <label class="text-field__label">
                {{ $t('addNewUser.phoneNumber') }}
              </label>
              <vue-tel-input
                v-model="phoneNumber"
                :show-dial-code-in-selection="true"
                mode="international"
              />
            </div>
          </div>
        </div>
      </modal-template-with-action>
    </transition>
    <!--    <Radio name='wertey' :value.sync="test"/>-->
    <!--    <Radio name='wertey' :value.sync="test"/>-->
    <!--    pagi-->
    <!--    <Pagination-->
    <!--      v-if="false"-->
    <!--      :data="fullInfo"-->
    <!--      :getQuery="getRequests"-->
    <!--      :limit="queryParams.perPage"-->
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
import Toggle from '@/components/Elements/Toggle.vue';
import Vuetable from 'vuetable-2';
import { VueTelInput } from 'vue-tel-input';
import { IUsersListResponse } from '@/model/response/IUsersListResponse';
import { GET_ALL_USERS } from '@/graphql/querries';
import { ADD_NEW_CLIENT, EDIT_CLIENT, DELETE_CLIENT } from '@/graphql/mutations';
import ModalTemplateWithAction from '@/components/Modals/ModalTemplateWithAction.vue';
import validationErrorMessage from '@/locales/validationErrorMessage';

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
    Toggle,
    Vuetable,
    TextInput,
    ModalTemplateWithAction,
    VueTelInput,
  },
})
export default class Dashboard extends Vue {

  lastName: string = '';
  firstName: string = '';
  phoneNumber: string = '';
  email: string = '';
  selectedRole: string = '';

  options = [
    { value: 'firstName', text: 'Имя' },
    { value: 'lastName', text: 'Фамилия' },
    { value: 'phoneNumber', text: 'Телефон' },
    { value: 'role', text: 'Роль' },
  ];

  roles = [
    {
      value: 'ADMIN', text: 'Админ',
    },
    {
      value: 'CLIENT', text: 'Клиент',
    },
  ];

  fieldsList = [
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

  isVisibleAddUserModal: boolean = false;

  toggleValue: boolean = false;

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

  async deleteClient(): Promise<void> {
    try {
      const response = await this.$apollo.mutate({
        mutation: DELETE_CLIENT,
        variables: {
          id: '624eaafcdb29c369ab862a68',
        },
      });
    } catch(e) {
      console.error(e);
    }
  }

  editClient(): Promise<void> {
    try {
      const response = await this.$apollo.mutate({
        mutation: EDIT_CLIENT,
        variables: {
          id: '624eaafcdb29c369ab862a68',
          client: {
            role: 'ADMIN',
            firstName: 'firstName',
            lastName: 'LastName',
            email: 'email@email.com',
            phoneNumber: '+213',
          },
        },
      });
    } catch(e) {
      console.error(e);
    }
  }

  async addNewUser(): Promise<void> {
    const result = await this.$validator.validateAll({
      firstName: this.firstName,
      lastName: this.lastName,
      selectedRole: this.selectedRole,
      email: this.email,
      phoneNumber: this.phoneNumber,
    });

    if (result) {
      try {
        const { data } = await this.$apollo.mutate({
          mutation: ADD_NEW_CLIENT,
          variables: {
            client: {
              firstName: this.firstName,
              lastName: this.lastName,
              phoneNumber: this.phoneNumber,
              role: this.selectedRole,
              email: this.email,
            },
          },
        });
        // eslint-disable-next-line no-console
        console.log('data', data.addNewClient);
        this.usersList.push(data.addNewClient);
        this.isVisibleAddUserModal = false;
      } catch (e) {
        console.error(e);
      }
    }
  }

  modalActions(data: boolean): void {
    this.isVisibleAddUserModal = data;
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

  beforeMount(): void {
    const dict = {
      en: {
        custom: {
          email: {
            required: validationErrorMessage.en.inputRequired,
          },
          selectedRole: {
            required: validationErrorMessage.en.inputRequired,
          },
          firstName: {
            required: validationErrorMessage.en.inputRequired,
          },
          lastName: {
            required: validationErrorMessage.en.inputRequired,
          },
          phoneNumber: {
            required: validationErrorMessage.en.inputRequired,
          },
        },
      },
      ru: {
        custom: {
          email: {
            required: validationErrorMessage.ru.inputRequired,
          },
          selectedRole: {
            required: validationErrorMessage.ru.inputRequired,
          },
          firstName: {
            required: validationErrorMessage.ru.inputRequired,
          },
          lastName: {
            required: validationErrorMessage.ru.inputRequired,
          },
          phoneNumber: {
            required: validationErrorMessage.ru.inputRequired,
          },
        },
      },
    };
    this.$validator.localize(dict);
    this.$validator.attach({ name: 'email', rules: { required: true } });
    this.$validator.attach({ name: 'selectedRole', rules: { required: true } });
    this.$validator.attach({ name: 'firstName', rules: { required: true } });
    this.$validator.attach({ name: 'lastName', rules: { required: true } });
    this.$validator.attach({ name: 'phoneNumber', rules: { required: true } });
  }

  async created() {
    const { data } = await this.$apollo.query({
      query: GET_ALL_USERS,
    });
    if (data.getAllUsers.length) {
      this.usersList = data.getAllUsers;
    }
    try {
      await UsersService.success();
      // const usersResponse = await UsersService.getUsers();
      // this.usersList = usersResponse.data;
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

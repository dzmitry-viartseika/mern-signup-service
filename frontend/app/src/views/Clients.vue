<template>
  <div class="app-clients">
    <loader-template v-if="isLoader" />
    <div class="app-clients-header">
      <h1 class="app__title">
        Clients
      </h1>
      <button
        class="app__btn app__btn--primary"
        @click="modalActions(true)"
      >
        Add Client
      </button>
    </div>
    <div class="app-clients-table-action">
      <div class="app-clients-table-action__item">
        <text-input
          :value.sync="searchValue"
          input-type="text"
          :placeholder-text="'Поиск по Фамилии'"
        />
        <!--              // TODO icon с расшифровкой по чем поиск UI-->
      </div>
      <div class="app-clients-table-action__item">
        <select-template
          :style="{'width': '200px'}"
          :options="roles"
          :item.sync="filterQuery.role"
          :placeholder-text="'Выбрать роль'"
          @onSelect="onSelect"
        />
      </div>
      <div class="app-clients-table-action__item">
        <button
          class="app__btn app__btn--primary"
          @click="filterClients"
        >
          Фильтровать
        </button>
      </div>
      <div class="app-clients-table-action__item">
        <button
          class="app__btn app__btn--primary"
          :class="{'app__btn--disabled': !Object.keys(selectedClient).length}"
          @click="editClient"
        >
          Edit
        </button>
      </div>
      <div class="app-clients-table-action__item">
        <button
          :class="{'app__btn--disabled': !Object.keys(selectedClient).length}"
          class="app__btn app__btn--primary"
          @click="deleteClient"
        >
          Delete
        </button>
      </div>
      <div class="app-clients-table-action__item">
        <button
          class="app__btn app__btn--primary"
          @click="clearFilters"
        >
          Очистить фильтры
        </button>
      </div>
    </div>
    <template v-if="rowData.length">
      <transition-group
        name="fade-el"
      >
        <div key="table">
          <div class="app-clients-content">
            <AGGridTable
              :column-defs="columnDefs"
              :row-data="rowData"
              :default-col-def="defaultColDef"
              @onClientSelected="onClientSelected"
            />
          </div>
          <div
            v-if="rowData.length"
            class="app-clients-pagination"
          >
            <pagination-template
              :pagination="{
                perPage: filterQuery.page,
                total: total,
                totalPages: totalPages
              }"
              :current-page="currentPage"
              @pagechanged="onPageChange"
            />
          </div>
        </div>
      </transition-group>
    </template>
    <template v-else>
      <div
        class="app-clients-placeholder"
      >
        <h2 class="app-clients-placeholder__title">
          Список клиентов пуст
        </h2>
        <img
          class="app-clients-placeholder__image"
          src="@/assets/images/placeholders/clients-placeholder.png"
          alt="placeholder"
        >
        <button
          class="app__btn app__btn--primary"
          @click="modalActions(true)"
        >
          Add Client
        </button>
      </div>
    </template>
    <transition name="fade-el">
      <modal-template-with-action
        v-if="isVisibleAddUserModal"
        :modal-title="!isEditMode ? $t('addNewUser.modalTitle') : 'Edit'"
        placeholder="Describe yourself here..."
        @modalActions="modalActions"
        @actionButton="addNewUser"
      >
        <div slot="content">
          <div class="form-field">
            <text-input
              :value.sync="firstName"
              :autofocus="true"
              :error-status="$validator.errors.has('firstName')"
              :input-type="'text'"
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
              :input-type="'text'"
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
              :input-type="'email'"
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
            <div class="text-field text-field--md">
              <SelectTemplate
                :options="roles"
                :item.sync="selectedRole"
                :label="'Роль'"
                :error-status="$validator.errors.has('selectedRole')"
                required
              />
              <transition name="fade-el">
                <div
                  v-if="$validator.errors.has('selectedRole')"
                  class="validation validation--input"
                >
                  {{ $validator.errors.first('selectedRole') }}
                </div>
              </transition>
            </div>
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
                :error-status="$validator.errors.has('phoneNumber')"
              />
              <transition name="fade-el">
                <div
                  v-if="$validator.errors.has('phoneNumber')"
                  class="validation validation--input"
                >
                  {{ $validator.errors.first('phoneNumber') }}
                </div>
              </transition>
            </div>
          </div>
        </div>
      </modal-template-with-action>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import '@/assets/icons/Eye';
import UsersService from '@/services/Users/UsersService';
import Radio from '@/components/Elements/Radio.vue';
import SelectTemplate from '@/components/Elements/SelectTemplate.vue';
import TextInput from '@/components/Elements/TextInput.vue';
import LoaderTemplate from '@/components/Elements/LoaderTemplate.vue';
import Toggle from '@/components/Elements/Toggle.vue';
import AGGridTable from '@/components/Tables/AGGridTable.vue';
import { GridApi } from 'ag-grid-community';
import { VueTelInput } from 'vue-tel-input';
import { IUsersListResponse } from '@/model/response/IUsersListResponse';
import { GET_ALL_USERS } from '@/graphql/querries';
import { LIMIT_PAGE, DEFAULT_PAGE } from '@/constants/paginationSettings';
import { ADD_NEW_CLIENT, EDIT_CLIENT, DELETE_CLIENT } from '@/graphql/mutations';
import ModalTemplateWithAction from '@/components/Modals/ModalTemplateWithAction.vue';
import validationErrorMessage from '@/locales/validationErrorMessage';
import queryString from 'query-string';
import IFilterQueryClients from '@/model/filters/IFilterQueryClients';
import paginationTemplate from '@/components/Paginations/Pagination.vue';
import ClientRoles from '@/model/enums/ClientRoles';
import RowSelectionAgTable from '@/model/enums/RowSelectionAgTable';

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
    SelectTemplate,
    Toggle,
    TextInput,
    ModalTemplateWithAction,
    VueTelInput,
    LoaderTemplate,
    AGGridTable,
    paginationTemplate,
  },
})
export default class Dashboard extends Vue {

  lastName: string = '';
  firstName: string = '';
  phoneNumber: string = '';
  email: string = '';
  selectedRole: string = '';
  isEditMode: boolean = false;
  isLoader: boolean = false;
  selectedClient: any = {};
  columnDefs = null;
  rowData: IUsersListResponse[] = [];

  roles = [
    {
      value: ClientRoles.ADMIN, text: 'Админ',
    },
    {
      value: ClientRoles.CLIENT, text: 'Клиент',
    },
  ];

  searchValue: string = '';

  isVisibleAddUserModal: boolean = false;

  filterQuery: IFilterQueryClients = {} as IFilterQueryClients;

  item = '';

  fullInfo = {};

  gridApi: GridApi;

  servicesList = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26];

  defaultColDef = {
    width: 300,
    sortable: true,
  };

  queryParams = {
    page: 1,
    perPage: 20,
    search: '',
    filter: '',
  };

  perPage: number = 0;
  total: number = 0;
  totalPages: number = 0;

  currentPage: number = 1;

  addingParameterToLink(): void {
    this.$router.push({
      /* eslint-disable */
      /* tslint:disable */
      // @ts-ignore
      query: {
        ...this.filterQuery,
      },
    }).catch((e) => {
      console.error(e);
    });
  }

  clearFilters() {
    this.filterQuery.role = ClientRoles.ALL;
    this.filterQuery.page = DEFAULT_PAGE;
    this.filterQuery.limit = LIMIT_PAGE;
    this.searchValue = '';
    this.addingParameterToLink();
    this.filterClients();
  }

  async filterClients() {
    const { data } = await this.$apollo.query({
      query: GET_ALL_USERS,
      variables: {
        input: {
          filter: {
            role: this.filterQuery.role || ClientRoles.ALL,
            searchText: this.searchValue,
            page: String(this.filterQuery.page),
            limit: String(this.filterQuery.limit),
          },
        }
      },
    });
    this.rowData = data.getAllUsers.docs;
  }

  async deleteClient(): Promise<void> {
    try {
      const response = await this.$apollo.mutate({
        mutation: DELETE_CLIENT,
        variables: {
          id: this.selectedClient._id,
        },
      });
      const currentIndex = this.rowData.findIndex((item) => item._id === this.selectedClient._id);
      this.rowData.splice(currentIndex, 1);
      this.selectedClient = {};
    } catch(e) {
      console.error(e);
    }
  }

  editClient(): void {
    this.isVisibleAddUserModal = true;
    this.isEditMode = true;
    this.firstName = this.selectedClient.firstName;
    this.lastName = this.selectedClient.lastName;
    this.selectedRole = this.selectedClient.role;
    this.phoneNumber = this.selectedClient.phoneNumber;
    this.email = this.selectedClient.email;
  }

  onClientSelected(item): void {
    this.selectedClient = item;
  }

  async onPageChange(page): Promise<void> {
    this.currentPage = page;
    this.filterQuery.page = page;
    this.addingParameterToLink();
    const { data } = await this.$apollo.query({
      query: GET_ALL_USERS,
      variables: {
        input: {
          filter: {
            role: ClientRoles.ALL,
            page: String(this.filterQuery.page),
            limit: String(this.filterQuery.limit),
          },
        }
      },
    });
    this.rowData = data.getAllUsers.docs;
  }

  async editAction(): Promise<any> {
    try {
      const response = await this.$apollo.mutate({
        mutation: EDIT_CLIENT,
        variables: {
          id: this.selectedClient._id,
          client: {
            role: this.selectedRole,
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            phoneNumber: this.phoneNumber,
          },
        },
      });
      return response;
    } catch(e) {
      console.error(e);
    }
  }

  async addAction(): Promise<any> {
    try {
      const response = await this.$apollo.mutate({
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
      return response;
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
        const { showNotify } = this.$store.getters.user;
        const { data } = this.isEditMode ? await this.editAction() : await this.addAction();
        if (!this.isEditMode) {
          console.log('this.totalPages', this.totalPages);
          console.log('this.filterQuery.limit', this.filterQuery.limit);
          if ((this.total < this.filterQuery.limit) || this.filterQuery.page !== 1) {
            this.rowData.push(data.addNewClient);
          }
          if (showNotify) {
            this.$toasted.show(`Новый Клиент ${this.firstName} успешно добавлен`, {
              theme: 'bubble',
              position: 'top-right',
              duration: 3000,
            });
          }
        } else {
          const currentIndex = this.rowData.findIndex((item) => item._id === this.selectedClient._id);
          const obj: IUsersListResponse = {
            firstName: this.firstName,
            lastName: this.lastName,
            role: this.selectedRole,
            email: this.email,
            phoneNumber: this.phoneNumber,
            _id: this.selectedClient._id,
          }
          this.selectedClient = {};
          this.rowData.splice(currentIndex, 1, obj);
          if (showNotify) {
            this.$toasted.show(`Новый Клиент ${this.firstName} успешно изменен`, {
              theme: 'bubble',
              position: 'top-right',
              duration: 3000,
            });
          }
        }
        this.isVisibleAddUserModal = false;
      } catch (e) {
        console.error(e);
      }
    }
  }

  async modalActions(data: boolean): Promise<void> {
    this.isEditMode = false;
    this.isVisibleAddUserModal = data;
    this.selectedRole = '';
    this.firstName = '';
    this.lastName = '';
    this.phoneNumber = '';
    this.email = '';
    this.searchValue = '';
    this.filterQuery.role = ClientRoles.ALL;
    this.addingParameterToLink();
    await this.filterClients();
  }

  onSelect(): void {
    this.addingParameterToLink();
  }

  beforeMount(): void {
    this.columnDefs = [
      {
        field: 'firstName',
        sort: 'desc',
        flex: 1,
      },
      {
        field: "lastName",
        flex: 1,
      },
      {
        field: "role",
        sort: 'desc',
        flex: 1,
      },
      {
        field: "email",
        sort: 'desc',
        flex: 1,
      },
      {
        field: "phoneNumber",
        flex: 1,
      },
    ];

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
    const { location } = window;
    const parsed = queryString.parse(location.search, { parseNumbers: true });
    const {
      role = this.filterQuery.role,
      page = this.filterQuery.page || DEFAULT_PAGE,
      limit = this.filterQuery.limit || LIMIT_PAGE,
    } = parsed;
    this.filterQuery = {
      role,
      page: parsed.page || DEFAULT_PAGE,
      limit: parsed.limit || LIMIT_PAGE,
    } as IFilterQueryClients;
    this.currentPage = this.filterQuery.page;
    this.addingParameterToLink();
    const { data } = await this.$apollo.query({
      query: GET_ALL_USERS,
      variables: {
        input: {
          filter: {
            role: ClientRoles.ALL,
            page: String(page),
            limit: String(limit),
          },
        }
      },
    });
    if (data.getAllUsers.docs.length) {
      // TODO сhange Users to Clients graphql
      this.rowData = data.getAllUsers.docs;
      this.total = this.rowData.length;
      this.perPage = this.filterQuery.page;
      this.totalPages = Math.ceil(data.getAllUsers.totalDocs / this.filterQuery.limit);
    }
    try {
      await UsersService.success();
      // const usersResponse = await UsersService.getUsers();
      // this.rowData = usersResponse.data;
      // this.userName = response.data.user.displayName;
      // this.avatar = response.data.user.photos[0].value;
      // this.email = response.data.user.emails[0].value;
    } catch (e) {
      console.error(e);
    }
  }
}
</script>

<style lang="scss">

.app-clients {
  display: flex;
  flex-direction: column;

  &-table {

    &-action {
      display: flex;
      justify-content: flex-start;
      margin-top: 30px;

      &__item + .app-clients-table-action__item {
        margin-left: 20px;
      }

      .app-clients-table-action__item:last-child {
        margin-left: auto;
      }
    }
  }

  &-placeholder {
    margin-top: 20vh;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;


    &__title {
      font-size: 30px;
    }
  }

  &-content {
    width: 100%;
    margin-bottom: 20px;

    &--flex {
      display: flex;
      justify-content: center;
    }
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    width: 100%;
  }
}
</style>

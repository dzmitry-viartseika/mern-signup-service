<template>
  <div class="app-pagination">
    <div
      v-if="totalPages > 1"
      class="app-pagination-list"
    >
      <div
        class="app-pagination-list__item"
        :class="{'bg-gray-200': isInFirstPage}"
      >
        <button
          type="button"
          class="app__btn app__btn--border"
          :class="{'app__btn--disabled': isInFirstPage}"
          :disabled="isInFirstPage"
          @click="gotoFirst"
        >
          &laquo;
        </button>
      </div>

      <div
        class="app-pagination-list__item"
        :class="{'bg-gray-200': isInFirstPage}"
      >
        <button
          type="button"
          class="app__btn app__btn--border"
          :class="{'app__btn--disabled': isInFirstPage}"
          :disabled="isInFirstPage"
          @click="gotoPrevious"
        >
          &lsaquo;
        </button>
      </div>

      <template v-if="showDots('left')">
        <div
          class="app-pagination-list__item"
          :class="{'bg-gray-600': isInFirstPage}"
        >
          <button
            type="button"
            class="app__btn app__btn--primary"
            :class="{'app__btn--disabled': isInFirstPage}"
            :disabled="isInFirstPage"
            @click="gotoPageNumber(1)"
          >
            1
          </button>
        </div>

        <div class="app-pagination-list__item">
          <button
            type="button"
            class="app__btn app__btn--primary"
            :disabled="true"
          >
            ...
          </button>
        </div>
      </template>
      <div
        v-for="(page, index) in pages"
        :key="`pages_${index}`"
        class="app-pagination-list__item"
        :class="{'app-pagination-list__item--active': page === currentPage}"
      >
        <button
          type="button"
          class="app__btn app__btn--primary"
          :class="{'app__btn--disabled': page === currentPage}"
          :disabled="page === currentPage"
          @click="gotoPageNumber(page)"
        >
          {{ page }}
        </button>
      </div>

      <template v-if="showDots('right')">
        <div class="app-pagination-list__item">
          <button
            type="button"
            class="app__btn app__btn--primary"
            :disabled="true"
          >
            ...
          </button>
        </div>

        <div
          class="app-pagination-list__item"
          :class="{'bg-gray-600': isInLastPage}"
        >
          <button
            type="button"
            class="app__btn app__btn--primary"
            :class="{'app__btn--disabled': isInLastPage}"
            :disabled="isInLastPage"
            @click="gotoPageNumber(totalPages)"
          >
            {{ totalPages }}
          </button>
        </div>
      </template>

      <div
        class="app-pagination-list__item"
        :class="{'bg-gray-200': isInLastPage}"
      >
        <button
          type="button"
          class="app__btn app__btn--border"
          :class="{'app__btn--disabled': isInLastPage}"
          :disabled="isInLastPage"
          @click="gotoNext"
        >
          &rsaquo;
        </button>
      </div>

      <div
        class="app-pagination-list__item"
        :class="{'bg-gray-200': isInLastPage}"
      >
        <button
          type="button"
          class="app__btn app__btn--border"
          :class="{'app__btn--disabled': isInLastPage}"
          :disabled="isInLastPage"
          @click="gotoLast"
        >
          &raquo;
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import '@/assets/icons/Caution-sign';

interface IPagination {
  perPage: number;
  total: number;
  totalPages: number;
}

@Component({})
export default class Pagination extends Vue {

  @Prop({ type: Number, default: 1  })
  currentPage: number;

  @Prop({ type: Object, required: true  })
  pagination: IPagination;

  @Prop({ type: Number, required: false, default: 5  })
  maxVisibleButtons: number;

  perPage: number = 10;
  total: number = 0;
  totalPages: number = 0;

  get isInFirstPage(): boolean {
    return this.currentPage === 1;
  }

  get isInLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  get pages(): number[] {
    const range = [];
    if (this.startPage > 0) {
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push(i);
      }
    }
    return range;
  }

  get startPage(): number {
    if (this.currentPage === 1) {
      return 1;
    }

    if (this.currentPage === this.totalPages) {
      return this.totalPages - this.maxVisibleButtons + 1;
    }

    return this.currentPage - 1;
  }

  get endPage(): number {
    return Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
  }

  showDots(position: string = 'left'): boolean {
    const number = position === 'left' ? 1 : this.totalPages;
    const nextNumber = position === 'left' ? 2 : this.totalPages - 1;

    return !this.pages.includes(number) || !this.pages.includes(nextNumber);
  }

  gotoFirst(): void {
    this.gotoPageNumber(1);
  }

  gotoLast(): void {
    this.gotoPageNumber(this.totalPages);
  }

  gotoPrevious(): void {
    this.gotoPageNumber(this.currentPage - 1);
  }

  gotoNext(): void {
    this.gotoPageNumber(this.currentPage + 1);
  }

  gotoPageNumber(pageNumber: number): void {
    this.$emit('pagechanged', pageNumber);
  }

  created(): void {
    this.perPage = this.pagination.perPage || 10;
    this.total = this.pagination.total || 0;
    this.totalPages = this.pagination.totalPages || 0;
  }

  @Watch('pagination')
  changePaginationFields(pagination: IPagination) {
    this.perPage = pagination.perPage || 10;
    this.total = pagination.total || 0;
    this.totalPages = pagination.totalPages || 0;
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";
  .app-pagination {
    display: flex;
    justify-content: center;

    &-list {
      display: flex;

      &__item + .app-pagination-list__item {
        margin-left: 15px;
      }

      &__item {

        &--active {

          button {
            background-color: #695CFE;
          }
        }
      }
    }
  }
</style>

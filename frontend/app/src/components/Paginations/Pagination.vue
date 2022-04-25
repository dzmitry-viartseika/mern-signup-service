<template>
  <div class="app-pagination">
    <div
      v-if="total_pages > 1"
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
            @click="gotoPageNumber(total_pages)"
          >
            {{ total_pages }}
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

@Component({})
export default class Pagination extends Vue {

  @Prop({ type: Number, default: 1  })
  currentPage: number;

  @Prop({ type: Object, required: true  })
  pagination: any;

  @Prop({ type: Number, required: false, default: 5  })
  maxVisibleButtons: number;

  per_page: number = 10;
  total: number = 0;
  total_pages: number = 0;

  get isInFirstPage() {
    return this.currentPage === 1;
  }

  get isInLastPage() {
    return this.currentPage === this.total_pages;
  }

  get pages() {
    const range = [];
    if (this.startPage > 0) {
      for (let i = this.startPage; i <= this.endPage; i += 1) {
        range.push(i);
      }
    }

    return range;
  }

  get startPage() {
    if (this.currentPage === 1) {
      return 1;
    }

    if (this.currentPage === this.total_pages) {
      return this.total_pages - this.maxVisibleButtons + 1;
    }

    return this.currentPage - 1;
  }

  get endPage() {
    return Math.min(this.startPage + this.maxVisibleButtons - 1, this.total_pages);
  }

  showDots(position = 'left') {
    const number = position === 'left' ? 1 : this.total_pages;
    const nextNumber = position === 'left' ? 2 : this.total_pages - 1;

    return !this.pages.includes(number) || !this.pages.includes(nextNumber);
  }

  gotoFirst() {
    this.gotoPageNumber(1);
  }

  gotoLast() {
    this.gotoPageNumber(this.total_pages);
  }

  gotoPrevious() {
    this.gotoPageNumber(this.currentPage - 1);
  }

  gotoNext() {
    this.gotoPageNumber(this.currentPage + 1);
  }

  gotoPageNumber(pageNumber) {
    this.$emit('pagechanged', pageNumber);
  }

  created() {
    this.per_page = this.pagination.per_page || 10;
    this.total = this.pagination.total || 0;
    this.total_pages = this.pagination.total_pages || 0;
  }

  @Watch('pagination')
  test(pagination) {
    this.per_page = pagination.per_page || 10;
    this.total = pagination.total || 0;
    this.total_pages = pagination.total_pages || 0;
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

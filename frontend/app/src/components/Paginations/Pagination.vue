<template>
  <transition>
    <div
      v-if="data.totalPages > 1"
      class="ub-pagination"
      :class="{'ub-pagination_sticky': sticky}"
    >
      <div
        v-if="data.totalPages > 1"
        class="ub-pagination-item ub-pagination-item_nav"
        :class="{'ub-pagination-item_disabled': activePage === 0}"
        @click="clickPage(data.prevPage)"
      >
        <i class="ub-icon-arrow-paginate icon-arrow icon-arrow_left ub-pagination__nav ub-pagination__nav_left" />
      </div>
      <div
        v-for="(page, index) in pages"
        :key="`${index}bb${page}`"
        class="ub-pagination-item"
        :class="{
          'ub-pagination-item_ellipsis': typeof page === 'string',
          'ub-pagination-item_active': activePage === index
        }"
        @click="clickPage(page, index)"
      >
        {{ page }}
      </div>
      <div
        v-if="data.totalPages > 1"
        class="ub-pagination-item ub-pagination-item_nav"
        :class="{'ub-pagination-item_disabled': activePage === pages.length - 1}"
        @click="clickPage(data.nextPage)"
      >
        <i class="ub-icon-arrow-paginate icon-arrow icon-arrow_right ub-pagination__nav ub-pagination__nav_right" />
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import '@/assets/icons/Caution-sign';

@Component({})
export default class Pagination extends Vue {

  @Prop({ required: false, type: Boolean, default: true })
  sticky: boolean;

  @Prop({ required: false, type: Number, default: 1 })
  limit: number;

  @Prop({ required: false })
  data: any;

  @Prop({ required: true, type: Function })
  getQuery: Function;

  activePage = 0;
  pages = [1, 2, 3];

  @Watch('data')
  test() {
    this.setPages(this.data);
  }

  beforeMount() {
    this.setPages(this.data);
  }

  setPages({
    totalPages, page, prevPage, nextPage,
  }) {
    if (totalPages <= 3) {
      this.activePage = page - 1;
      const firstPages = [1, 2, 3];
      this.pages = firstPages.splice(0, totalPages);
      return;
    }
    if (prevPage && nextPage) {
      this.activePage = 1;
      this.pages = [prevPage, page, nextPage, '...', totalPages];
    } else if (!prevPage && nextPage) {
      this.activePage = 0;
      let checkPage;
      if (totalPages === nextPage + 1) {
        checkPage = totalPages;
      } else {
        checkPage = nextPage + 1;
      }
      this.pages = [page, nextPage, checkPage, '...', totalPages];
    } else if (prevPage && !nextPage) {
      this.activePage = 2;
      this.pages = [prevPage - 1, prevPage, page];
    }
    if (totalPages === nextPage) {
      this.activePage = 3;
      this.pages = [1, '...', prevPage, page, nextPage];
    } else if (totalPages === page) {
      this.activePage = 4;
      this.pages = [1, '...', prevPage - 1, prevPage, page];
    }
  }

  clickPage(page) {
    if (page === '...' || !page || this.data.page === page) {
      return;
    }
    const query = {
      perPage: this.limit,
      page,
    };
    this.getQuery(query);
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/scss/variables";

.ub-pagination {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  &_sticky {
    position: sticky;
    bottom: 0;
  }
  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 26px;
    height: 25px;
    margin: 0 1px;
    cursor: pointer;
    border-radius: $borderRadius;
    background: transparent;
    line-height: 21px;
    user-select: none;
    font: $font-size-h3 $font-global;
    color: $color-dodger-blue;
    transition: background-color .2s ease-in;
    &_disabled {
      pointer-events: none;
      color: $color-silver-chalice;
    }
    &_ellipsis {
      width: auto;
      background-color: transparent;
    }
    &_nav {
      background-color: transparent;
    }
    &_double {
      margin: 0;
      i {
        margin: -3px;
      }
    }
    &:last-child,
    &:first-child {
      margin: 0;
    }
    &:hover {
      background: rgba($color-dodger-blue, .08);
    }
    &_active {
      background-color: $color-dodger-blue !important;
      color: $color-white !important;
    }
  }
  &__nav {
    display: block;
    font-size: $font-size-h6;
    color: $color-white;
  }
}
.icon-arrow {
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: $font-size-md;
  position: relative;
  transition: color .15s ease-in;
  &_left {
    transform: rotate(180deg);
  }
}
</style>

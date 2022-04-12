<template>
  <div>
    <div class="header ">
      <div class="row">
        <div class="col-1">Car</div>
        <div class="col-2">Model</div>
        <div class="col-3">Year</div>
        <div class="col-4">Type</div>
        <div class="col-5">Price</div>
      </div>
    </div>
    <div class="body">
      <div class="row">
        <div class="col-1">BMW</div>
        <div class="col-2">8 Series</div>
        <div class="col-3">2019</div>
        <div class="col-4">Coupe</div>
        <div class="col-5">$111,900</div>
        <div class="highlight"></div>
      </div>

      <div class="row">
        <div class="col-1">Audi</div>
        <div class="col-2">R8</div>
        <div class="col-3">2019</div>
        <div class="col-4">Coupe</div>
        <div class="col-5">$164,900 - $194,400</div>
        <div class="highlight"></div>
      </div>

      <div class="row">
        <div class="col-1">Chevrolet</div>
        <div class="col-2">Corvette</div>
        <div class="col-3">2019</div>
        <div class="col-4">Coupe</div>
        <div class="col-5">$55,900 - $125,400</div>
        <div class="highlight"></div>
      </div>

      <div class="row">
        <div class="col-1">Porsche</div>
        <div class="col-2">911</div>
        <div class="col-3">2019</div>
        <div class="col-4">Coupe</div>
        <div class="col-5">$113,300 - $133,400</div>
        <div class="highlight"></div>
      </div>

      <div class="row">

        <div class="col-1">Porsche</div>
        <div class="col-2">911</div>
        <div class="col-3">2019</div>
        <div class="col-4">Coupe</div>
        <div class="col-5">$113,300 - $133,400</div>
        <div class="highlight"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({})
export default class TableTemplate extends Vue {}
</script>

<style scoped>

</style>

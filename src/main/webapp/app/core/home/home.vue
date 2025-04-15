<template>
  <div class="home row" v-if="!authenticated">
    <div class="col-md-1">
      <!--<span class="hipster img-fluid rounded"></span>-->
    </div>
    <div class="col-md-9">
      <h1 class="display-3" v-text="t$('home.title')"></h1>
      <p class="lead" v-text="t$('home.subtitle')"></p>
    </div>
  </div>

  <div class="home row" v-if="authenticated">
    <AdminHome v-if="hasAnyAuthority('ROLE_ADMIN') && authenticated"></AdminHome>
    <DMHome v-if="hasAnyAuthority('ROLE_USER') && !hasAnyAuthority('ROLE_ADMIN') && authenticated"></DMHome>
    <CommercialHome v-if="hasAnyAuthority('ROLE_COMMERCIAL') && authenticated"></CommercialHome>
  </div>
</template>

<script lang="ts" src="./home.component.ts"></script>

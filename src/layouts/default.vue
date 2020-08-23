<template>
  <div>
    <the-header @sidenavToggle="displayNavbar=!displayNavbar" :titleText="$t('startstory')"> </the-header>
    <the-sidenav :show="displayNavbar" @close="displayNavbar=!displayNavbar"></the-sidenav>
    <nuxt></nuxt>
  </div>
</template>
<script>
import TheHeader from "@/components/Navigation/TheHeader";
import TheSidenav from "@/components/Navigation/TheSidenav";
export default {
  middleware: ['auto-login'],
  comments:{
    TheHeader,
    TheSidenav
  },
  data(){
    return {
      displayNavbar:false
    }
  }
}
</script>
<style>
html {
  font-family: 'Josefin Sans', sans-serif;
}

body{
  margin: 0;
}
</style>

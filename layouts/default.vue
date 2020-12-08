<template>
  <div>
    <div>
      <nuxt></nuxt>
    </div>
    <div>
      <TheSidenav :show="displayNavbar" @close="displayNavbar=!displayNavbar"></TheSidenav>
      <BottomNavBar @sidenavToggle="displayNavbar=!displayNavbar" :titleText="$t('startstory')"></BottomNavBar>
    </div>
  </div>
</template>
<script>
import BottomNavBar from "@/components/Navigation/BottomNavBar";
import TheSidenav from "@/components/Navigation/TheSidenav";
export default {
  middleware: ['auto-login','goto-lang'],
  comments: {
    BottomNavBar,
    TheSidenav,

  },
  data() {
    return {
      displayNavbar: false,
    }
  },

}
</script>
<style>
html {
  font-family: 'Josefin Sans', sans-serif;
}

body {
  margin: 0;
}
</style>

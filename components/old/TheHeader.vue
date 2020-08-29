<template>
  <div class="header-container">
    <header class="the-header">

      <TheSideNavToggle @toggle="$emit('sidenavToggle')"/>
      <div class="logo">
        <nuxt-link to="/"><img src="~assets/images/logo-uurla2.png" width="120" height="55"></nuxt-link>
      </div>

      <div class="spacer"></div>

      <div class="intro">
        <div class="spacer"></div>
        <div class="title">{{ titleText }}</div>
        <div class="spacer"></div>
        <div class="navigation-items">
          <ul class="nav-list">
            <li class="nav-item">
              <b-avatar size="3rem">
                <nuxt-link :to="localePath('/posts')">Blog</nuxt-link>
              </b-avatar>
            </li>
            <li class="nav-item">
              <b-avatar size="3rem">
                <nuxt-link :to="localePath('/about')">About</nuxt-link>
              </b-avatar>
            </li>
            <li class="nav-item" v-b-hover="handleHover">
              <b-avatar v-if="!logged" @click.native="openLogin" size="3rem">
                <b-icon icon="battery-full" scale="2"></b-icon>
              </b-avatar>
              <b-avatar v-else size="3rem" @click.native="openUserInfo" style="background-color: #ff0000">
                <b-icon icon="battery" scale="2"></b-icon>
              </b-avatar>
              <!--              <b-icon v-if="isHovered" icon="battery-full" scale="2"></b-icon>-->
              <!--              <b-icon v-else icon="battery" scale="2"></b-icon>-->
              <!--              <button class="btn btn-secondary">Login</button>-->
              <!--              <nuxt-link :to="localePath('/admin')"></nuxt-link>-->
            </li>
          </ul>
        </div>
      </div>
      <div class="spacer"></div>

      <div class="container">
        <div class="row">
          <div class="col align-self-center">
            <div id="languageFlag">
              <CountryFlag :country="$t('NATIONID')" size="medium"></CountryFlag>
            </div>
          </div>
          <div class="col align-self-center">
            <b-icon icon="battery-full" scale="2"></b-icon>
          </div>
        </div>
      </div>

      <div class="container">
      </div>
      <UurlaPoppoverLanguage targhetId="languageFlag"></UurlaPoppoverLanguage>
      <!--      <div class="spacer"></div>-->
    </header>
  </div>
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";
import CountryFlag from 'vue-country-flag'
import UurlaPoppoverLanguage from "@/components/Navigation/UurlaPoppoverLanguage";

export default {
  name: "TheHeader",
  props: {
    titleText: {
      type: String,
      required: true,
      isHovered: false
    }
  },
  computed: {
    logged() {
      return this.$store.state.initialized
    }
  },
  components: {
    TheSideNavToggle,
    CountryFlag,
    UurlaPoppoverLanguage
  },
  methods: {
    handleHover(hovered) {
      this.isHovered = hovered
    },
    openLogin() {

    },
    openUserInfo() {

    }
  }
};
</script>


<style scoped>


.intro {
  position: relative;
  text-align: center;
  top: 0px;
  left: 0%;
  width: 75%;
  font-size: 1rem;
  color: white;
  background-color: #4c5180;
  padding: 10px;
  border-radius: 20px;
  box-shadow: 5px 5px 5px white;
  box-sizing: border-box;
  border: 1px solid black;
  display: flex;
  justify-content: space-around;
  align-items: center;
  transform: skewX(45deg);
}

.header-container {
  height: 95px;
}

.title {
  transform: skewX(-45deg);
}

.the-header {
  width: 100%;
  position: fixed;
  height: 95px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: black;
  z-index: 100;
  box-sizing: border-box;
  padding: 0 20px;
}

.logo {
  margin: 0 10px;
  font-size: 1.3rem;
}

.logo a {
  text-decoration: none;
  color: white;
}

.spacer {
  flex: 1;
}

.navigation-items {
  display: none;
  transform: skewX(-45deg);
  font-family: 'Srisakdi', cursive;
}

@media (min-width: 768px) {
  .navigation-items {
    display: block;
  }


}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-item {
  margin: 0 10px;
}

.nav-item a {

  text-decoration: none;
  color: white;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {

  color: greenyellow;
}
</style>

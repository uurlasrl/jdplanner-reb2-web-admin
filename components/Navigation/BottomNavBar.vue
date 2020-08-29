<template>
  <div>

    <LoginComponent modal-name="login-modal"></LoginComponent>
    <AppsList :apps="data.appsDataList" modal-name="apps-list"></AppsList>

    <nav class="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark">

      <nuxt-link :to="localePath('/')"><img src="~assets/images/logo-uurla3.png" width="120" height="55"></nuxt-link>

      <div class="collapse navbar-collapse" id="navbarCollapse">

        <div class="spacer"></div>
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link">
              <nuxt-link :to="localePath('/posts')">BLOG</nuxt-link>
            </a>
          </li>
          <li class="nav-item active">
            <a class="nav-link">
              <nuxt-link :to="localePath('/about')">ABOUT</nuxt-link>
            </a>
          </li>
          <li v-if="!logged" class="nav-item no-active">
            <a class="nav-link">
              <nuxt-link @click.native="openLoginModal" to="">LOGIN</nuxt-link>
            </a>
            <!--            <a v-if="logged" class="nav-link">-->
            <!--              <nuxt-link @click.native="doLogout" to="">LOGOUT</nuxt-link>-->
            <!--            </a>-->
          </li>
          <li v-if="logged" class="nav-item no-active">
            <a class="nav-link">
              <nuxt-link @click.native="doTogleUserInfo" to="" id="userinfo">{{ $t('mnuAdmin') }}</nuxt-link>
            </a>
          </li>
        </ul>
        <!--        <b-nav-item-dropdown v-if="logged" class="language-item" menu-class="no-active" :text="$t('mnuAdmin')">-->
        <!--        </b-nav-item-dropdown>-->


        <b-nav-item-dd class="language-item" menu-class="language-item no-active"
                       :text="$t('mnuLang')+' ('+$i18n.locale + ')'">
          <b-dropdown-item href="#">
            <nuxt-link @click.native="switchLanguage('it')" :to="switchLocalePath('it')">IT</nuxt-link>
          </b-dropdown-item>
          <b-dropdown-item href="#">
            <nuxt-link @click.native="switchLanguage('en')" :to="switchLocalePath('en')">EN</nuxt-link>
          </b-dropdown-item>
        </b-nav-item-dd>
        <div v-if="logged" class="spacer"></div>
        <div v-show="logged">
          <b-avatar @click.native="toggleAppsModal"></b-avatar>
        </div>
        <p v-if="logged" class="email-paragraph">{{ loggedemail }}</p>

      </div>
      <UurlaPoppoverUserInfo
        @closeUserInfo="doCloseUserInfo"
        @DoLogout="doLogout"
        :popoverShow="userInfoShow"
        targhetId="userinfo"></UurlaPoppoverUserInfo>
      <TheSideNavToggle @toggle="$emit('sidenavToggle')"/>

    </nav>


  </div>
</template>

<script>
import TheSideNavToggle from "@/components/Navigation/TheSideNavToggle";
import LoginComponent from "@/components/auth/LoginComponent";
import UurlaPoppoverUserInfo from "@/components/Navigation/UurlaPoppoverUserInfo";
import AppsList from "@/components/Navigation/AppsList";

export default {
  name: "BottomNavBar",
  data() {
    return {
      userInfoShow: false,
      data:{
        appsDataList:[
          {path:'/admin/usermanagement',name:'users',icon:'person'},
          {path:'/admin/groups',name:'roles',icon:'person-check'}
          ]
      }
    }
  },
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
    },
    loggedemail() {
      return this.$store.state.userData.email
    }
  },
  components: [
    TheSideNavToggle,
    LoginComponent,
    UurlaPoppoverUserInfo,
    AppsList
  ],
  methods: {
    openLoginModal() {
      //debugger
      this.$bvModal.show('login-modal')
    },
    toggleAppsModal() {
        this.$bvModal.show('apps-list')
    },
    doLogout() {
      const that = this
      this.$store.commit('clearStore')
      localStorage.removeItem('uurla-user-data')
      this.userInfoShow = false
      that.$nextTick(() => {
        //that.$bvModal.hide(that.modalName)
        //debugger
        that.$router.push(that.localePath('/'))
      })
    },
    doTogleUserInfo() {
      this.userInfoShow = !this.userInfoShow
    },
    doCloseUserInfo() {
      this.userInfoShow = false
    },
    doOpenUserInfo() {
      this.userInfoShow = true
    },
    switchLanguage(lang) {
      const that = this
      localStorage.setItem('uurla-lang', lang)
//if(this.busy) return this.$route.path;
      if (this.$store.getters.isAuthenticated()) {
//se il login e' stato fatto salvo la lingua nel mio utente
        this.busy = true

//debugger
        this.$axios.$get(this.$config.baseUrl + this.$config.apiProjManAppBaseUrl + '/changeLanguage', {
          params: {
            "lang": "'" + lang + "'",
            "$format": "json"
          },
          headers: {
            "Authorization": "Bearer " + this.$store.state.userData.accessToken,
            "accept": "application/json",
          },
          paramsSerializer: (params) => {
            let result = '';
            Object.keys(params).forEach(key => {
              result += `${key}=${encodeURIComponent(params[key])}&`;
            });
            return result.substr(0, result.length - 1);
          }
        }).then(function (response) {
          that.busy = false
          that.$store.dispatch('setLanguage', lang)
          const userData = JSON.parse(localStorage.getItem('uurla-user-data'))
          userData.lang = lang
          localStorage.setItem('uurla-user-data', JSON.stringify(userData))
        })
          .catch(function (error) {
            that.busy = false
            console.log("errore nel cambio della lingua")
            console.log(error)
            // that.makeToast(that.$t('msgPasswordnotchange'), 'danger')
            // this.resetForm()
            // that.nextTick(function () {
            //   // do something cool
            //   this.$v.$reset()
            // })
          });
      }

      this.$nextTick(() => {
        that.$router.push(that.switchLocalePath(lang))
      })

      //return this.switchLocalePath(lang)

    }
  }
}
</script>

<style scoped>
.spacer {
  flex: 1;
}

.nav-item a:hover {
  color: wheat !important;
}

.no-active a {
  font-size: smaller !important;
  text-decoration: none !important;
  color: grey !important;
}

.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: greenyellow;
  font-size: small;
}

.nav-item a {
  font-size: smaller;
  text-decoration: none;
  color: grey;

}

.email-paragraph {
  color: greenyellow;
  margin-left: 15px;
}

</style>
<style>
.language-item {
  font-size: smaller !important;
  list-style: none;
  /**/
}

.language-item > a > span {
  color: grey;
  font-size: smaller !important;
  text-decoration: none;

}
</style>

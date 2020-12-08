<template>
  <div class="container">
    <b-row>
    <b-col>
    <br><br>
    <b-button block variant="outline-primary"
              @click="refreshAllAuthObject"
              v-b-popover.hover="$t('popRefreshAllAuthObject')"
              :title="$t('titRefreshAllAuthObject')">{{ $t('btnRefreshauth') }}</b-button>
    <br>
    <b-button block variant="outline-primary"
              @click="refreshFrontEndApp"
              v-b-popover.hover="$t('popRefreshFrontEndApp')"
              :title="$t('titRefreshFrontEndApp')">{{ $t('btnRefreshfapp') }}</b-button>
    </b-col>
      <b-col></b-col>
    </b-row>
  </div>
</template>

<script>
import UurlaBEApiUtility from "@/beapi/UurlaBEApiUtility";

export default {
  name: "adminutility",
  middleware: "auth-admin",
  methods: {
    makeToast(toastmessage, title, variant) {
      this.$bvToast.toast(toastmessage, {
        title: title,
        variant: variant,
        solid: true
      })
    },
    refreshAllAuthObject() {
      const that = this
      this.beapi.refreshAllAuthObject().then((result) => {
        if (result) {
          that.makeToast('done :' + result.d.refreshAutorizationOfTable, that.$t('titSuccess'), 'default')
        } else {
          that.makeToast('error', that.$t('titFailed'), 'danger')
        }
      })
    },
    async refreshFrontEndApp() {
      const that = this
      //debugger
      const frontEndAppsOnDB = await that.beapi.readFrontEndApps()
      if (!frontEndAppsOnDB) {
        that.makeToast('error', that.$t('titFailed'), 'danger')
        return
      }
      const appLocal = that.$store.getters.getOriginalAppList
      for (const fo of appLocal) {
        if (fo.Id) {
          const idx = frontEndAppsOnDB.find((item) => {
            return item.AppName === fo.AppName
          })
          if (idx) {
            //esiste in locale ma non esite sul DB
            fo.Rolename = idx.Rolename
          }
        }
        this.beapi.UpdateFrontendApp(fo.AppName, fo.AppLink, fo.Description , fo.Icon , fo.Rolename).then((result) => {
          if (!result) {
            that.makeToast('error in:' + fo.AppName, that.$t('titFailed'), 'danger')
          }
        })
      }
    }
  },
  created() {
    //debugger
    this.beapi = new UurlaBEApiUtility(this.$config, this.$store)

  },
  beforeDestroy() {
    delete this.beapi
  }

}
</script>

<style scoped>

</style>

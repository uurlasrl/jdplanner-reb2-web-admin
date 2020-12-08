<template>
  <b-modal
    :id="modalName"
    ref="appsmodal"
    :title="$t('titApps')"
    modal-class="modalclassapplist"
    header-bg-variant="dark"
    header-text-variant="light"
    body-bg-variant="light"
    body-text-variant="dark"
    hide-footer
    scrollable
    size="xl"
  >
    <b-container>
      <b-row cols="3">
        <div v-for="app in appList">
          <b-icon class="uurla-btn-icon" @click="selectApp(app)" scale="2" :icon="app.Icon"></b-icon>
          <br>{{ app.AppName }}
        </div>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: "AppListDialog",
  props: {

    modalName: {
      type: String,
      required: true
    }
  },
  methods: {
    selectApp(app) {
      this.$router.push(this.localePath(app.AppLink))

      this.$refs.appsmodal.hide()
    }
  },
  computed: {
    appList() {

      return this.$store.getters.getAppList;
    }
  },
  created() {

  }
}
</script>

<style>
.modalclassapplist > div {
  position: absolute !important;
  bottom: 45px !important;
  right: 10px !important;
  width: 30%;
  height: 30%;

}
.uurla-btn-icon{
  cursor:pointer;
}
</style>

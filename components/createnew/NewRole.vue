<template>
  <div>
    <b-modal
      :id="modalName"
      ref="modal"
      :title="$t('titNewRole')"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      modal-class="modalclass"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="light"
      body-text-variant="dark"
      footer-bg-variant="secondary"
      footer-text-variant="dark"
      :cancel-title="$t('btnCancel')"
      :ok-title="$t('btnOk')"

    >
      <b-overlay :show="busy" rounded="sm">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="RolenameState"
            :label="$t('lblRolename')"
            label-for="rolenamename-input"
            :invalid-feedback="$t('errmsgNotEmpty')"
          >
            <b-form-input
              style="height:1.5rem"
              id="rolename-input"
              v-model="Rolename"
              :state="RolenameState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :state="DescriptionState"
            :label="$t('lblDescription')"
            label-for="description-input"
            :invalid-feedback="$t('errmsgNotEmpty')"
          >
            <b-form-input
              id="description-input"
              style="height:1.5rem"
              v-model="Description"
              :state="DescriptionState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-overlay>
    </b-modal>

  </div>
</template>

<script>
export default {
  name: "NewRole",
  props: {
    modalName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      Rolename: '',
      Description: '',
      RolenameState: null,
      DescriptionState: null,
      submittedNames: [],
      busy: false,
      fn: null
    }
  },
  methods: {
    makeToast(toastmessage, variant) {
      this.$bvToast.toast(toastmessage, {
        title: variant || 'default',
        variant: variant,
        solid: true
      })
    },
    checkFormValidity() {
      const valid = this.$refs.form.checkValidity()
      this.RolenameState = valid
      return valid
    },
    resetModal() {
      this.Rolename = ''
      this.RolenameState = null
      this.Description = ''
      this.DescriptionState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    async handleSubmit() {
      const that = this

      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      this.$emit('onrolesubmit',{Rolename:this.Rolename, Description:this.Description})

      this.$nextTick(() => {
        this.$bvModal.hide(that.modalName)
      })

    }
  },
  // created() {
  //   const that = this;
  //   this.fn = setInterval(() => {
  //     if (!this.$store.state.initialized) return
  //
  //     const expiredRemainingTime = (that.$store.state.userData.expireIn + that.$store.state.userData.loginDateTime.getTime()) - (new Date())
  //     if (expiredRemainingTime < 5000) {
  //       //auto logoff needed
  //       that.$store.commit('clearStore')
  //       that.$router.push(that.localePath('/'))
  //       that.makeToast(that.$t('msgForcedlogout'), 'danger')
  //     } else if (expiredRemainingTime < 120000) {
  //       //if less then 2 minuted to the expiration time
  //       that.$bvModal.show('login-modal')
  //       that.makeToast(that.$t('msgWaringlogout'), 'warning')
  //     }
  //   }, 60000);
  // },
  // beforeDestroy() {
  //   //debugger
  //   if (this.fn)
  //     clearInterval(this.fn);
  // }
}
</script>

<style>
/*.modalclass > div {*/
/*  position: absolute !important;*/
/*  bottom: 45px !important;*/
/*  right: 10px !important;*/
/*}*/
</style>

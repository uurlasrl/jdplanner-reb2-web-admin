<template>
  <div>

    <!--    <transition name="modal1" enter-active-class="animated slideInBottom" leave-active-class="animated slideOutLeft">-->
    <b-modal
      :id="modalName"
      ref="modal"
      :title="$t('titLogin')"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
      modal-class="modalclass"
      header-bg-variant="dark"
      header-text-variant="light"
      body-bg-variant="dark"
      body-text-variant="light"
      footer-bg-variant="info"
      footer-text-variant="dark"
      :cancel-title="$t('btnCancel')"
      :ok-title="$t('btnOk')"

    >
      <b-overlay :show="busy" rounded="sm">
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-form-group
            :state="nameState"
            :label="$t('lblUsername')"
            label-for="name-input"
            :invalid-feedback="$t('errmsgNotEmpty')"
          >
            <b-form-input
              style="height:1.5rem"
              id="name-input"
              v-model="username"
              :state="nameState"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            :state="passwordState"
            :label="$t('lblPassword')"
            label-for="password-input"
            :invalid-feedback="$t('errmsgNotEmpty')"
          >
            <b-form-input
              id="password-input"
              style="height:1.5rem"
              type="password"
              v-model="password"
              :state="passwordState"
              required
            ></b-form-input>
          </b-form-group>
        </form>
      </b-overlay>
    </b-modal>
    <!--    </transition>-->

  </div>
</template>

<script>
export default {
  name: "LoginComponent",
  props: {
    modalName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      username: '',
      password: '',
      nameState: null,
      passwordState: null,
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
      this.nameState = valid
      return valid
    },
    resetModal() {
      this.username = ''
      this.nameState = null
      this.password = ''
      this.passwordState = null
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    handleSubmit() {
      const that = this
      this.busy = true
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return
      }
      // Push the name to submitted names
      this.submittedNames.push(this.name)

      that.$axios.$post(that.$config.baseUrl + '/api/auth/login', {
        "username": this.username,
        "password": this.password,
      }, {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        }
      })
        .then(function (response) {
          // il login e' andato a buon fine

          const dataToBeStored = {...response.body, loginDateTime: new Date()}
          that.$store.commit('setUserData', dataToBeStored)
          localStorage.setItem('uurla-user-data', JSON.stringify(dataToBeStored))
          localStorage.setItem('uurla-lang', dataToBeStored.lang)

debugger
          //chiamo l'api per leggere le apps
          that.$axios.$get(that.$config.baseUrl + that.$config.apiProjManAppBaseUrl + '/FrontEndAppss', {
            headers: {
              "Authorization": "Bearer " + response.body.accessToken,
              "accept": "application/json",
            }
          }).then(function (response) {
            console.log(response)
            that.busy = false
            debugger;
          })
            .catch(function (error) {
              that.busy = false
              console.log(error)
              debugger;
            });

          that.$nextTick(() => {
            that.$bvModal.hide(that.modalName)
            //debugger
            that.$router.push(that.switchLocalePath(dataToBeStored.lang))


          })
        })
        .catch(function (error) {
          // nome o password errati
          that.busy = false
          that.$store.commit('clearStore')
          console.log(error)
        });

      setTimeout(() => {
        // Hide the modal manually
      }, 3000)
    }
  },
  created() {
    const that = this;
    this.fn = setInterval(() => {
      if(!this.$store.state.initialized) return

      const expiredRemainingTime = (that.$store.state.userData.expireIn + that.$store.state.userData.loginDateTime.getTime()) - (new Date())
      if (expiredRemainingTime < 5000) {
        //auto logoff needed
        that.$store.commit('clearStore')
        that.$router.push(that.localePath('/'))
        that.makeToast(that.$t('msgForcedlogout'),'danger')
      } else if (expiredRemainingTime < 120000) {
        //if less then 2 minuted to the expiration time
        that.$bvModal.show('login-modal')
        that.makeToast(that.$t('msgWaringlogout'),'warning')
      }
    }, 60000);
  },
  beforeDestroy () {
    //debugger
    if (this.fn)
      clearInterval(this.fn);
  }
}
</script>

<style>
.modalclass > div {
  position: absolute !important;
  bottom: 45px !important;
  right: 10px !important;

}

/*.modalclass > .modal-dialog > .modal-content {*/
/*  background-color:red !important;*/
/*}*/
</style>

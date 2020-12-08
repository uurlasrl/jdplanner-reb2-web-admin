<template>
  <div id="my-container">
    <!--    <div class="my-3">-->
    <!--      &lt;!&ndash; Our triggering (target) element &ndash;&gt;-->
    <!--      <b-button id="popover-reactive-1" variant="primary" ref="button">-->
    <!--        Reactive Content Using Slots-->
    <!--      </b-button>-->
    <!--    </div>-->

    <!--    &lt;!&ndash; Output from the popover interaction &ndash;&gt;-->
    <!--    <b-card title="Returned values:" v-if="input1Return && input2Return">-->
    <!--      <p class="card-text" style="max-width: 20rem;">-->
    <!--        Name: <strong>{{ input1Return }}</strong><br>-->
    <!--        Color: <strong>{{ input2Return }}</strong>-->
    <!--      </p>-->
    <!--    </b-card>-->

    <!-- Our popover title and content render container -->
    <!-- We use placement 'auto' so popover fits in the best spot on viewport -->
    <!-- We specify the same container as the trigger button, so that popover is close to button -->
    <b-popover
      variant="primary"
      :target="targhetId"
      triggers="click"
      :show="popoverShow"
      placement="auto"
      container="my-container"
      :title="$t('titUsername')+' '+$store.state.userData.username"
      size="large"
    >
      <div>
        <b-overlay :show="busy" rounded="sm">
          <b-form @submit.stop.prevent="onChangePassword">

            <b-container fluid>
              <b-row cols="1">
                <!--                <b-col align="center">-->
                <!--                <b-button @click="onClose" size="sm" variant="danger">{{ $t('btnClose') }}</b-button>-->
                <!--                </b-col>-->
                <b-col align="center">

                </b-col>
              </b-row>
              <b-row class="password-class">
                <b-col>
                  <label style="height:1.5rem" for="newpassword">{{ $t('lblNewpassword') }}</label>
                </b-col>
                <b-col>
                  <b-form-input
                    type="password"
                    id="newpassword"
                    v-model="$v.form.password1.$model"
                    :state="validateState('password1')"
                    style="height:1.5rem"/>
                  <b-form-invalid-feedback id="input-1-live-feedback">{{
                      $t('errNovalidpassword1')
                    }}
                  </b-form-invalid-feedback>

                  <b-form-input
                    ref="newpassword2"
                    type="password"
                    id="newpassword2"
                    v-model="$v.form.password2.$model"
                    :state="validateState('password2')"
                    style="height:1.5rem"
                  />
                  <b-form-invalid-feedback id="input-2-live-feedback">{{
                      $t('errNovalidpassword2')
                    }}
                  </b-form-invalid-feedback>

                </b-col>
              </b-row>

            </b-container>
            <b-button type="submit" class="btn btn-block" :disabled="$v.form.$anyError" variant="primary">
              {{ $t('btnChgpassword') }}
            </b-button>
            <hr>
            <b-button type="submit" class="btn btn-block btn-danger" @click.prevent="$emit('DoLogout')"
                      variant="primary">
              <b-icon icon="power" aria-hidden="true"></b-icon>
              {{ $t('btnLogout') }}
            </b-button>
          </b-form>
          <b-container>
            <b-row>
              <!--              <b-form-group class="mb-1">-->

              <!--                <b-form-invalid-feedback id="input-1-live-feedback">{{ $t('errNovalidpassword2') }}-->
              <!--                </b-form-invalid-feedback>-->
              <!--              </b-form-group>-->

            </b-row>
          </b-container>


        </b-overlay>
      </div>
    </b-popover>
  </div>
</template>

<script>
import {validationMixin} from "vuelidate"
import {required, minLength, sameAs} from "vuelidate/lib/validators";
import {pswval} from '@/plugins/PasswordHelpers'

export default {
  mixins: [validationMixin],
  props: {
    targhetId: {
      type: String,
      required: true
    },
    popoverShow: {
      type: Boolean,
      required: true
    }
  },


  methods: {
    validateState(name) {

      const {$dirty, $error} = this.$v.form[name];
      return $dirty ? !$error : null;
    },
    resetForm() {
      this.form = {
        password1: null,
        password2: null
      };

      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    onChangePassword() {
      this.$v.form.$touch();
      if (this.$v.form.$anyError) {
        return;
      }
//Chiamata API per il cambio password
      this.busy = true
      const that = this
      this.$uurlaBEApi.changePassword(this.form.password1)
        // this.$axios.$get(this.$config.baseUrl + this.$config.apiProjManAppBaseUrl + '/changePassword', {
        //   params: {
        //     "newPassword": "'" + this.form.password1 + "'",
        //     "$format": "json"
        //   },
        //   headers: {
        //     "Authorization": "Bearer " + this.$store.state.userData.accessToken,
        //     "accept": "application/json",
        //   },
        //   paramsSerializer: (params) => {
        //
        //     //return {...params}
        //     // Sample implementation of query string building
        //     let result = '';
        //     Object.keys(params).forEach(key => {
        //       result += `${key}=${encodeURIComponent(params[key])}&`;
        //     });
        //     return result.substr(0, result.length - 1);
        //   }
        // })
        .then(function (response) {
          if (response) {
            that.busy = false
            that.makeToast(that.$t('msgPasswordchange'), 'success')
            that.onClose()
          } else {
            that.busy = false
            that.makeToast(that.$t('msgPasswordnotchange'), 'danger')
            this.resetForm()
            that.nextTick(function () {
              // do something cool
              this.$v.$reset()
            })
          }
        })

    },
    makeToast(toastmessage, variant) {
      this.$bvToast.toast(toastmessage, {
        title: variant || 'default',
        variant: variant,
        solid: true
      })
    },
    onClose() {
      this.resetForm()
      this.$v.$reset();
      this.$emit('closeUserInfo')
    }
  },
  data() {
    return {
      form: {
        password1: null,
        password2: null
      },
      busy: false

    }
  },
  validations: {
    form: {
      password1: {
        required,
        minLength: minLength(8),
        pswval: pswval
      },
      password2: {
        sameAs: sameAs(function () {
          return this.form.password1
        }),
      }
    }
  },

  name: "UurlaPoppoverLanguage"
}
</script>
<style>
.popover {
  min-width: 30em !important;
}
</style>
<style scoped>
.password-class {

  padding: 5px;
  margin: 4px;
}

.nav-item a:hover,
.nav-item a:active,
.nav-item a.nuxt-link-active {
  color: red;
}

.language-item {
  display: inline-flex;
}
</style>

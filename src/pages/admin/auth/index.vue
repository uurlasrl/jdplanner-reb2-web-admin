<template>
  <div class="admin-auth-page">
    <div class="auth-container">
      <form @submit.prevent="onsubmit">
        <AppControlInput :readonly="busy" type="username" v-model="username">E-Mail Address</AppControlInput>
        <AppControlInput :readonly="busy" type="password" v-model="password" >Password</AppControlInput>
        <AppButton type="submit" :disabled="busy" >{{ isLogin ? 'Login' : 'Sign Up' }}</AppButton>
<!--        <AppButton-->
<!--          type="button"-->
<!--          btn-style="inverted"-->
<!--          style="margin-left: 10px"-->
<!--          @click="isLogin = !isLogin">Switch to {{ isLogin ? 'Signup' : 'Login' }}</AppButton>-->
      </form>
    </div>
  </div>
</template>

<script>
import AppControlInput from '@/components/UI/AppControlInput'
import AppButton from '@/components/UI/AppButton'

export default {
  layout: 'admin',
  components: {
    AppControlInput,
    AppButton
  },
  data() {
    return {
      isLogin: true,
      username:'',
      password:'',
      busy:false
    }
  },
  methods:{
    onsubmit(){
      const that = this

      that.busy=true
      that.$axios.$post(process.env.baseUrl+'/api/auth/login', {
        "username": this.username,
        "password": this.password,
      })
        .then(function (response) {
          that.busy=false
          console.log(response)
          const dataToBeStored ={...response.body,loginDateTime:new Date()}
          that.$store.commit('setUserData', dataToBeStored)
          localStorage.setItem('uurla-user-data', JSON.stringify( dataToBeStored ))
        })
        .catch(function (error) {
          that.busy=false
          that.$store.commit('clearStore')

          //localStorage.removeItem('uurla-user-data')
          console.log(error);
        });
    }
  }
}
</script>

<style scoped>
.admin-auth-page {
  padding: 20px;
}

.auth-container {
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 2px #ccc;
  width: 300px;
  margin: auto;
  padding: 10px;
  box-sizing: border-box;
}
</style>

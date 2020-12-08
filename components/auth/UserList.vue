<template>
  <b-modal :id="modalName"
           ref="modal"
           scrollable :title="$t('titUsers')"
           @show="refreshUserList">
    <b-list-group>
      <b-list-group-item v-for="user in Users"  :key="user.Username" button @click="$emit('onSelectUser',user)">{{ user.Username}}</b-list-group-item>
    </b-list-group>
  </b-modal>
</template>

<script>
import UurlaBEApiUsers from "@/beapi/UurlaBEApiUsers";

export default {
  name: "UserList",
   props:{
     //notforrole:[]
     modalName:''
   },
  data(){
    return {
      Users:[]
    }
  },
  methods:{
    async refreshUserList(){

      this.Users = await this.beapi.getAllUsers()
    }
  },
  created() {
   // debugger
    this.beapi = new UurlaBEApiUsers(this.$config, this.$store)
    this.refreshUserList()
  },
  beforeDestroy() {
    delete this.beapi

  },
}
</script>

<style scoped>

</style>

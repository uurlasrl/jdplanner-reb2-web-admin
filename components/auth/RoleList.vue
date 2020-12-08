<template>
  <b-modal :id="modalName"
           ref="modalRoleList"
           scrollable :title="$t('titUsers')"
           @show="refreshUserList">
    <b-list-group>
      <b-list-group-item v-for="role in Roles"  :key="role.Rolename" button @click="$emit('onSelectUser',role)">{{ user.Rolename}}:{{ user.Description }} </b-list-group-item>
    </b-list-group>
  </b-modal>
</template>

<script>
import UurlaBEApiRoles from "@/beapi/UurlaBEApiRoles";

export default {
  name: "RoleList",
   props:{
     //notforrole:[]
     modalName:''
   },
  data(){
    return {
      Roles:[]
    }
  },
  methods:{
    async refreshRoleList(){

      this.Roles = await this.beapi.getAllRoles()
    }
  },
  created() {
   // debugger
    this.beapi = new UurlaBEApiRoles(this.$config, this.$store)
    this.refreshRoleList()
  },
  beforeDestroy() {
    delete this.beapi

  },
}
</script>

<style scoped>

</style>

<template>
  <div>
    <b-container fluid>
      <!-- User Interface controls -->
      <b-row>
        <b-col>
          <b-button-group>
            <b-button @click="refreshRoleList2"><b-icon icon="arrow-clockwise"></b-icon> {{$t('btnRefresh')}}</b-button>
          </b-button-group>
        </b-col>
        <b-col lg="6" class="my-1">
          <b-form-group
            :label="$t('lblFilter')"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                v-model="filter"
                type="search"
                id="filterInput"
                :placeholder="$t('plcTypetosearch')"
              ></b-form-input>
              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col lg="6" class="my-1">
          <b-form-group
            :label="$t('lblFilteron')"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            :description="$t('msgleavefilter')"
            class="mb-0">
            <b-form-checkbox-group v-model="filterOn" class="mt-1">
              <b-form-checkbox :value="fields[0].key">{{ fields[0].label }}</b-form-checkbox>
              <b-form-checkbox :value="fields[1].key">{{ fields[1].label }}</b-form-checkbox>
              <b-form-checkbox :value="fields[2].key">{{ fields[2].label }}</b-form-checkbox>
            </b-form-checkbox-group>
          </b-form-group>
        </b-col>

      </b-row>

      <!-- Main table element -->
      <b-table
        ref="tbrolesdefs"
        show-empty
        small
        stacked="md"
        :items="roleList"
        :fields="fields"
        :current-page="currentPage"
        :per-page="perPage"
        :filter="filter"
        :filterIncludedFields="filterOn"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        :sort-direction="sortDirection"
        @filtered="onFiltered"
      >
        <template v-slot:cell(Rolename)="row">
          {{ row.value }}
        </template>
        <template v-slot:cell(Description)="row">
          {{ row.value }}
        </template>
        <template v-slot:cell(Users)="row">

          <b-button size="sm" @click="toggleRow(row)" v-if="row.item.Users.length > 0 || row.detailsShowing" :class="{mybtnactive:row.detailsShowing}">
            {{ row.detailsShowing ? $t('lblHideusers') : $t('lblShowusers') }}
          </b-button>
          <b-button size="sm" @click="deleteRole(row)" v-else-if="row.item.Rolename !== 'norole' && row.item.Rolename !== 'admin' && row.item.Rolename !== 'users'">
            {{ $t('btnDelete') }}
          </b-button>

          <b-button size="sm" @click="addUserRole(row) " v-if="row.item.Users.length == 0 || row.detailsShowing ">
            {{ $t('btnAddUser') }}
          </b-button>

        </template>

        <template v-slot:row-details="row">
          <b-card>
            <ul>
              <li class="user-item" v-for="user of row.item.Users" :key="user.Username"><b-button size="sm" variant="outline-danger" @click="removeUserRole(user.Username,row.item.Rolename)"><b-icon icon="person-dash"></b-icon></b-button> {{ user.Username }}: {{ user.Name }}</li>
            </ul>
          </b-card>
        </template>


      </b-table>
      <b-row>
        <b-col>
          <br>
          <b-form-group
            :label="$t('lblRowperpage')"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="3"
            label-align-sm="right"
            label-size="sm"
            label-for="perPageSelect"
            size="sm"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="7" md="6">
          <!-- Use emojis in props -->
          <b-pagination
            v-model="currentPage"
            :total-rows="totalRows"
            :per-page="perPage"
            first-text="⏮"
            prev-text="⏪"
            next-text="⏩"
            last-text="⏭"
            align="right"
            size="sm"
            class="mt-4"
          ></b-pagination>

        </b-col>
      </b-row>
    </b-container>

  </div>
</template>

<script>
import {getters} from "@/store";
import UurlaBEApiRoles from "@/beapi/UurlaBEApiRoles";
import UserList from "@/components/auth/UserList";

export default {
  name: "frontendapps",
  components:{
    UserList
  },
  data() {
    return {
      roleList: [],
      fields: [
        {
          key: 'Rolename',
          label: this.$t('hedRolename'),
          sortable: true
        },
        {
          key: 'Description',
          label: this.$t('hedDescription'),
          sortable: true
        },
        {
          key: 'Users',
          label: this.$t('hedUsersdetails'),
          sortable: false,
        }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 25],
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: ['Rolename', 'Description'],
      selectedRole:'',
      openedRoles:{}
    }
  },
  methods: {
    toggleRow(row){
      row.toggleDetails()
      if(!this.openedRoles[row.item.Rolename]){
        this.openedRoles[row.item.Rolename]=true
      }else{
        this.openedRoles[row.item.Rolename]=!this.openedRoles[row.item.Rolename];
      }
    },
    async onNewRoleSubmit(event){
      const that = this
      await this.beapi.updateRole(event.Rolename,event.Description)
      this.$nextTick(() => {
        that.refreshRoleList()
      })
    },
    refreshRoleList() {
      const that = this
      this.totalRows = 0
      this.currentPage = 1
      this.sortBy = ''
      this.filterOn= ['Rolename', 'Description']
      this.filter=''
      this.selectedRole =''
      this.openedRoles={}

      this.beapi.getAllRoles().then((roleList)=> {

        that.roleList = []
        for (const role of roleList) {
          const singleRole = {
            Rolename: role.Rolename,
            Description: role.Description,
            Users: []
          }
          for (const user of role.UserDetails.results) {
            singleRole.Users.push({
              Username: user.Username,
              Name: user.Name
            })
          }
          that.roleList.push(singleRole)
          that.totalRows = that.roleList.length
        }
      }).catch((error)=>{
        console.log('errore nel refresh roleList')
        console.log(errore)
      })
    },
    refreshRoleList2() {

      const that = this
      this.totalRows = this.roleList.length
      //this.currentPage = 1
      //this.sortBy = ''
      //this.filterOn= ['Rolename', 'Description']
      //this.filter=''
      //this.selectedRole =''

      this.beapi.getAllRoles().then((roleList)=> {
        that.roleList = []
        const roleListNew = []
        for (const role of roleList) {
          const singleRole = {
            Rolename: role.Rolename,
            Description: role.Description,
            Users: []
          }
          for (const user of role.UserDetails.results) {
            singleRole.Users.push({
              Username: user.Username,
              Name: user.Name
            })
          }
          roleListNew.push(singleRole)
        }
        that.roleList = roleListNew
        that.$nextTick(() => {
          for(const item of that.$refs.tbrolesdefs.items) {
            if(that.openedRoles[item.Rolename]){
              that.$set(item, '_showDetails', true)
            }
          }
        })
      }).catch((error)=>{
        console.log('errore nel refresh roleList')
        console.log(error)
      })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    async deleteRole(row) {
      const that = this
      //debugger
      await this.beapi.removeRole(row.item.Rolename)
      this.$nextTick(() => {
        that.refreshRoleList()
      })
    },
    onNewUserSubmit(event){
      const that = this
      this.beapi.addUserRole(event.Username,this.selectedRole).then((result)=>{
        if(result){
          that.makeToast(that.$t('msgSuccess'),that.$t('titSuccess'),'success');
          this.$bvModal.hide('newuser')
          that.refreshRoleList2()
        }else{
          that.makeToast(that.$t('msgFailed'),that.$t('titFailed'),'danger');
        }
      })
    },
    removeUserRole(Username, RoleName){
      //ugger
      const that = this
      this.beapi.delUserRole(Username,RoleName).then((result)=>{
        if(result){
          that.makeToast(that.$t('msgSuccess'),that.$t('titSuccess'),'success');
          this.$bvModal.hide('newuser')
          that.refreshRoleList2()
        }else{
          that.makeToast(that.$t('msgFailed'),that.$t('titFailed'),'danger');
        }
      })
    },
    addUserRole(row){
      //debugger
      this.selectedRole=row.item.Rolename
      this.$bvModal.show('newuser')
    },
    makeToast(toastmessage, title, variant) {
      this.$bvToast.toast(toastmessage, {
        title: title,
        variant: variant,
        solid: true
      })
    },
  },
  middleware: "auth-admin",
  created() {
    this.beapi = new UurlaBEApiRoles(this.$config, this.$store)
    this.refreshRoleList()
  },
  beforeDestroy() {
    delete this.beapi
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return {text: f.label, value: f.key}
        })
    }
  },
}
</script>

<style scoped>
.user-item{
  padding-top:1rem;
}
.mybtnactive{
  background-color: blue;
}
</style>

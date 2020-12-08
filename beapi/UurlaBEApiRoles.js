import BEApiBase from "@/beapi/beapibase";

export default class UurlaBEApiRoles extends BEApiBase{
  constructor(config, store) {
    super(store.$axios)
    this.store = store
    this.config = config
  }

  async updateRole(rolename, description) {
    const result = await this._callFn('updateRole', {
      "rolename": "'" + rolename + "'",
      "description": "'" + description + "'",
    })
    return result;
  }

  async removeRole(rolename) {
    const result = await this._callFn('removeRole', {
      "rolename": "'" + rolename + "'",
    })
    return result;
  }

  async delUserRole(username, rolename) {
    const result = await this._callFn('delUserRole', {
      "username": "'" + username + "'",
      "rolename": "'" + rolename + "'",
    })
    return result;
  }

  async addUserRole(username, rolename) {
    const result = await this._callFn('addUserRole', {
      "username": "'" + username + "'",
      "rolename": "'" + rolename + "'",
    })
    return result;
  }

  getAllRoles() {
    return this._callResources('Roles', {
      "$expand": "UserDetails",
    })
    // return result;


    // try {
    //   const result = await this.axios.$get(this.config.baseUrl + this.config.apiProjManAppBaseUrl + '/Roles', {
    //     params: {
    //       "$expand": "UserDetails",
    //       "$format": "json"
    //     },
    //     headers: {
    //       "Authorization": "Bearer " + this.store.state.userData.accessToken,
    //       "accept": "application/json",
    //     }
    //   })
    //   return result.d.results
    // } catch (error) {
    //   console.log('errore nella lettura ruoli')
    //   console.log(error)
    //   return []
    // }
  }


}


import BEApiBase from "@/beapi/beapibase";

export default class UurlaBEApiUsers extends BEApiBase{
  constructor(config, store) {
    super(store.$axios)
    this.store = store
    this.config = config
  }
  async getAllUsers() {
    const result = await this._callResources('Users', {
      "$expand": "RoleDetails",
    })
    return result;


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

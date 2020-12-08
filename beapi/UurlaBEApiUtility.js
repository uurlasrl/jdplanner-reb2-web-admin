import BEApiBase from "@/beapi/beapibase";

export default class UurlaBEApiUsers extends BEApiBase {
  constructor(config, store) {
    super(store.$axios)
    this.store = store
    this.config = config
  }

  async refreshAllAuthObject() {
    const result = await this._callFn('refreshAutorizationOfTable', {
      "tablename": "'ALL'",
      "all": "true"
    })
    return result;
  }

  async UpdateFrontendApp(AppName, AppLink, Description, Icon, Rolename) {
    //debugger
    const result = await this._callFn('UpdateFrontendApp', {
      'AppName': "'" + AppName + "'",
      'AppLink': "'" + AppLink + "'",
      'Description': "'" + Description + "'",
      'Icon': "'" + Icon + "'",
      'Rolename': "'" + Rolename + "'"
    })
    //debugger
    return result;
  }
  async readFrontEndApps(){
    return await this._callResources("FrontEndAppss",{})
  }
}

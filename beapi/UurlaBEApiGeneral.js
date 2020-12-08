import BEApiBase from "@/beapi/beapibase";

export default class UurlaBEApiObject extends BEApiBase {
  constructor(config, store) {
    super(store.$axios)
    this.store = store
    this.config = config
  }

  async login(username, password) {
    try {
      const response = await this.axios.$post(this.config.baseUrl + '/api/auth/login', {
        "username": username,
        "password": password,
      }, {
        headers: {
          "Accept": "application/json",
          "Content-type": "application/json"
        }
      });

      console.log('login eseguito')
      const dataToBeStored = {...response.body, loginDateTime: new Date()}
      this.store.commit('setUserData', dataToBeStored)
      localStorage.setItem('uurla-user-data', JSON.stringify(dataToBeStored))
      localStorage.setItem('uurla-lang', dataToBeStored.lang)
      return response
    } catch (error) {
      console.log('impossibile eseguire il login')
      console.log(error);
      this.store.commit('clearStore')
    }
  }

  async refreshToken(username, accessToken) {
    //refrersh del token
    try {
      const response = await this.axios.$post(this.config.baseUrl + '/api/auth/refresh', {
        "username": username,
        "token": accessToken,
        "type": "Bearer"
      }, {
        headers: {
          "Authorization": "Bearer " + accessToken
        }
      })

      //debugger
      console.log('refresh token eseguito')
      const dataToBeStored = {...response.body, loginDateTime: new Date()}
      this.store.commit('setUserData', dataToBeStored)
      localStorage.setItem('uurla-user-data', JSON.stringify(dataToBeStored))
      localStorage.setItem('uurla-lang', dataToBeStored.lang)
      return response
    } catch (error) {
      console.log('impossibile eseguire il refresh del token')
      console.log(error);
      this.store.commit('clearStore')
      localStorage.removeItem('uurla-user-data')
    }

  }

  async loadApps(token) {
//chiamo l'api per leggere le apps
    //debugger
    const result = await this._callResources('FrontEndAppss', {})
    if (result) {
      this.store.dispatch('loadAppList', result)
    }
    return result;

  }

  changeLanguage(lang) {
//chiamo l'api per leggere le apps

    return this._callFn('changeLanguage', {"lang": "'" + lang + "'"})

    // return this.axios.$get(this.config.baseUrl + this.config.apiProjManAppBaseUrl + '/changeLanguage', {
    //   params: {
    //     "lang": "'" + lang + "'",
    //     "$format": "json"
    //   },
    //   headers: {
    //     "Authorization": "Bearer " + this.store.state.userData.accessToken,
    //     "accept": "application/json",
    //   },
    //   paramsSerializer: (params) => {
    //     let result = '';
    //     Object.keys(params).forEach(key => {
    //       result += `${key}=${encodeURIComponent(params[key])}&`;
    //     });
    //     return result.substr(0, result.length - 1);
    //   }
    // });
  }

  changePassword(newPassword) {
    return this._callFn('changePassword', {"newPassword": "'" + newPassword + "'"})
    // return this.axios.$get(this.config.baseUrl + this.config.apiProjManAppBaseUrl + '/changePassword', {
    //   params: {
    //     "newPassword": "'" + newPassword + "'",
    //     "$format": "json"
    //   },
    //   headers: {
    //     "Authorization": "Bearer " + this.store.state.userData.accessToken,
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
  }

  async getUserList() {

  }


}


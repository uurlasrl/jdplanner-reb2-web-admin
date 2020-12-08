export default class BEApiBase{
  constructor(axios) {
    this.axios = axios
  }
  async _callResources(resource,parameters){
    console.log('letttura risorsa '+resource)
    // if(resource==='Roles')
    //   debugger
    try {
      const params= {
        ...parameters,
        "$format": "json"
      }
      if(!this.config){
        console.log('errorer nella configurazione this.config vuoto')
        console.log('lettura resource '+resource)
        console.log('lettura parameters ')
        console.log(parameters)
        return []
      }
      const result = await this.axios.$get(this.config.baseUrl + this.config.apiProjManAppBaseUrl + '/'+resource, {
        params,
        headers: {
          "Authorization": "Bearer " + this.store.state.userData.accessToken,
          "accept": "application/json",
        }
      })
      console.log('risorsa '+resource+' letta con successo')
      return result.d.results
    } catch (error) {
      //debugger
      console.log('errore nella lettura risorsa '+resource)
      console.log(error)
      return []
    }
  }
  async _callFn(fnName, parameters) {
    //debugger
    console.log('esecuzione fn '+fnName)
//debugger
    try {
      const params = {
        ...parameters,
        "$format": "json"
      };
      const result = await this.axios.$get(this.config.baseUrl + this.config.apiProjManAppBaseUrl + '/' + fnName,
        {
          params,
          headers: {
            "Authorization": "Bearer " + this.store.state.userData.accessToken,
            "accept": "application/json",
          },
          paramsSerializer: (params) => {

            //return {...params}
            // Sample implementation of query string building
            let result = '';
            Object.keys(params).forEach(key => {
              result += `${key}=${encodeURIComponent(params[key])}&`;
            });
            return result.substr(0, result.length - 1);
          }
        });
      console.log('fn '+fnName+' chiamata con successo')
      return result
    } catch (error) {
      console.log('errore chiamata a ' + fnName)
      console.log(error)
      return false
    }
  }

}

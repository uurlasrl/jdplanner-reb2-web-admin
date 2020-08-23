export const state = () => ({
  loadedPosts: [],
  oDataModel: {},
  userData: {
    "id": 0,
    "username": "",
    "email": "",
    "roles": [],
    "expireIn": 0,
    "accessToken": "",
    "tokenType": "Bearer",
    "loginDateTime": null
  },
  initialized: false
})

export const mutations = {
  clearStore(state) {
    state.userData = {
      "id": 0,
      "username": "",
      "email": "",
      "roles": [],
      "expireIn": 0,
      "accessToken": "",
      "tokenType": "Bearer",
      "loginDateTime": null
    }
    state.initialized = false
  },
  setUserData(state, userData) {
    state.userData = userData
    state.initialized = true
  },

  setPosts(state, posts) {
    state.loadedPosts = posts
  },
  setODataModel(state, oModel) {
    state.oDataModel = oModel
  },
  // initializeStore(store, isInit) {
  //   store.initialized = isInit
  // },
}
export const actions = {

  refreshToken(vuexContext, data) {
    this.$axios.$post(process.env.baseUrl+'/api/auth/login', {
      "username": data.username,
      "token": data.accessToken,
      "type": "Bearer"
    },{
      headers: {
        "Conttent-type": "application/json",
        "Accept": "application/json"
      }
    })
      .then(function (response) {
        console.log(response)
        vuexContext.commit('setUserData', response.body)
        localStorage.setItem('uurla-user-data', JSON.stringify( response.body))
      })
      .catch(function (error) {
        vuexContext.commit('clearStore')
        //localStorage.removeItem('uurla-user-data')

        console.log(error);
      });
  },

  getToken(vuexContext, data) {
    this.$axios.$post(process.env.baseUrl, {
      "username": data.username,
      "password": data.accessToken,
    })
      .then(function (response) {
        console.log(response)
        commit('setUserData', response.body)
        localStorage.setItem('uurla-user-data', JSON.stringify( response.body))
      })
      .catch(function (error) {
        //localStorage.removeItem('uurla-user-data')
        console.log(error);
      });

  },

  initializeStore(vuexContext, options) {
  //   if (vuexContext.state.initialized) return;
  //   const userData = localStorage.getItem('uurla-user-data');
  //
  //   if (!userData || !userData.accessToken || !userData.loginDateTime || (userData.expireIn + userData.loginDateTime.getTime()) < (new Date()).getTime()) {
  //     //impossibile inizializzare
  //     vuexContext.commit('clearStore')
  //     // if(userData)
  //     //   localStorage.removeItem('uurla-user-data')
  //     return;
  //   }

    // vuexContext.dispatch('refreshToken', {
    //   username: userData.username,
    //   accessToken: userData.accessToken
    // });

    return;


// mi conservo il resto
    sap.ui.require(["sap/ui/model/odata/v2/ODataModel"], async function (ODataModel) {
      console.log('entra in setODataModel')
      var oModel = new sap.ui.model.odata.v2.ODataModel(vuexContext.state.serviceUrl);
      oModel.callFunction("/getUser", {
        "success": function (oData) {
          console.log(oData)
          vuexContext.commit('setUserData', oData.getUser);
          vuexContext.commit('initializeStore', true)
        }, // callback function for success
        "error": function (oError) {
          vuexContext.commit('initializeStore', false)
        }
      })


      vuexContext.commit('setPosts', [{
        id: '1',
        title: 'first post',
        previewText: 'this is the first post',
        thumbnail: 'http://www.viptechnews.com/wp-content/uploads/2019/12/tech.jpg'
      }, {
        id: '2',
        title: 'second post',
        previewText: 'this is the second',
        thumbnail: 'http://www.viptechnews.com/wp-content/uploads/2019/12/tech.jpg'
      }]);
      vuexContext.commit('initializeStore', true)
      //vuexContext.commit('setODataModel',oModel);


      //vuexContext.commit('setODataModel', new ODataModel(options.serviceUrl));
      //  vuexContext.commit('setODataModel',{});
    })

  },
  setUserData(vuexContext, user) {
    vuexContext.commit('setUserData', user)
  },
  setPosts(vuexContext, posts) {
    vuexContext.commit('setPosts', posts)
  },
  setODataModel(vuexContext, options) {

  }
}

export const getters = {
  loadedPosts(state) {
    return state.loadedPosts
  },
  getUserData(state) {
    return state.userData
  }
}

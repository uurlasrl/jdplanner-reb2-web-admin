export default function (context){

  if (context.store.state.initialized) return;
  const userDataStr = localStorage.getItem('uurla-user-data')
  if(!userDataStr) return
  const userData = JSON.parse(userDataStr)
  if (!userData.loginDateTime) return
  userData.loginDateTime = new Date(userData.loginDateTime)
  if (!userData.accessToken || (userData.expireIn + userData.loginDateTime.getTime()) < (new Date()).getTime()) {

    //impossibile inizializzare quindi pulisco tutto
    context.store.commit('clearStore')
    if(userData){

      //localStorage.removeItem('uurla-user-data')
    }
    return;
  }

  //refrersh del token
  return context.$axios.$post(process.env.baseUrl+'/api/auth/refresh', {
    "username": userData.username,
    "token": userData.accessToken,
    "type": "Bearer"
  },{
    headers:{
      "Authorization":"Bearer " + userData.accessToken
    }
  })
    .then(function (response) {
      console.log(response)

      const dataToBeStored ={...response.body,loginDateTime:new Date()}
      context.store.commit('setUserData', dataToBeStored)
      localStorage.setItem('uurla-user-data', JSON.stringify( dataToBeStored ))
    })
    .catch(function (error) {
      context.store.commit('clearStore')

      //localStorage.removeItem('uurla-user-data')

      console.log(error);
    });

  // vuexContext.dispatch('refreshToken', {
  //   username: userData.username,
  //   accessToken: userData.accessToken
  // });
}

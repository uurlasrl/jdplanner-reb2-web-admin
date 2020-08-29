export default function (context) {
// is authenticated
  //debugger

  if (!context.store.getters.isAuthenticated())
    context.next(false)

  //   store.$router.back()
  // }
  // store.app.router.beforeEach((to, from, next) => {
  //   debugger
  //   if (store.getters.isAuthenticated) {
  //     next()
  //   } else {
  //     next(false)
  //   }
  // })

}

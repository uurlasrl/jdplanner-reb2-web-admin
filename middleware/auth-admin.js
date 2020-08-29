export default function ({store}) {
// is authenticated by admin
  //debugger

    if (!store.getters.isAuthenticated('admin')) {
      store.$router.back()
    }

}

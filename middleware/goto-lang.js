export default function (context) {
//gestione lingua
  let lang = localStorage.getItem('uurla-lang')

  if (!lang){
    //setto comunque il default
    lang = 'it'
    localStorage.setItem('uurla-lang',lang)
  }

  if (context.app.i18n.locale != lang){
    context.redirect(context.app.switchLocalePath(lang))
  }
}

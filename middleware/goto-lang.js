export default function (context) {
//gestione lingua
  const lang = localStorage.getItem('uurla-lang')
 // debugger
  if(context.app.i18n.locale == lang) return;
  context.next(context.app.switchLocalePath(lang))
}

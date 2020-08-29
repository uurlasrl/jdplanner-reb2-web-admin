import { helpers } from 'vuelidate/lib/validators'
export var pswval = helpers.regex('pswval', /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\\£\/\(\)=?'"^§°ç#\-_:,;\.\!|@#\$%\^&\*])(?=.{8,})/);

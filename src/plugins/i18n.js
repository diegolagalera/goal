import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "@/languages/en";
Vue.use(VueI18n)
const messages = {  //agragamos las diferentes traduccions de lenguage
    'en': en,
}
  
  export default new VueI18n({
    locale: 'en',
    fallbackLocale: 'en',
    messages
  })
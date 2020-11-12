import Vue from 'vue';
import VueI18n from 'vue-i18n';
import PT from "./i18n/pt.js";
import EN from "./i18n/en.js";
import ES from "./i18n/es.js";

Vue.use(VueI18n);

const messages = {
    'pt': PT.getMessagesPt(),
    'en': EN.getMessagesEn(),
    'es': ES.getMessagesEs()
}

const locale = localStorage.getItem('locale') != null ? localStorage.getItem("locale") : 'en';

const i18n = new VueI18n({
    locale: locale,
    fallbackLocale: 'en',
    messages,
});

export default i18n;
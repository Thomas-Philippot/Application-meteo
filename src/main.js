import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';
import HelloWorld from './components/HelloWorld';
import City from './components/City';

import './styles.scss';

import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

TNSFontIcon.debug = false;
TNSFontIcon.paths = {
  'fa': './css/font-awesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);
Vue.use(VueRouter);
// Uncomment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

const router = new VueRouter({
  pageRouting: true,
  routes: [
    {path: '/master', component: HelloWorld},
    {path: '/city', component: City},
    {path: '*', redirect: '/master'}
  ]
});

router.replace('/master');

new Vue({
  router,
}).$start();

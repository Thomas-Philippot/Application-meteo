import Vue from 'nativescript-vue';
import VueRouter from 'vue-router';
import HelloWorld from './components/HelloWorld';


import './styles.scss';

import {TNSFontIcon, fonticon} from 'nativescript-fonticon';

TNSFontIcon.debug = true;
TNSFontIcon.paths = {
  'fa': './css/font-awesome.css',
};
TNSFontIcon.loadCss();

Vue.filter('fonticon', fonticon);
Vue.use(VueRouter);
// Uncomment the following to see NativeScript-Vue output logs
//Vue.config.silent = false;

new Vue({

  render: h => h(HelloWorld),


}).$start();

import Vue from 'vue'
import App from './App.vue'
import {store} from "./store";
import VueRouter from 'vue-router'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import About from "./components/About";
import Posts from "./components/Posts";
import Post from "./components/Post";
import NotFound from "./components/NotFound";
import Login from "./components/user/Login";
import LoginOut from "./components/user/LoginOut";
import RegisterUser from "./components/user/RegisterUser";

Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

/**
 * Create routes
 */

const router = new VueRouter({
    routes: [
        {name: 'login', path: '/', component: Login},
        {name: 'register', path: '/register', component: RegisterUser},
        {name: 'posts', path: '/posts', component: Posts},
        {name: 'about', path: '/about', component: About},
        {name: 'post', path: '/post/:id', component: Post},
        {name: 'logout', path: '/logout', component: LoginOut},
        {path: '*', component: NotFound}
    ],
    mode: 'history'
})


Vue.config.productionTip = false

new Vue({
    store: store,
    router,
    render: h => h(App),
}).$mount('#app')

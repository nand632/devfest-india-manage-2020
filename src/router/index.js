import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import firebase from '@/config/firebase';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
      title: "Home"
    }
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import(/* webpackChunkName: "about" */ '../views/Registration.vue'),
    meta: {
      requiresAuth: true,
      title: "Registration"
    }
  },
  {
    path: '/community',
    name: 'Community',
    component: () => import(/* webpackChunkName: "about" */ '../views/Community.vue'),
    meta: {
      requiresAuth: true,
      title: "Community"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue'),
    meta: {
      requiresAuth: false,
      title: "Login"
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + " - DevFest India Admin";
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (firebase.auth.currentUser) {
      next();
    } else {
      next('login');
    }
  } else if (firebase.auth.currentUser && to.name == "Login") {
    next("/");
  } else {
    next();
  }
});

export default router

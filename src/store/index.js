import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: true,
    items: [
      {
        text: "Home",
        to: "/",
        icon: "mdi-home",
      },
      {
        text: "Registration",
        to: "/registration",
        icon: "mdi-account-multiple",
      },
      {
        text: "Community wise Data",
        to: "/community",
        icon: "mdi-code-brackets",
      }
    ],
  },
  getters:{
    links: (state) => {
      return state.items
    }
  },
  mutations: {
    setDrawer: (state, payload) => (state.drawer = payload),
    toggleDrawer: state => (state.drawer = !state.drawer),
  },
  actions: {
  },
  modules: {
  }
})

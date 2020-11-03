import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import build from './modules/build'


Vue.use(Vuex)

const dataState = createPersistedState({
    paths: ['user', 'build']
})

export default new Vuex.Store({
    modules: {
        user,
        build
    },
    plugins: [dataState]
})
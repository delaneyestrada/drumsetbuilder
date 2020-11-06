import Vuex from 'vuex'
import Vue from 'vue'
import createPersistedState from 'vuex-persistedstate'
import user from './modules/user'
import build from './modules/build'
import app from './modules/app'


Vue.use(Vuex)

const dataState = createPersistedState({
    paths: ['user', 'build', 'app']
})

export default new Vuex.Store({
    modules: {
        user,
        build,
        app
    },
    plugins: [dataState]
})
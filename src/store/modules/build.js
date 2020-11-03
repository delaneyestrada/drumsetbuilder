// const initialState = {
//     persisted: {
//       authenticated: false,
//       userId: null,
//       username: null,
//       authToken: null,
//       buildId: null
//     }
//   }

const getDefaultState = () => {
    return {
        buildId: null
    }
}

const state = getDefaultState()

const getters = {}

const actions = {
    setBuildId: ({
        commit
    }, payload) => {
        commit('setBuildId', payload)
    },
    resetUserState: ({
        commit
    }) => {
        commit('resetState')
    }
}

const mutations = {
    setBuildId(state, buildId) {
        state.buildId = buildId
    },
    resetState(state) {
        Object.assign(state, getDefaultState())
        window.localStorage.clear()
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}
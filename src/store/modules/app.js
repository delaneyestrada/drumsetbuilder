const getDefaultState = () => {
    return {
        tooltips: true,
    }
}

const state = getDefaultState()

const getters = {}

const actions = {
    toggleTooltips: ({
        commit
    }) => {
        commit('toggleTooltips')
    },
    resetAppState: ({
        commit
    }) => {
        commit('resetState')
    }
}

const mutations = {
    resetState(state) {
        Object.assign(state, getDefaultState())
        window.localStorage.clear()
    },
    toggleTooltips(state) {
        state.tooltips = !state.tooltips
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}
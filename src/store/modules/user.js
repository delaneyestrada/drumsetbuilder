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
        authenticated: false,
        userId: null,
        username: null,
        authToken: null
    }
}

const state = getDefaultState()

const getters = {
    user: state => state
}

const actions = {
    fetchUser: async ({
        commit
    }, {
        username,
        password
    }) => {
        var authCreds = {
            username,
            password
        }

        const resp = await fetch('http://localhost:5001/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(authCreds)
        })
        console.log(resp)
        const data = await resp.json()
        console.log(data)
        let payload = {
            ...data,
            authToken: resp.headers.get('auth-token')
        }
        console.log(payload)

        commit('authenticate', payload)
    },
    resetUserState: ({
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
    authenticate(state, data) {
        if (data.success) {
            state.userId = data.user
            state.username = data.username
            state.authToken = data.authToken
            state.authenticated = true
        } else {
            state.authenticated = false
            // this.signIn.error = true
        }

    }
}


export default {
    state,
    getters,
    actions,
    mutations
}
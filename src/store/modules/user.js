import * as fb from '../../firebase'


const state = {
    userProfile: {}
}

const getters = {
    user: state => state
}

const actions = {
    async login({
        dispatch
    }, form) {
        // sign user in
        const {
            user
        } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)

        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({
        commit
    }, user) {
        // fetch user profile
        const userProfile = await fb.usersCollection.doc(user.uid).get()

        // set user profile in state
        commit('setUserProfile', userProfile.data())

    },
    async register({
        dispatch
    }, form) {
        // sign user up
        const {
            user
        } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

        // create user profile object in userCollections
        await fb.usersCollection.doc(user.uid).set({
            username: form.username,
            email: form.email,
            builds: []
        })

        // fetch user profile and set in state
        dispatch('fetchUserProfile', user)
    },
    async logout({
        commit
    }) {
        await fb.auth.signOut()

        // clear userProfile and redirect to /login
        commit('setUserProfile', {})
    },
    async addBuild({
        dispatch
    }, build) {
        let user = await fb.auth.currentUser
        await fb.usersCollection.doc(user.uid).update({
            builds: fb.fb.firestore.FieldValue.arrayUnion(build)
        })
        dispatch('fetchUserProfile', user)
    },
    async deleteBuild({
        dispatch
    }, buildId) {
        let user = await fb.auth.currentUser
        let userObj = await fb.usersCollection.doc(user.uid).get()
        let builds = userObj.get('builds').filter(build => build._id != buildId)
        await fb.usersCollection.doc(user.uid).update({
            builds
        })
        dispatch('fetchUserProfile', user)
    }
}

const mutations = {
    setUserProfile(state, val) {
        state.userProfile = val
    }
}


export default {
    state,
    getters,
    actions,
    mutations
}
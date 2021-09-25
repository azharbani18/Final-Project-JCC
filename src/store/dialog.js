export default {
    namespaced : true,
    state: {
        status: false,
        component: '',
        params: {}
    },
    getters: {
        status : state => state.status,
        component : state => state.component,
        params : state => state.params,
    },
    mutations: {
        setComponent : (state , {component , params}) => {
            state.component = component
            state.params = params
        },
        setStatus : (state, status) => {
            state.status = status
        }
    },
    actions: {
        setStatus : ( {commit} , status) => {
            commit('setStatus', status)
        },
        setComponent: ( {commit} , {component, params}) => {
            commit('setComponent', {component, params})
            commit('setStatus', true)
        },
    }
}
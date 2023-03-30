export default {
    SET_LOADING: (state, loading = false) => {
        state.isLoading = loading;
    },
    SET_LIST_PROJECTS: (state, data) => {
        state.listProjects = data
    },
    SET_CURRENT_USER: (state, data) => {
        state.currentUser = data;
    },
    SET_USER_ROLE: (state, data) => {
        state.currentUser = {
            ...state.currentUser,
            role: data
        }
    },
    SET_LIST_USERS: (state, data) => {
        state.listUsers = data
    },
    SET_MESSAGES: (state, data) => {
        state.messages = data
    },
    SET_CHECKIN: (state, data) => {
        state.checkins = data
    },
    SET_RECORDS: (state, data) => {
        state.records = data
    }
}
import store from '../store';

const ifNotAuthenticated = (to, from, next) => {
    // 1. Router allow when login
    if(store.getters.isLogin === false ) {
        next(); //to go
    } else {
        next({
            name: 'portal-page',
            query: {
                redirect: to.name
            }
        })
    }
    
}

const ifAuthenticated = (to, from, next) => {
    // 2. Router allow when not login (Login, Register)
    if(store.getters.isLogin === true) {
        next(); //to go
    } else {
        next({
            name: 'login-page',
            query: {
                redirect: to.name
            }
        })
    }
}

const ifStaffAuthenticated = (to, from, next) => {
    if(store.state.currentUser.role== 1) {
        next(); //to go
    } else {
        next({
            name: 'admin-page',
            query: {
                redirect: to.name
            }
        })
    }
}

const ifAdminAuthenticated = (to, from, next) => {
    if(store.state.currentUser.role == 2) {
        next(); //to go
    } else {
        next({
            name: 'staff-page',
            query: {
                redirect: to.name
            }
        })
    }
}

export {
    ifNotAuthenticated, ifAuthenticated, ifStaffAuthenticated, ifAdminAuthenticated
}
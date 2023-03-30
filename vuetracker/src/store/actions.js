import { data } from 'jquery';
import { v4 as uuidv4 } from 'uuid'
import { auth, projectRef, userRef, checkinRef, chatRef, recordRef} from '../config/database'
export default {
    setLoading({ commit }, loading = false) {
        commit('SET_LOADING', loading)
    },
    onListenerProjects({ commit, state }) {
        // loading starts once
        let flag = false; 
        commit('SET_LOADING', true);
        projectRef.on('value', function (snapshot) {
            if (!flag) {
                flag = true;
                commit('SET_LOADING', false)
            }           
            commit('SET_LIST_PROJECTS', snapshot.toJSON());
        });
    },
    async createProject({ commit }, data) {
        
        commit('SET_LOADING', true)
        try {
            let projectId = uuidv4()
            await projectRef.child(projectId).set(data)
            commit('SET_LOADING', false);
            return {
                isSuccess: true,
                error: null
            }
        } catch (e) {
            commit('SET_LOADING', false);
            return {
                isSuccess: false,
                error: e.message
            }
        }
    },
    async register({ commit }, data) {
        
        try {
            commit('SET_LOADING', true);
            var email=data.email;
            var password = data.password;
            let result = await auth.createUserWithEmailAndPassword(email,password);            
            
            await userRef.child(result.user.uid).set({
                email: data.email,
                name: data.name,
                role: data.role,
                checkRole: data.role
            })

            commit('SET_CURRENT_USER', { email: data.email, uid: result.user.uid })
            commit('SET_USER_ROLE', data.role);
            setTimeout(() => {
                commit('SET_LOADING', false);
            }, 2000);
            
            return {
                isSuccess: true,
                error: null,
                role: data.role
            }
        } catch(error) {
            commit('SET_LOADING', false)
            return {
                isSuccess: false,
                error: error.message
            }
        }
    },
    async login({ commit }, data) {
        commit('SET_LOADING', true)
        try {
            var email=data.email;
            var password = data.password;

            let result = await auth.signInWithEmailAndPassword(email, password); 
            let userById = await userRef.child(result.user.uid).once('value');

            userRef.child(result.user.uid+"/checkRole").set(data.role);

            commit('SET_LOADING', false)
            
            if(userById.toJSON().role !== data.role){
                commit('SET_CURRENT_USER', {email: "", uid: ""});
                commit('SET_USER_ROLE', 0);
                return {
                    isSuccess: false,
                    error: "Invalid Account! Check your role carefully!",
                    role: 0
                }
            } else{
                commit('SET_CURRENT_USER', {email: this.email, uid: result.user.uid});
                commit('SET_USER_ROLE', data.role);
                return {
                    isSuccess: true,
                    error: null,
                    role: data.role
                }
            }
        } catch(error) {
            commit('SET_LOADING', false)
            return {
                isSuccess: false,
                error: error.message,
                role: 0
            }
        }
    },
    onListenerUser({ commit }) {
        userRef.on('value', function(snapshot) {
            commit('SET_LIST_USERS', snapshot.toJSON())
        });
    },
    async resetCheckRole({ commit }, id) {
        commit('SET_LOADING', true)
        try {
            await userRef.child(id+ "/checkRole").set(0);
            commit('SET_LOADING', false);
        } catch (e) {
            commit('SET_LOADING', false);
        }
    },
    async getUserById( { commit } ,id) {
        try {
            let result = await userRef.child(id).once('value');
            if(result.val()) {
                return {
                    isSuccess: true,
                    user: result.val()
                }
            }
            return {
                isSuccess: false,
                user: null,
                error: null
            }
        } catch(e) {
            return {
                isSuccess: false,
                error: e.message
            }
        }
    },
    async checkinOfProject({ commit }, data) {
        commit('SET_LOADING', true)
        
        try {
            let checkinId = uuidv4()
            let checkinData = {
				date: data.date,
				time_in: data.time_in,
				time_out: data.time_out,
				doneTasks: data.doneTasks,
                chkTime: new Date().toISOString()
			}
            await checkinRef.child(data.id).child(checkinId).set(checkinData)
            commit('SET_LOADING', false);
            return {
                isSuccess: true,
                error: null
            }

        } catch (e) {
            commit('SET_LOADING', false);
            return {
                isSuccess: false,
                error: e.message
            }
        }
    }, 
    async sendMessage({ commit }, data) {        
        try {
            let projectId = data.id;
            let messageId = uuidv4()
            let messageData = {
				content: data.content,
				sender: data.sender,
                messageTime: new Date().toISOString()
			}
            await chatRef.child(projectId).child(messageId).set(messageData)

            return {
                isSuccess: true,
                error: null
            }

        } catch (e) {
            return {
                isSuccess: false,
                error: e.message
            }
        }
    },
    async onListenerCheckins({ commit }){
        checkinRef.on('value', function(snapshot) {
            commit('SET_CHECKIN',snapshot.toJSON()); 
        });
    },
    async onListenerMessages({ commit }){
        chatRef.on('value', function(snapshot) {
            commit('SET_MESSAGES',snapshot.toJSON()); 
        });
    },
    async updateProject({ commit }, data) {        
        try {
            await projectRef.child(data.id).update(data.project)
            return {
                isSuccess: true,
                error: null
            }

        } catch (e) {
            return {
                isSuccess: false,
                error: e.message
            }
        }
    }, 
    async updateStatus({ commit }, data) {        
        try {
            let project = {
                status: data.status
            }
            await projectRef.child(data.id).update(project)
            return {
                isSuccess: true,
                error: null
            }

        } catch (e) {
            return {
                isSuccess: false,
                error: e.message
            }
        }
    },
    async updateHours({ commit }, data) {
        await projectRef.child(data.id).update(data.data)
    },
    async onListenerRecords({ commit }){
        recordRef.on('value', function(snapshot) {
            commit('SET_RECORDS',snapshot.toJSON()); 
        });
    }, 
    async setNewRecord({ commit }, data) {    
        await recordRef.child(data.projId).child(data.data.period).set(data.data);
    },
    async updateRecord({ commit }, data) {
        await recordRef.child(data.projId).child(data.data.period).update(data.data);
    },
}
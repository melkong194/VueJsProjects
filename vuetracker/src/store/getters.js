import { STATUS_CONFIG } from '../config/const';

export default {
    isLogin: state => {
        if(state.currentUser.email !== '' && state.currentUser.uid !== ''&& state.currentUser.role !== 0) return true;
        return false;
    },
    getListProjectFilter: (state) => {
        const listProjects = state.listProjects;
        let inProcess = [],
            toVerify = [],
            complete = [];
        for(let key in listProjects) {
            let value = listProjects[key];
            let data = {
                id: key,
                ...value
            }
            if(value.status === STATUS_CONFIG.IN_PROCESS.value) inProcess.push(data);
            else if(value.status === STATUS_CONFIG.TO_VERIFY.value) toVerify.push(data);
            else if(value.status === STATUS_CONFIG.COMPLETE.value) complete.push(data);
        }
        return { inProcess, toVerify, complete }
    },
    getListStaffEmail: state => {
        //object{email,uid}
        const listUsers = state.listUsers
        let arrStaff = []
        for(let key in listUsers) {
            if(listUsers[key].role == 1)
            {
                let data ={
                    email: listUsers[key].email,
                    uid: key
                }
                arrStaff.push(data);
            }
        }
        return arrStaff
    },
    getMessagesById: state => id => {
        var sortedList = null;
        if(state.messages){
            for(let key in state.messages){
                if(key==id){
                    sortedList = Object.values(state.messages[key]);
                    break;
                }
            }
            if(sortedList){
                sortedList.sort(function (x, y) {
                    return (x.messageTime < y.messageTime) ? -1 : ((x.messageTime > y.messageTime) ? 1 : 0);
                });
            }    
        }
        
        return sortedList;
    },
    getCheckinsById: state => id => {
        var sortedList = null;
        if(state.checkins){
            for(let key in state.checkins){
                if(key==id){
                    sortedList = Object.values(state.checkins[key]);
                    break;
                }
            }
            if(sortedList){
                sortedList.sort(function (x, y) {
                    return (x.chkTime > y.chkTime) ? -1 : ((x.chkTime < y.chkTime) ? 1 : 0);
                });
            }    
        }
        
        return sortedList;
    },
    getLastMessageById: state => id => {
        var sortedList = null;
        if(state.messages){
            for(let key in state.messages){
                if(key==id){
                    sortedList = Object.values(state.messages[key]);
                    break;
                }
            }
            if(sortedList){
                sortedList.sort(function (x, y) {
                    return (x.messageTime < y.messageTime) ? -1 : ((x.messageTime > y.messageTime) ? 1 : 0);
                });
                return sortedList.pop();
            }  
        }
        return null;
    },
    getProjectById: state => id => {
        if(state.listProjects){
            for(let key in state.listProjects){
                if(key==id){
                    return state.listProjects[key];
                    break;
                }
            }
        }
        return null;
    },
    getRecordById: state => id => {
        var sortedList = null;
        if(state.records){
            for(let key in state.records){
                if(key==id){
                    sortedList = Object.values(state.records[key]);
                    break;
                }
            }
            if(sortedList){
                sortedList.sort(function (x, y) {
                    return (x.period < y.period) ? -1 : ((x.period > y.period) ? 1 : 0);
                });
            }  
        }
        return sortedList;
    },
    getLastRecordById: state => id => {
        var sortedList = null;
        if(state.records){
            for(let key in state.records){
                if(key==id){
                    sortedList = Object.values(state.records[key]);
                    break;
                }
            }
            // if(sortedList.length == 1) return sortedList;
            if(sortedList){
                sortedList.sort(function (x, y) {
                    return (x.period < y.period) ? -1 : ((x.period > y.period) ? 1 : 0);
                });
                return sortedList.pop();
            }  
        }
        return null;
    },   
}
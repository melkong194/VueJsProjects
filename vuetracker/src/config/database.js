import { firebase } from '@firebase/app';
import firebaseConfig from "./firebaseConfig"

import "firebase/database";
import "firebase/auth";
import store from '../store'
firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const auth = firebase.auth();
export const projectRef = database.ref('projects');
export const userRef = database.ref('users');
export const checkinRef = database.ref('checkins');
export const chatRef = database.ref('messages');
export const recordRef = database.ref('records');




// database.ref('tasks/my-id-here').set({
//   id: "333",
//   product: "Banh Mi222",
//   price: "3.5"
// });

// const taskRef =database.ref('tasks');
// taskRef.push({
//   title: "Ok la la la",
//   name: "banh mi 323"
// })


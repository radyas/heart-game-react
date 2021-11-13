import firebase from "firebase/compat";

export interface User{
    id: string
    email: string
    firstName: string
    lastName: string
    role: string
}

export interface  AuthUser{
    auth: typeof firebase.auth
    user: User | null
    isLoggedIn: boolean
}

const firebaseConfig = {
    apiKey: "AIzaSyAnjjrlQqnUIGkJa3a3ZjNAxQiOC7yopVQ",
    authDomain: "heartsgame-4e3ee.firebaseapp.com",
    projectId: "heartsgame-4e3ee",
    storageBucket: "heartsgame-4e3ee.appspot.com",
    messagingSenderId: "770470931325",
    appId: "1:770470931325:web:dd7e5569b901a5e9a03a14"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth;
export const db: firebase.firestore.Firestore = firebase.firestore()
export const authUser: AuthUser = {
    auth: auth,
    user: null,
    isLoggedIn: false
}

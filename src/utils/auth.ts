import {authUser, db} from "./firebase";
import {Firebase_Dao} from "./firebase_dao";

export function signup(email: string, password: string) {
    return authUser.auth().createUserWithEmailAndPassword(email, password);
}

export function login(email: string, password: string) {
    authUser.auth().signInWithEmailAndPassword(email, password)
        .then(async response => {
            let dao = new Firebase_Dao(db)
            let user = dao.find_by_id('users', response.user?.uid)
            authUser.isLoggedIn = true
            authUser.user = await user
        })
}

export function logout() {
    authUser.user = null
    authUser.isLoggedIn = false
    return authUser.auth().signOut()
}
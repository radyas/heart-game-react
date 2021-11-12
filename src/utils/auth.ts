import {authUser} from "./firebase";

export function signup(email: string, password: string) {
    return authUser.auth().createUserWithEmailAndPassword(email, password);
}

export function login(email: string, password: string) {
    return authUser.auth().signInWithEmailAndPassword(email, password);
}

export function logout() {
    return authUser.auth().signOut()
}
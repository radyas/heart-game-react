import firebase from "firebase/compat";
import { getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import {Firebase_Dao} from "./firebase_dao";

interface User{
    uid: string
    username: string
    firstName: string
    lastName: string
    role: string
}

export class Firebase {
    private readonly _app;
    private readonly _db;
    private _auth;
    private _authState;
    private _user: User | null = null;

    constructor() {
        let firebaseConfig = {
            apiKey: "AIzaSyAnjjrlQqnUIGkJa3a3ZjNAxQiOC7yopVQ",
            authDomain: "heartsgame-4e3ee.firebaseapp.com",
            projectId: "heartsgame-4e3ee",
            storageBucket: "heartsgame-4e3ee.appspot.com",
            messagingSenderId: "770470931325",
            appId: "1:770470931325:web:dd7e5569b901a5e9a03a14"
        };
        this._app = firebase.initializeApp(firebaseConfig)
        this._db = firebase.firestore(this._app)
        this._auth = firebase.auth()
        this._authState = getAuth()
    }

    login(email: string, password:string): void{
        signInWithEmailAndPassword(this._authState, email, password)
            .then(response => {
                let dao = new Firebase_Dao(this._db)
                this._user = dao.find_by_id('users', response.user.uid) as User | null
                localStorage.setItem('isLoggedIn', 'true')
            })
            .catch(error => {
                alert(error)
            })
    }

    logout():void {
        signOut(this._authState)
            .then(() => {
                this._user = null
                localStorage.removeItem('isLoggedIn')
                alert('Successfully logged out')
            })
    }

    app() {
        return this._app;
    }

    firestore() {
        return this._db;
    }

    auth_user(): User | null {
        return this._user;
    }
}
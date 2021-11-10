import firebase from "firebase/compat";

export class Firebase_Dao {
    private _db: firebase.firestore.Firestore

    constructor(firestore: firebase.firestore.Firestore) {
        this._db = firestore
    }

    find_by_id(collection: string, id: string){
        let obj = null;
        this._db
            .collection(collection)
            .where("uid", "==", id)
            .get()
            .then(async (res) => {
                obj = await res.docs[0].data()
            })
            .catch(error => {
                console.log(error)
            })
        return obj
    }
}
import firebase from "firebase/compat";

export class Firebase_Dao {
    private _db: firebase.firestore.Firestore

    constructor(firestore: firebase.firestore.Firestore) {
        this._db = firestore
    }

    find_by_id(collection: string, id: string){
        return this._db
            .collection(collection)
            .where("id", "==", id)
            .get()
            .then(async (res) => {
                return res.docs[0].data()
            })
            .catch(error => {
                console.log(error)
            })
    }

    add_object(collection: string, data: any){
        return this._db.collection(collection).add(data)
    }
}
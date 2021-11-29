import firebase from "firebase/compat";

export class Firebase_Dao {
    private _db: firebase.firestore.Firestore

    constructor(firestore: firebase.firestore.Firestore) {
        this._db = firestore
    }

    find_by_id(collection: string, id: string| undefined){
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

    find_by_key(collection: string, key: string, value: any){
        return this._db
            .collection(collection)
            .where(key, "==", value)
            .get()
    }

    add_object(collection: string, data: any, id: boolean = true){
        if(id)
            return this._db.collection(collection).doc(data.id).set(data)
        else
            return this._db.collection(collection).doc().set(data)
    }

    update_object(collection: string, data: any, id: string){
        return this._db.collection(collection).doc(id).update(data)
    }

    find_all(collection: string){
        return this._db
            .collection(collection)
            .orderBy('id', 'asc')
            .get()
    }

    get_last_item(collection: string, key: string, order: any = "desc"){
        return this._db
            .collection(collection)
            .orderBy(key, order)
            .limit(1)
            .get()
    }



}
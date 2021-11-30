import {authUser, db} from "../../utils/firebase";
import {Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Firebase_Dao} from "../../utils/firebase_dao";

export default function ListUsers(){
    const user = authUser.user
    const [users, setUsers] = useState<any[]>([])
    useEffect(() => {
        let dao = new Firebase_Dao(db)
        dao.find_all('users')
            .then(response => {
                setUsers(response.docs)
            })
    }, [])

    return(
        <>
            <h2>View Users</h2>
            <hr/>
            <div className="row justify-content-center align-items-center m-3 mt-5">
                <div className="col-md-10">
                    {
                        user && user.role=='admin' &&
                        <>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    users.map((value, index) => (
                                        <tr key={index}>
                                            <td>{value.data().id}</td>
                                            <td>{value.data().firstName}</td>
                                            <td>{value.data().lastName}</td>
                                            <td>{value.data().email}</td>
                                            <td>{value.data().role}</td>
                                        </tr>
                                    ))
                                }
                                </tbody>
                            </Table>
                        </>
                    }
                </div>
            </div>
        </>
    )
}
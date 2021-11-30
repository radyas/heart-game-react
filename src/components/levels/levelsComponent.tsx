import {authUser, db} from "../../utils/firebase";
import {Card, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {Firebase_Dao} from "../../utils/firebase_dao";
import {useHistory} from "react-router-dom";
import {Link} from "react-router-dom";

export default function LevelsComponent(){
    const user = authUser.user
    const history = useHistory()
    const [levels, setLevels] = useState<any[]>([])
    useEffect(() => {
        let dao = new Firebase_Dao(db)
        dao.find_all('levels')
            .then(response => {
                setLevels(response.docs)
            })
        dao.find_by_key('users', 'id', 'HCtKDigzzGOkgBVxTmowXFJoD7q1')
            .then(response => {
                console.log(response.docs[0])
            })
    }, [])

    function handleOnClick(e: any){
        if((user.levels.find((element: any) => element.id == e.target.id)) == undefined){
            history.push(`/levels/${e.target.id}`)
        }
    }

    return(
        <>
            <h2>View Levels</h2>
            <hr/>
            <div className="row justify-content-center align-items-center m-3 mt-5">
                <div className="col-md-10">
                    {user && user.role=='user' &&
                    <>
                        <div className="row justify-content-center">
                            {
                                levels.map((value, i) => (
                                    <div className="col-md-3 m-3 text-center" key={i} onClick={handleOnClick}>
                                        <Card>
                                            <Card.Body>
                                                <h1 id={value.data().id}>Level {value.data().id}</h1>
                                            </Card.Body>
                                            <Card.Footer>
                                                {(user.levels.find((element: any) => element.id == value.data().id)) !== undefined ? 'Completed' : 'Pending'}
                                            </Card.Footer>
                                        </Card>
                                    </div>
                                ))
                            }
                        </div>
                    </>
                    }
                    {
                        user && user.role=='admin' &&
                            <>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>Level</th>
                                        <th>Answer</th>
                                        <th>Image Url</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        levels.map((value, index) => (
                                            <tr key={index}>
                                                <td>{`Level ${value.data().id}`}</td>
                                                <td>{value.data().answer}</td>
                                                <td>{value.data().url}</td>
                                                <td><Link to={`/levels/${value.data().id}`}>View Level</Link></td>
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
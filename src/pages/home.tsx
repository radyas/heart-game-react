import {Card} from "react-bootstrap";
import {authUser, db} from "../utils/firebase";
import {useEffect, useState} from "react";
import {Firebase_Dao} from "../utils/firebase_dao";

function Home(){
    const user = authUser.user
    const [players, setPlayers] = useState<any>("")
    const [admins, setAdmins] = useState<any>("")
    const [levels, setLevels] = useState<any>("")
    const [score, setScore] = useState<any>("")
    const [played, setPlayed] = useState<any>("")

    useEffect(() => {
        let dao = new Firebase_Dao(db)
        dao.find_by_key('users', 'role', 'admin')
            .then(response => {
                setAdmins(response.docs.length)
            })
        dao.find_by_key('users', 'role', 'user')
            .then(response => {
                setPlayers(response.docs.length)
            })
        dao.find_all('levels')
            .then(response => {
                setLevels(response.docs.length)
            })
        if (user && user.role == 'user'){
            setPlayed(user.levels.length)
            let score = 0
            user.levels.forEach((level: any) => {
                score += level.score
            })
            setScore(score)
        }
    }, [])
    return (
        <>
            <h2>Home</h2>
            <hr/>

            <div className="row justify-content-center align-items-center m-3 mt-5">
                <div className="col-md-10">
                    <div className="row ">
                        <div className="col-md-5 m-3 text-center" >
                            <Card>
                                <Card.Body>
                                    <h1>Players : {players}</h1>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-md-5 m-3 text-center" >
                            <Card>
                                <Card.Body>
                                    <h1> Levels : {levels}</h1>
                                </Card.Body>
                            </Card>
                        </div>
                        {
                            user && user.role=='admin' &&
                            (
                                <div className="col-md-5 m-3 text-center" >
                                    <Card>
                                        <Card.Body>
                                            <h1> Admins : {admins}</h1>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        }
                        {
                            user && user.role=='user' &&
                            (
                                <>
                                    <div className="col-md-5 m-3 text-center" >
                                        <Card>
                                            <Card.Body>
                                                <h1> Total Score : {score}</h1>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                    <div className="col-md-5 m-3 text-center" >
                                        <Card>
                                            <Card.Body>
                                                <h1>Levels Played : {played}</h1>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                </>
                            )
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;
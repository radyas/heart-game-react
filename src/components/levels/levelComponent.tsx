import {Image} from "react-bootstrap";
import {useHistory, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Firebase_Dao} from "../../utils/firebase_dao";
import {authUser, db} from "../../utils/firebase";
import {AnswerComponent} from "./answerComponent";

export default function LevelComponent(){
    const params = useParams<any>()
    const history = useHistory()
    const [level, setLevel] = useState<any>({id: null})
    const user = authUser.user
    useEffect(() => {
        let dao = new Firebase_Dao(db)
        dao.find_by_key('levels', 'id', parseInt(params.id))
            .then(response => {
                setLevel(response.docs[0].data())
            })
    }, [])

    function handleOnClick(obj: any) {
        if(obj.target.innerText==level.answer){
            user.levels.push({
                id: level.id,
                score: 10
            })
        }
        else {
            user.levels.push({
                id: level.id,
                score: 0
            })
        }
        db.collection('users')
            .doc(user.id)
            .update(user)
            .then(() => {
                history.push('/levels')
                authUser.user = user
            })
    }
    return (
        <>
            <h2>Level - {level.id}</h2>
            <hr/>

            <div className="row justify-content-center align-items-center m-3 mt-5">
                <div className="col-md-6 border">
                    {level &&
                    <>
                        <Image loading="eager" src={level.url} width="100%"/>

                        { user && user.role==='admin' &&
                            <div className="row justify-content-center text-center">
                                <div className="col-12 m-3">
                                    <h4>answer is {level.answer}</h4>
                                </div>
                            </div>
                        }

                    </>
                    }
                </div>
            </div>

            {level &&
                <>

                    { user && user.role==='user' &&
                        <>
                            <div className="row text-center align-items-center m-3">
                                <h4 >Select an Answer:</h4>
                            </div>
                            <div className="row justify-content-center align-items-center m-3">
                                <div className="col-md-6 border">
                                    <div className="row justify-content-center text-center">
                                        {
                                            Array(10).fill("", 1, 10).map((v, i) =>
                                                <div className="col-2 m-2">
                                                    <AnswerComponent key={i} value={i} onClick={handleOnClick}/>
                                                </div>
                                            )
                                        }
                                        <div className="col-2 m-2">
                                            <AnswerComponent value="0" onClick={handleOnClick}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </>
            }
        </>
    )
}
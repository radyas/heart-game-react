import {useEffect, useState} from "react";
import {Firebase_Dao} from "../../utils/firebase_dao";
import {db} from "../../utils/firebase";
import {Button, Image} from "react-bootstrap";
import {useHistory} from "react-router-dom";


async function get_random_id(dao: any) {
    let num = Math.floor(Math.random() * 999)
    let response = await dao.find_by_key('levels', 'picId', num)
    if(response.size == 0){
        return num;
    }
    else {
        get_random_id(dao)
    }
}

function setState(num: any, setAnswer: any, setUrl: any, setPicId: any) {
    setPicId(num);
    let url = `https://sanfoh.com/heartgame/sixeqgame_${num}.png`
    setUrl(url);
    setAnswer(num?.toString().slice(-1))
}

export default function NewLevelComponent() {
    const [picId, setPicId] = useState<undefined | number>()
    const [url, setUrl] = useState("")
    const [answer, setAnswer] = useState<string | undefined>("")
    let dao = new Firebase_Dao(db)
    const history = useHistory()

    useEffect(() => {
        get_random_id(dao)
            .then(num => {
                setState(num, setAnswer, setUrl, setPicId)
            })
    }, [])
    const handleOnAdd = () => {
        let data = {
            id: 1,
            answer: answer,
            url: url,
            picId: picId,
        }
        dao.get_last_item('levels', 'id')
            .then(res => {
                if(res.empty){
                    data.id = 1
                }
                else {
                    data.id = res.docs[0].data().id + 1
                }
                dao.add_object('levels', data, false)
                    .then(() => {
                        history.push('/levels')
                    })
            })
    }

    const handleOnReload = () => {
        get_random_id(dao)
            .then(num => {
                setState(num, setAnswer, setUrl, setPicId)
            })
    }

    return (
        <>
            <h2>Add Level</h2>
            <hr/>

            <div className="row justify-content-center align-items-center m-3 mt-5">
                <div className="col-md-6 border">
                    {url &&
                    <>
                        <Image loading="eager" src={url} width="100%"/>
                        <div className="row justify-content-center text-center">
                            <div className="col-12">
                                <h4>answer is {answer}</h4>
                            </div>
                        </div>
                        <div className="row m-3">
                            <div className="col-md-6 justify-content-center d-flex mb-2">
                                <Button type="button" variant="success" onClick={handleOnAdd}>
                                    Add Level
                                </Button>
                            </div>
                            <div className="col-md-6 d-flex justify-content-center mb-2">
                                <Button type="button" variant="warning" onClick={handleOnReload}>
                                    Reload Challenge
                                </Button>
                            </div>
                        </div>
                    </>
                    }
                </div>
            </div>
        </>
    )
}
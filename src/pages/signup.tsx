import React from "react";
import {Col} from "react-bootstrap";
import {SignUpComponent} from "../components/auth/signupComponent";
import {login, signup} from "../utils/auth";
import { db } from "../utils/firebase";
import {Firebase_Dao} from "../utils/firebase_dao";

export default class Signup extends React.Component<{ }, any>{
    history

    constructor(props: any) {
        super(props);
        this.history = props.history
    }


    async handleOnSubmit(user_obj: any, history: any){
        let {password, ...user} = user_obj
        try{
            let response = await signup(user.username, password)
            user.id = response.user?.uid
            let dao = new Firebase_Dao(db)
            await dao.add_object('users', user)
            await login(user.username, password)
            history.push('/')
        }
        catch (error){
            console.log(error)
        }
    }

    render() {
        return (
            <main className='text-center vh-100 align-items-center row justify-content-center'>
                <Col md={'4'}>
                    <SignUpComponent handleOnSubmit={this.handleOnSubmit} history={this.history}/>
                </Col>
            </main>
        )
    }

}
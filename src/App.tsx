import React from 'react';
import { Firebase } from "./utils/firebase";
import { LoginComponent } from "./components/auth/loginComponent";
import { Routes, Route } from "react-router-dom";


export default class App<T> extends React.Component<T> {
    fb: Firebase

    constructor(props: T) {
        super(props);
        this.fb = new Firebase()

    }
    render() {
        if(this.fb.auth_user()){
            return <LoginComponent firebase={this.fb}/>
        }
        return (
                <div>
                    <Routes>
                        <Route path="/login" element={<LoginComponent firebase={this.fb}/>} />
                        <Route path="/" element={<LoginComponent firebase={this.fb}/>} />
                    </Routes>
                </div>
        );
    }

}


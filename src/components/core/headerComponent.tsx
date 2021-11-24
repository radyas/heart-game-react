import React from "react";
import {logout} from "../../utils/auth";
import { Link } from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import {authUser} from "../../utils/firebase";

export default class HeaderComponent extends React.Component<any, any>{
    history
    user

    constructor(props: any) {
        super(props);
        this.history = props.history
        this.user = authUser.user
        this.handleOnClick = this.handleOnClick.bind(this)
        this.handleOnClickProfile = this.handleOnClickProfile.bind(this)
    }


    handleOnClick(){
        logout()
            .then(() => {
                this.history.push('/')
            })
    }

    handleOnClickProfile(){
        this.history.push('/profile')
    }

    render() {
        return (
            <header className="p-2 border-bottom sticky-top bg-white">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
                    <Link to="/" className="text-dark text-decoration-none px-4">
                        <h3>Hearts Game</h3>
                    </Link>

                    <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0"/>

                    <Dropdown className='text-end justify-content-end'>
                        <Dropdown.Toggle variant="" id="dropdown-basic">
                            {this.user?.firstName} {this.user?.lastName}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item onClick={this.handleOnClickProfile}>Profile</Dropdown.Item>
                            <Dropdown.Item onClick={this.handleOnClick}>Sign Out</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>

            </header>

        )
    }
}
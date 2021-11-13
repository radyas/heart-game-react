import React from "react";
import {logout} from "../../utils/auth";

export default class HeaderComponent extends React.Component<any, any>{
    history

    constructor(props: any) {
        super(props);
        this.history = props.history
    }


    handleOnClick(){
        logout()
            .then(() => {
                this.history.push('/')
            })
    }

    render() {
        return (
            <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow">
                <p className="navbar-brand col-md-3 col-lg-2 me-0 px-3">Company name</p>
                <button className="navbar-toggler position-absolute d-md-none collapsed" type="button"
                        data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <input className="form-control form-control-dark w-100" type="text" placeholder="Search"
                       aria-label="Search"/>
                    <div className="navbar-nav">
                        <div className="nav-item text-nowrap">
                            <button className="nav-link px-3" onClick={this.handleOnClick}>Sign out</button>
                        </div>
                    </div>
            </header>
        )
    }
}
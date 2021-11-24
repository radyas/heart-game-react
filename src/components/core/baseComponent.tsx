import React from "react";
import HeaderComponent from "./headerComponent";
import {SidebarComponent} from "./sidebarComponent";
import {Route, Switch} from "react-router-dom";
import Home from "../../pages/home";
import {ProfileComponent} from "../auth/profileComponent";
import {authUser} from "../../utils/firebase";
import Levels from "../../pages/levels";
import Statistics from "../../pages/statistics";

export class BaseComponent extends React.Component<any, any>{
    user
    history

    constructor(props: any) {
        super(props);
        this.user = authUser.user
        this.history = props.history
    }

    render() {
        return (
            <>
                <HeaderComponent history={this.history} user={this.user}/>
                <div className="container-fluid">
                    <div className="row">
                        <SidebarComponent history={this.props.history} user={this.user}/>
                        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 pt-3">
                            <Switch>
                                <Route path="/profile" component={ProfileComponent}/>
                                <Route path="/levels" component={Levels}/>
                                <Route path="/statistics" component={Statistics}/>
                                <Route path="/" component={Home}/>
                            </Switch>
                        </main>
                    </div>
                </div>
            </>
        )
    }

}
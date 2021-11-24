import React from 'react';
import { LoginComponent } from "./components/auth/loginComponent";
import {
    Route,
    Switch,
    Redirect,
} from "react-router-dom";
import {authUser} from "./utils/firebase";
import {BaseComponent} from "./components/core/baseComponent";
import Signup from "./pages/signup";


// @ts-ignore
function PrivateRoute({ component: Component, authenticated, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => authenticated === true
                ? <Component {...props}/>
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

export default class App extends React.Component {
    state = {
        authenticated: false,
        loading: true,
    };

    componentDidMount() {
        authUser.auth().onAuthStateChanged((user) => {
            if (user) {
                this.setState({
                    authenticated: true,
                    loading: false,
                });
            } else {
                this.setState({
                    authenticated: false,
                    loading: false,
                });
            }
        })
    }

    render() {
        return (
            <Switch>
                <Route exact path="/signup" component={Signup}/>
                <Route exact path="/login" component={LoginComponent}/>
                <PrivateRoute path="/"
                              authenticated={this.state.authenticated}
                              component={BaseComponent}
                />
            </Switch>
        );
    }

}


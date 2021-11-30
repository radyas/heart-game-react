import {Route, Switch, useRouteMatch} from "react-router-dom";
import NewLevelComponent from "../components/levels/NewLevelComponent";
import LevelComponent from "../components/levels/levelComponent";
import LevelsComponent from "../components/levels/levelsComponent";
import React from "react";
import ListUsers from "../components/users/listUsersComponent";

function Users(){
    let match = useRouteMatch();
    return (
        <>
            <p>Users</p>
            <Switch>
                <Route exact path={match.path}>
                    <ListUsers/>
                </Route>
            </Switch>
        </>
    );
}

export default Users;
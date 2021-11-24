import React from "react";
import {Route, Switch, useRouteMatch} from "react-router-dom";
import NewLevelComponent from "../components/levels/NewLevelComponent";
import LevelsComponent from "../components/levels/levelsComponent";


function Levels(){
    let match = useRouteMatch();
    return (
        <>
            <p>Levels</p>
            <Switch>
                <Route exact path={`${match.path}/add`}>
                    <NewLevelComponent/>
                </Route>
                <Route exact path={match.path}>
                    <LevelsComponent/>
                </Route>
            </Switch>
        </>
    );
}

export default Levels;
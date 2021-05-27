import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import {Articles} from "./pages/Articels";
import {CreateArticle} from "./pages/CreateArticle";
import {DetailPage} from "./pages/DetailPage";
import {AuthPage} from "./pages/AuthPage";

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
        return(
            <Switch>
                <Route path="/articles" exact>
                    <Articles />
                </Route>
                <Route path="/create" exact>
                    <CreateArticle />
                </Route>
                <Route path="/detail/:id" >
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}

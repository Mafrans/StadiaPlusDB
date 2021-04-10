import React from 'react';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";

interface RouterProps {
}

export default function Router(props: RouterProps) {
    return <BrowserRouter>
        <Switch>
            <Route path=''>

            </Route>
        </Switch>
    </BrowserRouter>
}
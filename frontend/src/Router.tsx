import React from 'react';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import ProfileRoute from './routes/ProfileRoute';

interface RouterProps {
}

export default function Router(props: RouterProps) {
    return <BrowserRouter>
        <Switch>
            <Route path={['/profile/:name/:tag', '/profile/:nameAndTag']}>
                <ProfileRoute />
            </Route>
        </Switch>
    </BrowserRouter>
}
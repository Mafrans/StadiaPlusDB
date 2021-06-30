import React from 'react';
import {BrowserRouter, Switch, Route, Link} from "react-router-dom";
import ProfileRoute from './routes/ProfileRoute';
import Navbar from "./components/Navbar";
import styled from "styled-components";

interface RouterProps {
}

export default function Router(props: RouterProps) {
    return <BrowserRouter>
        <Navbar />
        <Switch>
            <Route path={['/profile/:name/:tag', '/profile/:name']}>
                <ProfileRoute />
            </Route>
        </Switch>
    </BrowserRouter>
}
import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import NavBar from './components/Header/navbar';

import CreateEmployee from './pages/Employee/Create';
import ListEmployee from './pages/Employee/List';
import EditEmployee from './pages/Employee/Edit';

import CreateRole from './pages/Role/Create';
import ListRole from './pages/Role/List';
import EditRole from './pages/Role/Edit';

const Routes = () => {
    return (
        <BrowserRouter>
            <NavBar />

            <Container>
                <Switch>
                    <Route exact path="/employees">
                        <ListEmployee />
                    </Route>
                    <Route path="/employees/create">
                        <CreateEmployee />
                    </Route>
                    <Route path="/employees/:id">
                        <EditEmployee />
                    </Route>

                    <Route exact path="/roles">
                        <ListRole />
                    </Route>
                    <Route path="/roles/create">
                        <CreateRole />
                    </Route>
                    <Route path="/roles/:id">
                        <EditRole />
                    </Route>
                </Switch>
            </Container>
        </BrowserRouter>
    )
}

export default Routes;
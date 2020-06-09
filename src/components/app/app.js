import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './app.css';

import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ErrorBoundary from "../error-boundary/error-boundary";
import SwapiService from "../../services/swapi-service";
import { PeoplePage, PlanetsPage, StarshipsPage, LoginPage, SecretPage } from "../pages";

import { SwapiServiceProvider } from "../swapi-service-context";
import StarshipDetails from "../sw-components/starship-details";

export default class App extends  Component {

    swapiService = new SwapiService();

    state = {
        hasError: false,
        isLoggedIn: false
    };

    onLogin = () => {
        this.setState({
            isLoggedIn: true
        })
    };

    componentDidCatch(error, info) {
        this.setState({hasError: true})
    };

    render() {

        const { isLoggedIn } = this.state;

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.swapiService}>
                    <Router>
                        <div className="app">
                            <Header />
                            <RandomPlanet />

                            <Switch>
                                <Route path="/" render={() => <h2>Welcome to StarDB</h2>}
                                       exact />
                                <Route path="/people/:id?" component={PeoplePage} />
                                <Route path="/planets" component={PlanetsPage} />
                                <Route path="/starships" exact component={StarshipsPage} />
                                <Route path="/starships/:id"
                                       render={({ match }) => {
                                           const { id } = match.params;
                                           return <StarshipDetails itemId={id} />
                                       }} />
                                <Route
                                    path="/login"
                                    render={() => (
                                        <LoginPage isLoggedIn={isLoggedIn}
                                                   onLogin={this.onLogin} />
                                    )} />
                                <Route
                                    path="/secret"
                                    render={() => (
                                        <SecretPage isLoggedIn={isLoggedIn} />
                                    )}
                                />
                                <Route render={() => <h2>Page not found</h2>} />
                            </Switch>
                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
};



import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import './app.css';

import Header from "../header/header";
import RandomPlanet from "../random-planet/random-planet";
import ErrorBoundary from "../error-boundary/error-boundary";
import SwapiService from "../../services/swapi-service";
import { PeoplePage, PlanetsPage, StarshipsPage } from "../pages";

import { SwapiServiceProvider } from "../swapi-service-context";
import StarshipDetails from "../sw-components/starship-details";

export default class App extends  Component {

    swapiService = new SwapiService();

    state = {
        hasError: false
    };

    componentDidCatch(error, info) {
        this.setState({hasError: true})
    };

    render() {

        return (
            <ErrorBoundary>
                <SwapiServiceProvider value={this.swapiService}>
                    <Router>
                        <div className="app">
                            <Header />
                            <RandomPlanet />

                            <Route path="/" render={() => <h2>Welcome to StarDB</h2>}
                                   exact />
                            <Route path="/people" component={PeoplePage} />
                            <Route path="/planets" component={PlanetsPage} />
                            <Route path="/starships" exact component={StarshipsPage} />
                            <Route path="/starships/:id"
                                   render={({ match }) => {
                                       const { id } = match.params;
                                       return <StarshipDetails itemId={id} />
                                   }} />

                        </div>
                    </Router>
                </SwapiServiceProvider>
            </ErrorBoundary>
        );
    }
};



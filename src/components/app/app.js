import React, { Component } from "react";

import Header from "../header/header";

import './app.css';
import RandomPlanet from "../random-planet/random-planet";
// import PeoplePage from "../people-page";
// import ItemList from "../item-list";
import ItemDetails from "../item-details";
import SwapiService from "../../services/swapi-service";
// import ErrorButton from "../error-button";
import ErrorBoundary from "../error-boundary/error-boundary";
import Row from "../row/row";

export default class App extends  Component {

    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    toogleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    };

    componentDidCatch(error, info) {
        this.setState({hasError: true})
    };

    render() {

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        const { getPerson, getStarship, getPersonImage, getStarshipImage } = this.swapiService;

        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={ getPerson }
                getImageUrl={getPersonImage} />
        );

        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={ getStarship }
                getImageUrl={getStarshipImage}  />
        );

        return (
            <ErrorBoundary>
                <div className="app">
                    <Header />
                    {/*{ planet }*/}

                    {/*<div className="row mb2 button-row">*/}
                    {/*    <button*/}
                    {/*        className="toggle-planet btn btn-warning btn-lg"*/}
                    {/*        onClick={this.toogleRandomPlanet}>*/}
                    {/*        Toggle Random Planet*/}
                    {/*    </button>*/}
                    {/*    <ErrorButton />*/}
                    {/*</div>*/}

                    {/*<PeoplePage />*/}

                    {/*<div className="row mb2">*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <ItemList*/}
                    {/*            onItemSelected={this.onPersonSelected}*/}
                    {/*            getData={this.swapiService.getAllPlanets}>*/}
                    {/*            {(item) => item.name}*/}
                    {/*        </ItemList>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <ItemDetails personId ={this.state.selectedPerson} />*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    {/*<div className="row mb2">*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <ItemList*/}
                    {/*            onItemSelected={this.onPersonSelected}*/}
                    {/*            getData={this.swapiService.getAllStarships}>*/}
                    {/*            {(item) => item.name}*/}
                    {/*        </ItemList>*/}
                    {/*    </div>*/}
                    {/*    <div className="col-md-6">*/}
                    {/*        <ItemDetails personId ={this.state.selectedPerson} />*/}
                    {/*    </div>*/}
                    {/*</div>*/}


                    <Row
                        left={personDetails}
                        right={starshipDetails} />

                </div>
            </ErrorBoundary>
        )
    }
};



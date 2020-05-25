import React, { Component } from "react";

import Header from "../header/header";

import './app.css';
import RandomPlanet from "../random-planet/random-planet";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";

export default class App extends  Component {

    state = {
        showRandomPlanet: true,
        selectedPerson: null
    };

    toogleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    };

    onPersonSelected = (id) => {
        console.log('selected', id)
        this.setState({
            selectedPerson: id
        })
    };

    render() {

        const planet = this.state.showRandomPlanet ? <RandomPlanet /> : null;

        return (
            <div className="app">
                <Header />
                { planet }

                <button
                    className="toggle-planet btn btn-warning btn-lg"
                    onClick={this.toogleRandomPlanet}>
                    Toggle Random Planet
                </button>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList onItemSelected={this.onPersonSelected} />
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId ={this.state.selectedPerson} />
                    </div>
                </div>

            </div>

        )
    }
};



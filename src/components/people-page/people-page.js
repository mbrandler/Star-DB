import React, { Component } from "react";

import ItemList from "../item-list";
import ItemDetails from "../item-details"
import SwapiService from "../../services/swapi-service";
import Row from "../row/row";
import ErrorBoundary from "../error-boundary/error-boundary";

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: null,
    };

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    };

    render() {

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>
                {/*renderItem ={({name, gender, birthYear}) => `${name} (${gender}, ${birthYear})`}*/}
                {(item) => (
                    `${item.name} (${item.birthYear})`
                )}
            </ItemList>
        );

        const personDetails = (
            <ErrorBoundary>
                <ItemDetails personId ={this.state.selectedPerson} />
            </ErrorBoundary>
        );

        return (
            <Row left={itemList} right={personDetails} />
        )
    }
};






import React, { Component } from "react";

import './person-details.css';
import SwapiService from "../../services/swapi-service";

export default class PersonDetails extends Component {

    swapiService = new SwapiService();

    state = {
        id: null,
        name: null,
        gender: null,
        birthYear: null,
        eyeColor: null
    };

    render() {
        const { id, name, gender, birthYear, eyeColor } = this.state;
        return (
            <div className="person-details card">
                <img className="person-image"
                     src="https://starwars-visualguide.com/assets/img/characters/3.jpg" />

                <div className="card-body">
                    <h4>{name}</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>{gender}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>{birthYear}</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye Color</span>
                            <span>{eyeColor}</span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
};

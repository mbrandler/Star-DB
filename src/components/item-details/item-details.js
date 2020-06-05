import React, { Component } from "react";

import './item-details.css';

import Spinner from "../spinner";
import ErrorButton from "../error-button";

const Record = ({ item, field, label }) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{item[field]}</span>
        </li>
    );
};

export {
    Record
};

export default class ItemDetails extends Component {

    state = {
        item: null,
        image: null,
        loading: true
    };

    componentDidMount() {
        this.updateItem();
    };


    componentDidUpdate(prevProps) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem();
        }
    };

    updateItem() {
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((item) => {
                this.setState({
                    item,
                    image: getImageUrl(item),
                    loading: false
                });
            })
    };

    render() {

        if (!this.state.item) {
            return <span>Select a item from a list</span>;
        }

        const { item, loading, image } = this.state;
        const children = this.props.children;

        const spinner = loading ? <Spinner/> : null;
        const content = !loading ? <ItemDetailsView item={item} image={image} children={children} /> : null;

        return (
            <div className="item-details card">
                {spinner}
                {content}
            </div>
        )
    }
};

const ItemDetailsView = ({ item, image, children }) => {
    const { name } = item;

    return (
        <React.Fragment>
            <img className="item-image"
                 src={image} alt="item" />

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    { React.Children.map(children, (child) => {
                        return React.cloneElement(child, { item });
                     })
                    }
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    )
};




import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faShoppingCart } from '@fortawesome/free-solid-svg-icons'

const Product = (props) => {
    const {name, img, seller, stock, url, price} = props.product;
    return (
        <div className="product-container">
        <div className="product">
        <div className="product-img">
        <img src={img} alt=""/>
        </div>

        <div className="product-description">
        <h3 className="product-name"><a href={url} target="_">{name}</a></h3>
        <h3>${price}</h3>
        <p>By : {seller}</p>
        <p className="stock">Only {stock} left in stock - order soon</p>
        <button onClick={() => props.handleAddProduct(props.product)} className="addBtn"><FontAwesomeIcon icon={faShoppingCart} /> Add to cart</button>
        </div>
        </div>
    </div>
    );
};

export default Product;
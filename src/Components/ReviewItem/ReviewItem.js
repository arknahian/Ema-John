import React from 'react';

const ReviewItem = (props) => {
    const {name, price, img, quantity, key} = props.singleCart;
    return (
        <div>
            <h3 className="product-name">{name}</h3>
            <h4>price {price}</h4>
            <p><b>quantity:  {quantity}</b></p>
            <button onClick={() => props.removeProduct(key)} className="addBtn">remove the product </button>
        </div>
    );
};

export default ReviewItem;
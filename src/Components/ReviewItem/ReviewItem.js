import React from 'react';

const ReviewItem = (props) => {
    const {name, price, img, quantity} = props.singleCart;
    return (
        <div>
            <h3 className="product-name">{name}</h3>
            <h4>price {price}</h4>
            <p><b>quantity:  {quantity}</b></p>
            <button className="add-btn">remove the product </button>
        </div>
    );
};

export default ReviewItem;
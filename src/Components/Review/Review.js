import React, { useEffect, useState } from 'react';
import { getDatabaseCart } from '../../utilities/databaseManager';
import fakeData from "./../../fakeData/index";
import ReviewItem from "./../ReviewItem/ReviewItem";

const Review = () => {
    const [cart, setCart] = useState([])
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        const cartProduct = productKeys.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProduct);
        
    }, [])
    return (
        <div>
            {
                cart.map(c => <ReviewItem singleCart={c} key={c.key}></ReviewItem>)
            }
        </div>
    );
};

export default Review;
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import fakeData from "./../../fakeData/index";
import ReviewItem from "./../ReviewItem/ReviewItem";
import happyImage from '../../images/giphy.gif';

const Review = () => {
    const [cart, setCart] = useState([]);
    const removeProduct = (productKey) => {
        const newProduct = cart.filter(product => product.key !== productKey);
        setCart(newProduct)
        removeFromDatabaseCart(productKey)
    }
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
    const [orderPlace, setOrderPlace] = useState(false);
    const handleRemove = () => {
        setCart([]);
        setOrderPlace(true);
        processOrder();
    }
    let thankyou;
    if (orderPlace) {
        thankyou = <img src={happyImage} alt="" />
    }
    return (
        <div>
         <main>
        <div className="product-exploring">
            {
               cart.map(c => <ReviewItem removeProduct={removeProduct} singleCart={c} key={c.key}></ReviewItem>)     
            }
        </div>
            {
                thankyou
            }
        <div className="order-summary">
            <Cart totalOrder={cart}>
            <button onClick={handleRemove} className="addBtn">Place Order</button>
            </Cart>
        </div>
    </main>
        </div>
    );
};

export default Review;
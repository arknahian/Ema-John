import React, { useState } from 'react';
import fakeData from "./../../fakeData/index";
import "./Shop.css";
import Product from "./../Product/Product";
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react/cjs/react.development';
import { Link } from "react-router-dom";
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const addedProduct = getDatabaseCart();
        const productKeys = Object.keys(addedProduct);
        const existingKeys = productKeys.map(keys => {
            const product = fakeData.find(pd => pd.key === keys);
            product.quantity = addedProduct[keys]
            return product;
        })
        setCart(existingKeys)
    }, [])

    const handleAddProduct = (product) => {
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if (sameProduct) {
            count = sameProduct.quantity + 1;
            sameProduct.quantity = sameProduct.quantity + 1;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }
    return (
    <main>
        <div className="product-exploring">
            {
                    products.map(pd => <Product showAddToCart={true} handleAddProduct={handleAddProduct} product={pd} key={pd.key}></Product>)
            }
        </div>
        <div className="order-summary">
            <Cart totalOrder={cart}>
            <Link to="/review"><button className="addBtn">Review Your Order</button></Link>
            </Cart>
        </div>
    </main>
    );
};

export default Shop;
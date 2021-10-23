import React, { useState } from 'react';
import fakeData from "./../../fakeData/index";
import "./Shop.css";
import Product from "./../Product/Product";
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const newProduct = [...cart, product];
        setCart(newProduct);
        console.log(cart)
    }
    return (
    <main>
        <div className="product-exploring">
            {
                    products.map(pd => <Product handleAddProduct={handleAddProduct} product={pd}></Product>)
            }
        </div>
        <div className="order-summary">
            <Cart totalOrder={cart}></Cart>
        </div>
    </main>
    );
};

export default Shop;
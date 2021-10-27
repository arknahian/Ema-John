import React, { useState } from 'react';
import fakeData from "./../../fakeData/index";
import "./Shop.css";
import Product from "./../Product/Product";
import Cart from '../Cart/Cart';
import { addToDatabaseCart } from '../../utilities/databaseManager';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);

    const handleAddProduct = (product) => {
        const newProduct = [...cart, product];
        setCart(newProduct);
        const sameProduct = newProduct.filter(pd => pd.key === product.key);
        const count = sameProduct.length;
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
            <Cart totalOrder={cart}></Cart>
        </div>
    </main>
    );
};

export default Shop;
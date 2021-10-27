import React from 'react';
import { useParams } from 'react-router';
import Product from '../Product/Product';
import fakeData from "./../../fakeData/index";

const ProductDetails = () => {
    const {productKey} = useParams()
    const product = fakeData.filter(pd => productKey === pd.key);
    return (
        <div>
            <h1>{productKey} is product details</h1>
            <Product showAddToCart={false} product={product[0]}></Product>
        </div>
    );
};

export default ProductDetails;
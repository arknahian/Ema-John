import { Link } from "react-router-dom";
import "./Cart.css"
const Cart = (props) => {
    const cart = props.totalOrder;
    const total = cart.reduce((total, pd) => total + pd.price, 0);
    let shipping = 0;
    if (total === 0) {
        shipping = 0;
    }
    else if(total < 30 && total > 0){
        shipping = 4;
    }
    else{
        shipping = 3;
    }
    let tax = total * 0.1;
    let totalOrder = tax + shipping + total;
    return (
        <div className="summary">
            <h1>Order Summary</h1>
            <h3 style={{fontWeight: '400'}}>Items Ordered: {cart.length}</h3>
            <p>Items: ${total}</p>
            <p>Shipping and Handling: ${shipping}</p>
            <p>Total Before Tax: ${total}</p>
            <p>Estimated Tax: ${tax.toFixed(4)}</p>
            <p>Ordered Total: ${totalOrder.toFixed(4)}</p>
            <Link to="/review"><button className="addBtn">Review Your Order</button></Link>
        </div>
    );
};

export default Cart;
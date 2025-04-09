import React from "react";
import CreditCardPayment from "./CreditCardPayment";

const Checkout = () => {
    return (
        <div className="checkout-container">
            <h2>Checkout</h2>
            <CreditCardPayment />
        </div>
    );
};

export default Checkout;
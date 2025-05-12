// src/components/PayPalPayment.js
import React, { useEffect } from "react";

const PayPalPayment = ({ amount }) => {
    useEffect(() => {
        if (window.paypal) {
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: amount,
                            },
                        }],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log("Payment Approved: ", order);
                    alert("Payment successful!");
                },
                onError: (err) => {
                    console.error("Error with PayPal Payment: ", err);
                    alert("An error occurred with PayPal payment.");
                },
            }).render("#paypal-button-container");
        }
    }, [amount]);

    return <div id="paypal-button-container"></div>;
};

export default PayPalPayment;

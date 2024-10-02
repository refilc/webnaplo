import { PayPalButtons, PayPalButtonsComponentProps, PayPalScriptProvider, ReactPayPalScriptOptions } from '@paypal/react-paypal-js';
import { redirect } from 'react-router-dom';

const PaymentPaypalMobileCheckout = () => {
    const initialOptions: ReactPayPalScriptOptions = {
        clientId: "Aekpi-WNRxB3iBDO2ypQhNdCAKaAuvRyt_3Sdu7jSVEGQv56iQ0sP7-KI5Inw4NU3QQ41hkAA8W-Iw9o",
        locale: 'hu_HU',
        currency: 'EUR',
        vault: true,
        intent: "subscription",
    };
    const styles: PayPalButtonsComponentProps["style"] = {
        shape: "pill",
        layout: "vertical",
        color: "gold",
    };

    const createSubscription: PayPalButtonsComponentProps["createSubscription"] = (_, actions) => {
        return actions.subscription.create({
            "plan_id": "PLAN_ID"
        });
    };
    const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
        const response = await fetch("https://api.refilc.hu/v4/payment/paypal-capture-order", {
            method: "POST",
            body: JSON.stringify({
                order_id: data.orderID,
                device_id: "DEVICE_ID",
            }),
        });

        const details = (await response.json())['data'];

        redirect(`https://api.refilc.hu/v4/payment/paypal-finish?product=${details['product']}&reference_id=${details['reference_id']}`);
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons style={styles} createSubscription={createSubscription} onApprove={onApprove} />
        </PayPalScriptProvider>
    );
}

export default PaymentPaypalMobileCheckout;
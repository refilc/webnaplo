import { PayPalButtons, PayPalButtonsComponentProps, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentPaypalMobileCheckout = () => {
    const [{ isPending }] = usePayPalScriptReducer();

    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const deviceId = searchParams.get("device_id") ?? '';

    if (deviceId.replace(/\s/g, '') == '') {
        // navigate('/payment');
        alert('device id is empty');
        window.location.replace('https://refilc.hu');
        return;
        // navigate('/');
    }
    
    const styles: PayPalButtonsComponentProps["style"] = {
        shape: "pill",
        layout: "vertical",
        color: "gold",
    };

    const createSubscription: PayPalButtonsComponentProps["createSubscription"] = (_, actions) => {
        return actions.subscription.create({
            "plan_id": "P-37G01834G2391794DM5HCEJI"
        });
    };
    const onApprove: PayPalButtonsComponentProps["onApprove"] = async (data) => {
        const response = await fetch("https://api.refilc.hu/v4/payment/paypal-capture-order", {
            method: "POST",
            body: JSON.stringify({
                order_id: data.orderID,
                device_id: deviceId,
            }),
        });

        const details = (await response.json())['data'];

        navigate(`https://api.refilc.hu/v4/payment/paypal-finish?product=${details['product']}&reference_id=${details['reference_id']}`);
    };

    return (
        <div className='bg-white w-screen h-screen flex flex-col items-center justify-center'>
            <div className='bg-white'>
                {isPending ? <p className='text-black'>Betöltés...</p> : (
                    <PayPalButtons className='' style={styles} createSubscription={createSubscription} onApprove={onApprove} />
                )}
            </div>
        </div>
    );
}

export default PaymentPaypalMobileCheckout;
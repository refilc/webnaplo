import { ReactPayPalScriptOptions, PayPalScriptProvider } from "@paypal/react-paypal-js";
import PaymentPaypalMobileCheckout from "./pages/paypal/mobile-checkout";

const PaymentLayout = ({ currentPage }: { currentPage: string }) => {
    const initialOptions: ReactPayPalScriptOptions = {
        clientId: "ATwZS8ntp-Z_2dHNrQRfZADStvvkJcawqCtvRS6NV8m02LMSkWU-jeQTaJwjQwII6mhGOAmCTV2lSQYm",
        locale: 'hu_HU',
        currency: 'EUR',
        vault: true,
        intent: "subscription",
    };

    return (
        <div className="select-none flex flex-col w-full h-full bg-[#0F131D]">
            <PayPalScriptProvider options={initialOptions}>
                {
                    currentPage == 'pp-mobile-checkout' ? <PaymentPaypalMobileCheckout /> : 
                    ''
                }
            </PayPalScriptProvider>
        </div>
    )
}

export default PaymentLayout;

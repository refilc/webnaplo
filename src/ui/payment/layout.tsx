import PaymentPaypalMobileCheckout from "./pages/paypal/mobile-checkout";

const PaymentLayout = ({ currentPage }: { currentPage: string }) => {
    return (
        <div className="select-none flex flex-col w-full h-full bg-[#0F131D]">
            {
                currentPage == 'pp-mobile-checkoutt' ? <PaymentPaypalMobileCheckout /> : 
                ''
            }
        </div>
    )
}

export default PaymentLayout;

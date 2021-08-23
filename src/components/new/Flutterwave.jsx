import React from 'react'
import AppWrapper from '../AppWrapper'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';

function Flutterwave() {
    const config = {
        public_key: 'FLWPUBK_TEST-4b008ac3813b3dd8070ba89b733b7594-X',
        tx_ref: Date.now(),
        amount: 10,
        currency: 'KES',
        payment_options: 'card',
        customer: {
            email: 'user@gmail.com',
            phonenumber: '07064586146',
            name: 'Enock Agwera',
        },
        customizations: {
            title: 'Afya Kwanza',
            description: 'Daily Sacco Contributions',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config);

    return (
        <>
            <AppWrapper>
                <div style={{paddingTop:'30px'}}>
                    <button
                        onClick={() => {
                            handleFlutterPayment({
                                callback: (response) => {
                                    console.log(response);
                                    closePaymentModal() // this will close the modal programmatically
                                },
                                onClose: () => { },
                            });
                        }}
                    >
                      Pay with Mastercard
                    </button>
                </div>
            </AppWrapper>
        </>
    )
}

export default Flutterwave

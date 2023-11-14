import React, { useState, useEffect } from 'react'
import './checkout.css'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Meta from '../../components/meta/Meta';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { base_url } from "../../utils/baseUrl";
import { createUserOrder, emptyUserCart, getUserCart } from "../../features/user/userSlice";
import { toast } from 'react-hot-toast';


const CheckoutPayment = () => {
    const [cartProductState, setCartProductState] = useState([])
    const cartState = useSelector((state) => state?.auth?.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [values, setValues] = useState({
        clientToken: null,
        success: '',
        error: ''
    })
    const { clientToken, success, error, instance } = values

    useEffect(() => {
        getToken();
    }, []);

    useEffect(() => {
        dispatch(getUserCart())
    }, [])

    useEffect(() => {
        let items = []
        for (let index = 0; index < cartState?.length; index++) {
            items.push({
                product: cartState[index]?.productId?._id,
                quantity: cartState[index]?.quantity,
                price: cartState[index]?.price,
                color: cartState[index]?.color?._id,
                size: cartState[index]?.size
            })
        }
        setCartProductState(items)
    }, [])


    const getClientToken = async () => {
        try {
            const response = await axios.get(`${base_url}user/braintree/token`, {
                headers: {
                    "Content-Type": "application/json"
                }
            });
            return response.data;
        } catch (err) {
            console.error(err);

        }
    }

    const makePayment = async (data) => {
        try {
            const response = await axios.post(`${base_url}user/braintree/payment`, data, {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json"
                }
            });
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    const getToken = async () => {
        try {
            const response = await getClientToken();
            if (response.err) {
                setValues({ ...values, error: response.err })
            } else {
                setValues({ ...values, clientToken: response.clientToken })
            }
        } catch (err) {
            console.error(err);
        }
    }


    // get shipping info
    const shippingInfo = JSON.parse(localStorage.getItem('address'));

    //get total amount
    const totalPrice = parseFloat(localStorage.getItem('totalPrice'));

    const onPurchase = () => {
        instance.requestPaymentMethod()
            .then(data => {
                let nonce = data.nonce;
                let paymentData = {
                    payment_method_nonce: nonce,
                    amount: totalPrice,
                };
                makePayment(paymentData).then(response => {
                    if (response.err) {
                        setValues({ ...values, error: response.err });
                    } else {
                        if (response.transaction && response.transaction.id) {
                            paymentData.transactionId = response.transaction.id;
                        }
                        setValues({ ...values, error: "", success: response.success });
                        dispatch(createUserOrder({ totalPrice: totalPrice, orderItems: cartProductState, paymentInfo: paymentData, shippingInfo: shippingInfo }))
                        dispatch(emptyUserCart())
                        dispatch(getUserCart())
                        setCartProductState([])
                        localStorage.removeItem("address");
                    }
                }).catch(err => {
                    setValues({ ...values, error: err, success: "" });
                    toast.success("Payment Completed Successfully");
                });
            });
    };

    return (
        <>
            <Meta title={'Check Out Step 3 | Salinaka'} />
            <main className='content'>
                <div className="checkout">
                    <div className="checkout-header ">
                        <ul className="checkout-header-step">
                            <li className="checkout-step-name ">
                                <div className="checkout-step-item">
                                    <div className="checkout-header-circle">
                                        <h4 className="checkout-header-number">1</h4>
                                    </div>
                                    <h6 className="checkout-header-subtitle">Order Summary</h6>
                                </div>
                            </li>
                            <li className="checkout-step-name ">
                                <div className="checkout-step-item">
                                    <div className="checkout-header-circle">
                                        <h4 className="checkout-header-number">2</h4>
                                    </div>
                                    <h6 className="checkout-header-subtitle">Shipping Details</h6>
                                </div>
                            </li>
                            <li className="checkout-step-name is-active-step">
                                <div className="checkout-step-item">
                                    <div className="checkout-header-circle">
                                        <h4 className="checkout-header-number">3</h4>
                                    </div>
                                    <h6 className="checkout-header-subtitle">Payment</h6>
                                </div>

                            </li>

                        </ul>
                    </div>
                    <Form className="checkout-step-3">
                        {cartProductState.length === 0 ? (
                            <>
                                <h3 className="text-center">Order Placed Successfully!</h3>
                                <br />
                                <h3
                                    style={{
                                        textDecoration: 'underline',
                                        textAlign: 'center',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => navigate('/account/order')}
                                >
                                    Review Your Order
                                </h3>
                            </>
                        ) : (
                            <>
                                <h3 className="text-center">Payment</h3>
                                <br />
                                <div className='payment-subtitle'>Payment Option</div>                            </>
                        )}


                        {clientToken && cartState.length > 0 && (
                            <>
                                <DropIn
                                    options={{
                                        authorization: clientToken,
                                        paypal: {
                                            flow: "vault",
                                        },
                                    }}
                                    onInstance={(instance) => setValues({ ...values, instance: instance })}
                                />
                            </>
                        )}

                        <div className="cart-total text-end">
                            <p className="cart-total-title">Total:</p>
                            <h2 className="cart-total-amount">${totalPrice.toFixed(2)}</h2>
                        </div>
                        <div className="checkout-next">
                            <Link to='/checkout/step2'> <Button className='button button-grey'>
                                <span className='icon' role="img"  ><svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg></span>
                                &nbsp; Go Back</Button>
                            </Link>
                            <Link to='/checkout/step3'>
                                <Button
                                    className='button'
                                    onClick={() => { onPurchase() }}
                                >
                                    <span className='icon' role="img"  ><svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></span>
                                    &nbsp;
                                    {cartProductState.length === 0 ? 'Order Placed' : 'Confirm'}
                                </Button></Link>
                        </div>
                    </Form>
                </div >
            </main >
        </>
    )
}

export default CheckoutPayment
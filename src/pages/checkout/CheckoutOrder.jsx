import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import './checkout.css'
import Meta from '../../components/meta/Meta';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import {
    deleteCartProduct,
    getUserCart,
    updateQuantity,
} from "../../features/user/userSlice";


const CheckoutOrder = () => {
    const [productDetail, setProductDetail] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [itemQuantity, setItemQuantity] = useState({});

    //get cart
    const dispatch = useDispatch();
    const cartState = useSelector((state) => state?.auth?.cart);

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);


    //Update cart quantities
    useEffect(() => {
        if (Array.isArray(cartState) && cartState.length > 0) {
            const initialItemQuantity = {};
            cartState.forEach((cartproduct) => {
                initialItemQuantity[cartproduct._id] = cartproduct.quantity;
            });
            setItemQuantity(initialItemQuantity);
        }
    }, [cartState]);


    useEffect(() => {
        if (productDetail !== null) {
            dispatch(
                updateQuantity({
                    cartItemId: productDetail?.cartItemId,
                    quantity: productDetail?.quantity,
                })
            );
            setTimeout(() => {
                dispatch(getUserCart());
            }, 200);
        }
    }, [productDetail]);

    const handleIncrease = (productId) => {
        const updateItemQuantity = { ...itemQuantity };
        updateItemQuantity[productId] = (updateItemQuantity[productId] || 1) + 1;
        if (updateItemQuantity[productId] < 10) {
            setItemQuantity(updateItemQuantity);
            setProductDetail({
                cartItemId: productId,
                quantity: updateItemQuantity[productId],
            });
        }
    }

    const handleDecrease = (productId) => {
        const updateItemQuantity = { ...itemQuantity };
        updateItemQuantity[productId] -= 1;
        if (updateItemQuantity[productId] > 0) {
            setItemQuantity(updateItemQuantity);
            setProductDetail({
                cartItemId: productId,
                quantity: updateItemQuantity[productId],
            });
        }
    }

    //Subtotal price for each item
    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
            setTotalAmount(sum);
        }
    }, [cartState]);

    //Delete item
    const deleteACartProduct = (id) => {
        dispatch(deleteCartProduct(id));
        setTimeout(() => {
            dispatch(getUserCart());
        }, 200);
    };

    return (
        <>
            <Meta title={'Check Out Step 1 | Salinaka'} />
            <main className='content'>
                <div className="checkout ">
                    <div className="checkout-header ">
                        <ul className="checkout-header-step">
                            <li className="checkout-step-name is-active-step">
                                <div className="checkout-step-item">
                                    <div className="checkout-header-circle">
                                        <h4 className="checkout-header-number">1</h4>
                                    </div>
                                    <h6 className="checkout-header-subtitle">Order Summary</h6>
                                </div>
                            </li>
                            <li className="checkout-step-name">
                                <div className="checkout-step-item">
                                    <div className="checkout-header-circle">
                                        <h4 className="checkout-header-number">2</h4>
                                    </div>
                                    <h6 className="checkout-header-subtitle">Shipping Details</h6>
                                </div>
                            </li>
                            <li className="checkout-step-name">
                                <div className="checkout-step-item">
                                    <div className="checkout-header-circle">
                                        <h4 className="checkout-header-number">3</h4>
                                    </div>
                                    <h6 className="checkout-header-subtitle">Payment</h6>
                                </div>

                            </li>

                        </ul>
                    </div>
                    <div className="checkout-step-1">
                        <h3 className="step-1-name">Order Summary</h3>
                        <span className="step-1-text">Review items in your basket.</span>
                        <br />
                        <div className='checkout-items'>
                            {cartState &&
                                cartState.map((cartproduct) => (
                                    <div
                                        key={cartproduct?._id}
                                        className='cart-item'>
                                        <div className="cart-add-min">
                                            <Button
                                                className='button-white button-small  cart-control cart-add'
                                                onClick={() => handleIncrease(cartproduct?._id)}
                                            >
                                                <span className='addicon'><svg viewBox="64 64 896 896" focusable="false" data-icon="plus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><defs><style></style></defs><path d="M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"></path><path d="M176 474h672q8 0 8 8v60q0 8-8 8H176q-8 0-8-8v-60q0-8 8-8z"></path></svg></span>
                                            </Button>
                                            <Button
                                                className='button-white button-small  cart-control cart-min'
                                                onClick={() => handleDecrease(cartproduct?._id)}

                                            >
                                                <span className='minicon'><svg viewBox="64 64 896 896" focusable="false" data-icon="minus" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg></span>
                                            </Button>

                                        </div>
                                        <div className="cart-item-detail">
                                            <div className="cart-item-img-wrapper">
                                                <img
                                                    className="cart-item-img "
                                                    src={cartproduct?.productId?.images[0]?.url}
                                                    alt={cartproduct?.productId?.title}
                                                />
                                            </div>
                                            <div className="cart-item-content">
                                                <Link to={`/product/${cartproduct?.productId?._id}`} className='cart-item-link'>
                                                    <h4 className=" cart-item-name">{cartproduct?.productId?.title}</h4>
                                                </Link>
                                                <div className="cart-item-description">
                                                    <div >
                                                        <span className="description-title">Quantity</span>
                                                        <h5>{itemQuantity[cartproduct._id]}</h5>


                                                    </div>
                                                    <div >
                                                        <span className="description-title">Size</span>
                                                        <h5>${cartproduct?.size}</h5>
                                                    </div>
                                                    <div >
                                                        <span className="description-title">Color</span>
                                                        <div
                                                            className='description-color'
                                                            style={{
                                                                backgroundColor: `${cartproduct?.color?.title}`,
                                                            }}
                                                        ></div>
                                                    </div>

                                                </div>
                                            </div>

                                            <div className="cart-item-price">
                                                ${cartproduct?.price * itemQuantity[cartproduct._id] ? (cartproduct?.price * itemQuantity[cartproduct._id]).toFixed(2) : '0.00'}
                                            </div>

                                            <Button
                                                className='cart-item-remove button-small button-white'
                                                onClick={() => {
                                                    deleteACartProduct(cartproduct?._id);
                                                }}
                                            >
                                                <span className="remove-icon"><svg viewBox="64 64 896 896" focusable="false" data-icon="close" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L511.6 449.8 295.1 191.7c-3-3.6-7.5-5.7-12.3-5.7H203c-6.8 0-10.5 7.9-6.1 13.1L459.4 512 196.9 824.9A7.95 7.95 0 00203 838h79.8c4.7 0 9.2-2.1 12.3-5.7l216.5-258.1 216.5 258.1c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z"></path></svg></span>
                                            </Button></div>

                                    </div>
                                ))}
                        </div>

                        <div className="cart-total text-end">
                            <p className="cart-total-title">Subtotal:</p>
                            <h2 className="cart-total-amount">
                                {totalAmount !== null ? `$${totalAmount.toFixed(2)}` : "$0.00"}
                            </h2>

                        </div>
                        <br />
                        <div className="checkout-next">
                            <Link to='/shop'> <Button className='button button-grey'>
                                <span className='icon' role="img"><svg viewBox="64 64 896 896" focusable="false" data-icon="shop" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M882 272.1V144c0-17.7-14.3-32-32-32H174c-17.7 0-32 14.3-32 32v128.1c-16.7 1-30 14.9-30 31.9v131.7a177 177 0 0014.4 70.4c4.3 10.2 9.6 19.8 15.6 28.9v345c0 17.6 14.3 32 32 32h676c17.7 0 32-14.3 32-32V535a175 175 0 0015.6-28.9c9.5-22.3 14.4-46 14.4-70.4V304c0-17-13.3-30.9-30-31.9zM214 184h596v88H214v-88zm362 656.1H448V736h128v104.1zm234 0H640V704c0-17.7-14.3-32-32-32H416c-17.7 0-32 14.3-32 32v136.1H214V597.9c2.9 1.4 5.9 2.8 9 4 22.3 9.4 46 14.1 70.4 14.1s48-4.7 70.4-14.1c13.8-5.8 26.8-13.2 38.7-22.1.2-.1.4-.1.6 0a180.4 180.4 0 0038.7 22.1c22.3 9.4 46 14.1 70.4 14.1 24.4 0 48-4.7 70.4-14.1 13.8-5.8 26.8-13.2 38.7-22.1.2-.1.4-.1.6 0a180.4 180.4 0 0038.7 22.1c22.3 9.4 46 14.1 70.4 14.1 24.4 0 48-4.7 70.4-14.1 3-1.3 6-2.6 9-4v242.2zm30-404.4c0 59.8-49 108.3-109.3 108.3-40.8 0-76.4-22.1-95.2-54.9-2.9-5-8.1-8.1-13.9-8.1h-.6c-5.7 0-11 3.1-13.9 8.1A109.24 109.24 0 01512 544c-40.7 0-76.2-22-95-54.7-3-5.1-8.4-8.3-14.3-8.3s-11.4 3.2-14.3 8.3a109.63 109.63 0 01-95.1 54.7C233 544 184 495.5 184 435.7v-91.2c0-.3.2-.5.5-.5h655c.3 0 .5.2.5.5v91.2z"></path></svg></span>
                                &nbsp; Continue Shopping</Button>
                            </Link>
                            <Link to='/checkout/step2'><Button className='button'>
                                Next Step &nbsp;
                                <span className='icon' role="img"  ><svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path></svg></span>
                            </Button></Link>

                        </div>

                    </div>


                </div>
            </main>

        </>
    )
}

export default CheckoutOrder




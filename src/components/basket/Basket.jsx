import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Drawer, Space, Modal } from 'antd';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import { useLocation } from 'react-router-dom';
import './basket.css';
import { toast } from 'react-hot-toast';


import {
    deleteCartProduct,
    getUserCart,
    updateQuantity,
    emptyUserCart,
} from "../../features/user/userSlice";


const Basket = () => {
    const [open, setOpen] = useState(false)  //Drawer state
    const [productDetail, setProductDetail] = useState(null);
    const [totalAmount, setTotalAmount] = useState(null);
    const [itemQuantity, setItemQuantity] = useState({});
    const [isBasketDisabled, setIsBasketDisabled] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const cartState = useSelector((state) => state?.auth?.cart);
    const userState = useSelector((state) => state?.auth?.user);
    const authState = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    useEffect(() => {
        const disabledPaths = ['/checkout/step1', '/checkout/step2', '/checkout/step3'];
        if (disabledPaths.includes(location.pathname)) {
            setIsBasketDisabled(true);
        } else {
            setIsBasketDisabled(false);
        }
    }, [location]);

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
    }, [dispatch, productDetail]);

    //Subtotal price for each item
    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
            setTotalAmount(sum);
        }
    }, [cartState]);

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

    //Delete item
    const deleteACartProduct = (id) => {
        dispatch(deleteCartProduct(id));
        setTimeout(() => {
            dispatch(getUserCart());
        }, 200);
    };

    //modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCheckOut = () => {
        if ((cartState.length !== 0 && userState)) {
            setOpen(false);
            closeModal();
            navigate('./checkout/step1');
        } else {
            showModal();
        }
    };

    const handleEmptyCart = () => {
        dispatch(emptyUserCart()).then(() => {
            dispatch(getUserCart());
        });
        setTotalAmount(0);
    }

    return (
        <>
            <Button
                className='basket button'
                onClick={() => {
                    if (!isBasketDisabled) {
                        setOpen(true);
                    }
                }}


            >
                <div>
                    <span>
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="shopping" width="1em" height="1em" fill="currentColor" aria-hidden="true">
                            <path d="M832 312H696v-16c0-101.6-82.4-184-184-184s-184 82.4-184 184v16H192c-17.7 0-32 14.3-32 32v536c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V344c0-17.7-14.3-32-32-32zm-432-16c0-61.9 50.1-112 112-112s112 50.1 112 112v16H400v-16zm392 544H232V384h96v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h224v88c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-88h96v456z"></path>
                        </svg>
                    </span>
                    <Badge className='badge'>
                        {cartState?.length}
                    </Badge>
                </div>
            </Button >
            <Drawer
                title={
                    <h3 className="basket-header-title">
                        My Basket &nbsp;
                        <span> ( {cartState?.length} item)</span>
                    </h3>
                }
                width={600}
                onClose={() => setOpen(false)}
                open={open}
                closable={false}
                extra={
                    <Space>
                        <Button className='button-white button-small' onClick={() => setOpen(false)}>Close</Button>
                        <Button className='button-white button-small' onClick={handleEmptyCart}>
                            Clear Basket
                        </Button>
                    </Space>
                }
            >
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

                <div className="basket-checkout">
                    <div className="basket-total">
                        <p className="basket-total-title">Subtotal Amount:</p>
                        <h2 className="basket-total-amount">
                            {totalAmount !== null ? `$${totalAmount.toFixed(2)}` : "$0.00"}
                        </h2>

                    </div>
                    <button
                        className="basket-checkout-button button"
                        type="button"
                        onClick={handleCheckOut}
                        onClose={() => setOpen(false)}
                    >
                        Check Out
                    </button>
                    <Modal title="Your cart is empty!" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <p>Please add products to proceed.</p>
                    </Modal>
                </div>
            </Drawer >
        </>
    );
};

export default Basket;




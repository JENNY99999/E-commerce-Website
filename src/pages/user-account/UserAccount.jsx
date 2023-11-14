import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import './user-account.css'
import { Tabs } from 'antd';
import Meta from '../../components/meta/Meta';
import { getUserOrders } from "../../features/user/userSlice";
import { useParams, useNavigate } from 'react-router-dom';
import accountbackground from '../../images/accountBanner.jpg'
import avatar from '../../images/avatar.jpg'


const UserAccount = () => {
    const { panel } = useParams();
    const { TabPane } = Tabs;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserOrders());
    }, [dispatch]);

    const orderState = useSelector((state) => state?.auth?.userOrders);
    console.log(orderState);
    const authState = useSelector((state) => state?.auth);

    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/account/edit');
    };

    const [activeKey, setActiveKey] = useState(panel);

    const onChange = (key) => {
        setActiveKey(key);
        navigate(`/account/${key}`);
    };



    return (
        <>
            <Meta title={'Account | Salinaka'} />

            <main className='content'>
                <div className="user-tab">
                    <div >
                        <Tabs
                            activeKey={activeKey}
                            onChange={onChange}
                            type="card"
                        >
                            <TabPane tab="Account" key="account" >
                                <div className="user-tab-content">
                                    <div className="user-profile">
                                        <div className="user-profile-block">
                                            <div className="user-profile-banner">
                                                <div className="user-profile-banner-wrapper">
                                                    <img
                                                        alt="Banner"
                                                        className="user-profile-banner-img"
                                                        src={accountbackground} />
                                                </div>
                                                <div className="user-profile-avatar-wrapper">
                                                    <img
                                                        alt="Avatar"
                                                        className="user-profile-img"
                                                        src={avatar} />
                                                </div>
                                                <button
                                                    className="button button-small user-profile-edit"
                                                    type="button"
                                                    onClick={handleNavigation}>
                                                    Edit Account
                                                </button>
                                            </div>
                                            <div className="user-profile-details">
                                                <h2 className="user-profile-name">{authState?.user?.name}</h2>
                                                <span>Email</span>
                                                <br />
                                                <h5>{authState?.user?.email}</h5>
                                                <span>Address</span>
                                                <br />
                                                <h5 className="text-subtle text-italic">
                                                    Address not set
                                                </h5>                                                <span>Mobile</span>
                                                <br />
                                                <h5>{authState?.user?.mobile}</h5>
                                                <span>Date Joined</span>
                                                <br />
                                                <h5>September 25, 2023</h5>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane >

                            <TabPane tab="My Wishlist" key="wishlist">
                                <div className="user-tab-content">
                                    <div className='loader' style={{ minHeight: '80vh' }}>
                                        <h3>My Wish List</h3>
                                        <div>
                                            <span className="text-subtle">You don't have a wish list</span>
                                        </div>
                                    </div>
                                </div>
                            </TabPane >

                            <TabPane tab="My Order" key="order">
                                <div className="user-tab-content">
                                    <div className='loader' style={{ minHeight: '80vh' }}>
                                        <h3>My Orders</h3>
                                        <div className="order-wrapper home-wrapper-2 py-5">
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="row">
                                                        <div className="col-4">
                                                            <h5>Order ID</h5>
                                                        </div>
                                                        <div className="col-4">
                                                            <h5>Total Price</h5>
                                                        </div>
                                                        <div className="col-4">
                                                            <h5>Status</h5>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12 mt-3">
                                                    {orderState &&
                                                        orderState.map((order) => (
                                                            <div style={{ backgroundColor: "#febd69" }} className="row my-3 pt-3" key={order?._id}>
                                                                <div className="col-4">
                                                                    <p>{order?._id}</p>
                                                                </div>
                                                                <div className="col-4">
                                                                    <p>${order?.totalPrice.toFixed(2)}</p>
                                                                </div>
                                                                <div className="col-4">
                                                                    <p>{order?.orderStatus}</p>
                                                                </div>
                                                                <div className="col-12">
                                                                    <div style={{ backgroundColor: "#ffffff" }} className="row  py-3">
                                                                        <div className="col-4">
                                                                            <h6 className="text-black">Product Name</h6>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <h6 className="text-black">Size</h6>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <h6 className="text-black">Color</h6>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <h6 className="text-black">Quantity</h6>
                                                                        </div>
                                                                        <div className="col-2">
                                                                            <h6 className="text-black">Subtotal</h6>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                {order &&
                                                                    order.orderItems.map((product) => (
                                                                        <div className="col-12" key={product?.product?._id}>
                                                                            <div style={{ backgroundColor: "#ffffff" }} className="row p-3">
                                                                                <div className="col-4">
                                                                                    <p className="text-black ">{product?.product?.title}</p>
                                                                                </div>
                                                                                <div className="col-2">
                                                                                    <p className="text-black">{product?.size}</p>
                                                                                </div>
                                                                                <div className="col-2">
                                                                                    <div
                                                                                        className='description-color ps-0'
                                                                                        style={{
                                                                                            backgroundColor: `${product?.color?.title}`
                                                                                        }}
                                                                                    ></div>
                                                                                </div>
                                                                                <div className="col-2">
                                                                                    <p className="text-black">{product?.quantity}</p>
                                                                                </div>
                                                                                <div className="col-2">
                                                                                    <p className="text-black">${product?.price.toFixed(2)}</p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                            </div>
                                                        ))}

                                                    {(!orderState || orderState.length === 0) && (
                                                        <div style={{ backgroundColor: "#febd69" }} className="row my-3 pt-3">
                                                            <div className="col-12">
                                                                <p>No orders found</p>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </TabPane>



                        </Tabs>



                    </div>
                </div>
            </main>
        </>

    )
}

export default UserAccount




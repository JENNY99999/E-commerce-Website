import React, { useEffect, useState } from 'react'
import './product-card.css'
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import saltImage1 from '../../images/salt-image-1.png';
import { toast } from 'react-hot-toast';

import {
    addToCart,
    deleteCartProduct,
    getUserCart,
} from "../../features/user/userSlice";


const ProductCard = ({ products }) => {
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartState = useSelector((state) => state?.auth?.cart);
    const authState = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(getUserCart());
    }, [dispatch]);

    useEffect(() => {
        if (cartState && cartState?.length > 0) {
            const isProductInCart = cartState?.some(item =>
                item?.productId?._id === products?._id
            );
            setAlreadyAdded(isProductInCart);
        } else {
            setAlreadyAdded(false);
        }
    }, [cartState, products?._id]);

    const uploadCart = () => {
        const product = {
            productId: products?._id,
            quantity: quantity,
            price: products?.price,
            color: products?.color[0],
            size: '28mm',
        };

        dispatch(addToCart(product));

        setQuantity(quantity + 1);
        setTimeout(() => {
            dispatch(getUserCart());
        }, 200);
    };


    const deleteProductFromCart = () => {
        const cartItem = cartState.find(item => item.productId._id === products._id);
        if (cartItem) {
            dispatch(deleteCartProduct(cartItem._id));
            setTimeout(() => {
                dispatch(getUserCart());
            }, 200);
            setAlreadyAdded(false);
        }
    };

    const toggleCartAction = () => {
        if (authState?.user !== null && authState?.isError === false) {
            if (alreadyAdded) {
                deleteProductFromCart()
            } else {
                uploadCart();
            }
            setAlreadyAdded(!alreadyAdded);
        } else {
            navigate('/signin');
            toast.error("Please sign in first!")
        }
    };
    return (
        <div className='product-card'>
            <Link to={`/product/${products?._id}`}>
                {alreadyAdded &&
                    <span
                        className='product-card-check'
                    >
                        <svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" ><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg>
                    </span>
                }

                <div className="product-card-content">
                    <div className='product-card-img' variant="top" src="">
                        <img
                            src={products?.images[0]?.url || saltImage1}
                            alt={products?.title}
                        />
                    </div>
                    <div className='product-card-detail'>
                        <h5 className='product-card-name'>{products?.title}</h5>
                        <p className='product-card-brand text-subtle'>
                            <i>{products?.brand}</i>
                        </p>
                        <h4 className="product-card-price">${parseFloat(products?.price).toFixed(2)}</h4>
                    </div>
                </div>
            </Link>
            <Button
                className={`product-card-button button-small button button-block ${alreadyAdded ? 'button-white' : ''}`}
                onClick={
                    toggleCartAction
                }
            >
                {alreadyAdded ? "Remove From Cart" : " Add To Basket"}
            </Button>
        </div >
    );
}

export default ProductCard;




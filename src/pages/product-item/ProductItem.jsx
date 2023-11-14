import React, { useEffect, useState } from 'react'
import './product-item.css'
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import DisplayCard from '../../components/display-card/DisplayCard';
import Color from '../../components/color/Color';
import Meta from '../../components/meta/Meta';
import saltImage1 from '../../images/salt-image-1.png'


import { getProduct, getAllProducts } from "../../features/products/productSlice";
import {
    addToCart,
    deleteCartProduct,
    getUserCart,
} from "../../features/user/userSlice";


const ProductItem = () => {
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [alreadyAdded, setAlreadyAdded] = useState(false);


    //get product Id
    const location = useLocation();
    const navigate = useNavigate();
    const getProductId = location.pathname.split("/")[2];


    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllProducts());
        dispatch(getProduct(getProductId));
        dispatch(getUserCart());
    }, [dispatch]);

    const singleProduct = useSelector((state) => state?.product?.singleProduct);
    const cartState = useSelector((state) => state?.auth?.cart);
    const productState = useSelector((state) => state?.product?.products);
    const authState = useSelector((state) => state.auth)

    useEffect(() => {
        if (cartState && cartState?.length > 0) {
            const isProductInCart = cartState?.some(item => {
                return item?.productId?._id === singleProduct?._id
            }
            );
            setAlreadyAdded(isProductInCart);
        } else {
            setAlreadyAdded(false);
        }
    }, [cartState, productState?._id]);

    useEffect(() => {
        for (let index = 0; index < cartState?.length; index++) {
            if (getProductId === cartState[index]?.productId?._id) {
                setAlreadyAdded(true);
            }
        }
    }, []);


    const uploadCart = () => {
        if (color === null || size === null) {
            toast.error("Please choose color and size");
            return;
        } else {
            const product = {
                productId: singleProduct?._id,
                quantity: quantity,
                price: singleProduct?.price,
                color: color,
                size: size,
            };
            dispatch(addToCart(product));
            setQuantity(quantity + 1)
            setTimeout(() => {
                dispatch(getUserCart());
            }, 200);
        }
    };

    const deleteProductFromCart = () => {
        const cartItem = cartState.find(item => item.productId._id === singleProduct._id);
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
        <>
            <Meta title={singleProduct?.title} />
            <main className='content'>
                <div className="product-main">
                    <Link to='/shop'>
                        <h3>
                            <span><svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg></span>
                            &nbsp; Back to shop </h3>
                    </Link>
                    <div className="product-modal">
                        <div className="product-modal-all ">
                            <div className="product-modal-all-images">
                                {singleProduct?.images.map((item, index) => (
                                    <img
                                        className='product-modal-image'
                                        key={index}
                                        src={item?.url || saltImage1}
                                        alt={item?.title}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="product-modal-display ">
                            <img
                                className='product-modal-image'
                                src={singleProduct?.images[0]?.url}
                                alt={singleProduct?.title}
                            />
                        </div>
                        <div className="product-modal-description ">
                            <br />
                            <span className="text-subtle">{singleProduct?.brand}</span>
                            <h1 className="mt-0">{singleProduct?.title}</h1>
                            <span
                                className='product-modal-description-text'
                                dangerouslySetInnerHTML={{ __html: singleProduct?.description }}
                            ></span>

                            <br />
                            <br />
                            <div className="divider"></div>
                            <br />
                            <div>
                                <span className="text-subtle">Lens Width and Frame Size</span>
                            </div>
                            <br />
                            <div className='size-detail'>
                                <Form.Select
                                    className='size-selection'
                                    value={size || ''}
                                    onChange={(e) => setSize(e.target.value)}
                                >
                                    <option value="" disabled hidden>--Select Size--</option>
                                    <option value="28mm">28mm</option>
                                    <option value="36mm">36mm</option>
                                    <option value="42mm">42mm</option>
                                </Form.Select>
                                <div className="vertical-line"></div>
                            </div>
                            <br />
                            <div className='color-detail'>
                                <span className="text-subtle">Choose Color</span>
                                <br />
                                <br />
                                <div  >
                                    <Color
                                        setColor={setColor}
                                        colorData={singleProduct && singleProduct?.color}
                                    />

                                </div>
                                <h1>${parseFloat(singleProduct?.price).toFixed(2)}</h1>

                            </div>
                            <div className="product-modal-basket">
                                <Button
                                    className='button button-small'
                                    onClick={toggleCartAction}
                                >
                                    {alreadyAdded ? "Remove From Cart" : " Add To Basket"}
                                </Button>
                            </div>

                        </div>
                    </div>
                    <div className="display display-product-item">
                        <div className="display-header row">
                            <h1 className='col-4'>Recommended</h1>
                            <Link to='/shop' className='col-1'>See All</Link>                        </div>
                        <div className="display-list">

                            {productState &&
                                productState.map((product) => {
                                    if (
                                        product.title === "Sipon Malapot" ||
                                        product.title === "Kulangot" ||
                                        product.title === "Burnikk"
                                    ) {
                                        return (
                                            <DisplayCard
                                                products={product}
                                                key={product?._id}
                                            />
                                        );
                                    }
                                    return null;
                                })}
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default ProductItem
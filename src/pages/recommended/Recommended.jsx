import React, { useEffect } from 'react'
import DisplayCard from '../../components/display-card/DisplayCard'
import Meta from '../../components/meta/Meta';
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../features/products/productSlice"
import bannerRecommended from '../../images/bannerRecommended.png'



const Recommended = () => {
    const productState = useSelector((state) => state?.product?.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);
    console.log(productState);

    return (
        <>
            <Meta title={'Shop | Salinaka'} />
            <main className="content">
                <div className="recommended container-xxl">
                    <div className="banner row ">
                        <div className="banner-detail col-6">
                            <h1>
                                <strong>Recommended Products</strong>
                            </h1>
                        </div>
                        <div className="banner-img col-6 ">
                            <img
                                src={bannerRecommended}
                                alt="" />
                        </div>
                    </div>
                    <div className="display">
                        <div className="display-list">
                            {productState &&
                                productState.map((product) => {
                                    if (
                                        product.title === "Burnikk" ||
                                        product.title === "Kibal Batal" ||
                                        product.title === "Very Nice" ||
                                        product.title === "Kulangot" ||
                                        product.title === "Sipon Malapot" ||
                                        product.title === "Pitaklan"
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
            </main >
        </>
    )
}



export default Recommended
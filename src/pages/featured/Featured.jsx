import React, { useEffect } from 'react'
import DisplayCard from '../../components/display-card/DisplayCard'
import Meta from '../../components/meta/Meta';
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../features/products/productSlice"
import bannerFeatured from '../../images/bannerFeatured.png'




const Featured = () => {
    const productState = useSelector((state) => state?.product?.products)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);



    return (
        <>
            <Meta title={'Shop | Salinaka'} />

            <main className="content">
                <div className="featured container-xxl">
                    <div className="banner row ">
                        <div className="banner-detail col-6">
                            <h1>
                                <strong>Featured Products</strong>
                            </h1>

                        </div>
                        <div className="banner-img col-6 ">
                            <img
                                src={bannerFeatured}
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
                                        product.title === "Buldit" ||
                                        product.title === "Balakubak" ||
                                        product.title === "Tiktilaok Manok" ||
                                        product.title === "Kutu" ||
                                        product.title === "Quake Overload"
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

export default Featured
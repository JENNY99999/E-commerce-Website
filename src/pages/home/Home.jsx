import React, { useEffect, useState } from 'react'
import './home.css'
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Meta from '../../components/meta/Meta';
import DisplayCard from '../../components/display-card/DisplayCard'
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../../features/products/productSlice"
import bannerHome from '../../images/bannerHome.png'


const Home = () => {
    const productState = useSelector((state) => state?.product?.products)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getAllProducts());
    }, [dispatch]);

    return (
        <>
            <Meta title={'Home| Salinaka'} />

            <main className="content">
                <div className="home container-xxl">
                    <div className="banner row ">
                        <div className="banner-detail col-6">
                            <h1>
                                <strong>See</strong>
                                &nbsp; everything  <br /> with &nbsp;
                                <strong>Clarity</strong>
                            </h1>
                            <p>Buying eyewear should leave you happy and good-looking, with money in your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes covered.</p>
                            <Link to='shop'>
                                <Button className="button shop-button" >Shop Now &nbsp;
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                        </svg>
                                    </span>
                                </Button>
                            </Link>

                        </div>
                        <div className="banner-img col-6 ">
                            <img
                                src={bannerHome}
                                alt="" />
                        </div>
                    </div>
                    <div className="display">
                        <div className="display-header row">
                            <h1 className='col-4'>Featured Products</h1>
                            <Link to='/featured' className='col-1'>See All</Link>
                        </div>
                        <div className="display-list">
                            {productState &&
                                productState.map((product) => {
                                    if (
                                        product.title === "Burnikk" ||
                                        product.title === "Kibal Batal" ||
                                        product.title === "Very Nice" ||
                                        product.title === "Buldit" ||
                                        product.title === "Balakubak" ||
                                        product.title === "Tiktilaok Manok"
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
                    <div className="display">
                        <div className="display-header row">
                            <h1 className='col-4'>Recommended Products</h1>
                            <Link to='/recommended' className='col-1'>See All</Link>
                        </div>
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

export default Home
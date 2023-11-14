import React from 'react'
import './display-card.css'
import { Link } from 'react-router-dom';
import saltImage1 from '../../images/salt-image-1.png'


const DisplayCard = ({ products }) => {


    return (
        <Link to={`/product/${products?._id}`}>
            <div className='display-card'>
                <div className='display-img' variant="top" src="" >
                    <img
                        src={products?.images[0]?.url || saltImage1}
                        alt={products?.title}
                    />
                </div >
                <div className='display-detail'>
                    <h2>{products?.title}</h2>
                    <p className='text-subtle'>
                        <i>{products?.brand}</i>
                    </p>
                </div>
            </div>
        </Link>
    )
}

export default DisplayCard
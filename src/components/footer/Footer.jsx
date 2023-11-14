import React from 'react';
import './footer.css'
import logofull from '../../images/logo-full.png'

const Footer = () => {
    return (
        <>
            <footer >
                <div className="container-xxl">
                    <div className="row align-items-center">
                        <div className="col-4 text-start ">
                            <span>Developed by
                                Jenny Zhang
                            </span> </div>
                        <div className="col-4 text-center  py-5">
                            <div className='footer-logo'>
                                <img src={logofull}
                                    alt="" />
                            </div>
                            <div className='copyright'>© &nbsp;
                                2023</div>
                        </div>
                        <div className="col-4 text-end">Fork this project  HERE</div>
                    </div>


                </div>
            </footer>

        </>
    );
}

export default Footer;

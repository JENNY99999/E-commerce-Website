import React, { useEffect, useState } from 'react';
import './header.css'
import { useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import InputGroup from 'react-bootstrap/InputGroup';
import { BsSearch } from 'react-icons/bs'
import Button from 'react-bootstrap/Button';
import Basket from '../basket/Basket';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import logofull from '../../images/logo-full.png'
import avatar from '../../images/avatar.jpg'


const Header = () => {
    const navigate = useNavigate();
    const authState = useSelector((state) => state?.auth);
    const [paginate, setPaginate] = useState(true);
    const productState = useSelector((state) => state?.product?.products)
    const [productOpt, setProductOpt] = useState([])

    useEffect(() => {
        let data = [];
        for (let index = 0; index < productState?.length; index++) {
            const element = productState[index];
            data.push({
                id: index,
                prodId: element?._id,
                name: element?.title,
            })
        }
        setProductOpt(data)
    }, [productState])

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
        document.body.style.display = 'none';
        window.location.reload();
    };

    return (
        <Navbar sticky="top" className="header" collapseOnSelect expand="lg" >
            < Container >
                <Navbar.Brand>
                    <Link to='/'>
                        <img
                            src={logofull}
                            className="d-inline-block align-top logo"
                            alt="logo"
                        />
                    </Link>

                </Navbar.Brand>

                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto menu">
                        <NavLink to='/' className='menubar' >Home</NavLink>
                        <NavLink to='shop' className='menubar' >Shop</NavLink>
                        <NavLink to='featured' className='menubar' >Featured</NavLink>
                        <NavLink to='recommended' className='menubar ' >Recommended</NavLink>
                    </Nav>

                    <InputGroup className="search">
                        <InputGroup.Text id="basic-addon1" className="searchicon">
                            <BsSearch />
                        </InputGroup.Text>

                        <Typeahead
                            id="pagination-example"
                            onPaginate={() => console.log('Results paginated')}
                            minLength={2}
                            onChange={(selected) => { navigate(`/product/${selected?.[0]?.prodId}`) }}
                            options={productOpt}
                            paginate={paginate}
                            labelKey={"name"}
                            placeholder="Search product..."
                        />
                    </InputGroup>

                    <div className='menu-item'>
                        <div>
                            <Basket />
                        </div>

                        {authState.user === null ?
                            (<div className='sign'>
                                <Link to='signup'>
                                    <Button className='button button-small' >Sign up</Button>
                                </Link>
                                <Link to='signin'>
                                    <Button className='button button-small button-grey  ml-s'>Sign in</Button>
                                </Link>
                            </div>) :

                            (
                                <div className="d-flex gap-3 align-items-center dropdown ">
                                    <div
                                        role="button"
                                        id="dropdownMenuLink"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        className="d-flex gap-3 align-items-center"
                                    >
                                        <h5 className="ml-3 user-account-name">{authState?.user?.name}</h5>
                                        <img
                                            src={avatar}
                                            alt=""
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                overflow: 'hidden',
                                            }}
                                        />
                                        <span>
                                            <svg viewBox="64 64 896 896" focusable="false" data-icon="down" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path></svg>
                                        </span>
                                    </div>
                                    <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                        <li>
                                            <Link
                                                className="dropdown-item py-1 mb-1"
                                                style={{ height: "auto", lineHeight: "20px" }}
                                                to="/account/account"
                                            >
                                                View Account
                                                <span className='profile-icon'>
                                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="user" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z"></path></svg>
                                                </span>
                                            </Link>
                                        </li>
                                        <li>
                                            <div
                                                className="dropdown-item py-1 mb-1"
                                                style={{ height: "auto", lineHeight: "20px" }}
                                                onClick={handleLogout}
                                            >
                                                Signout
                                                <span className='profile-icon'>
                                                    <svg viewBox="64 64 896 896" focusable="false" data-icon="logout" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z"></path></svg></span>
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </Navbar.Collapse>
            </Container >
        </Navbar >

    );
}

export default Header;





import React, { useEffect, useState } from "react";
import './checkout.css'
import Meta from '../../components/meta/Meta';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as yup from 'yup';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'



const CheckoutShipping = () => {
    const shippingSchema = yup.object({
        name: yup.string().required("Full name is required."),
        email: yup.string().email("Email is not valid.").required("Email is required."),
        mobile: yup.string().required("Mobile number is required."),
        address: yup.string().required("Address is required."),
        internationalShipping: yup.boolean(),
    });
    const [subtotal, setSubtotal] = useState(null);
    const [total, setTotal] = useState(0); // 声明 total 变量
    const [shoppingInfo, setShoppingInfo] = useState(null);
    const [internationalShipping, setInternationalShipping] = useState(true);
    const internationalShippingCost = 50;
    const [shippingOption, setShippingOption] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartState = useSelector((state) => state?.auth?.cart);


    useEffect(() => {
        let sum = 0;
        for (let index = 0; index < cartState?.length; index++) {
            sum = sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
        }
        const total = sum + (internationalShipping ? internationalShippingCost : 0);
        setSubtotal(sum);
        setTotal(total);
        localStorage.setItem('totalPrice', total);
    }, [cartState, internationalShipping, internationalShippingCost]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            mobile: '',
            address: '',
            shippingOption: true,

        },
        validationSchema: shippingSchema,
        onSubmit: (values) => {
            localStorage.setItem('address', JSON.stringify(values))
            setShoppingInfo(JSON.parse(localStorage.getItem("address")))
            navigate('/checkout/step3');
        }
    })

    //mobile
    const [phoneNumber, setPhoneNumber] = useState('');
    const [valid, setValid] = useState(true);

    return (
        <>
            <Meta title={'Check Out Step 2 | Salinaka'} />
            <main className='content'>
                <div className="checkout ">
                    <div className="checkout-header ">
                        <ul className="checkout-header-step">
                            <li className="checkout-step-name ">
                                <div className="checkout-step-item">
                                    <div className="checkout-header-circle">
                                        <h4 className="checkout-header-number">1</h4>
                                    </div>
                                    <h6 className="checkout-header-subtitle">Order Summary</h6>
                                </div>
                            </li>
                            <li className="checkout-step-name is-active-step">
                                <div className="checkout-step-item">
                                    <div className="checkout-header-circle">
                                        <h4 className="checkout-header-number">2</h4>
                                    </div>
                                    <h6 className="checkout-header-subtitle">Shipping Details</h6>
                                </div>
                            </li>
                            <li className="checkout-step-name">
                                <div className="checkout-step-item">
                                    <div className="checkout-header-circle">
                                        <h4 className="checkout-header-number">3</h4>
                                    </div>
                                    <h6 className="checkout-header-subtitle">Payment</h6>
                                </div>

                            </li>

                        </ul>
                    </div>
                    <div className="checkout-step-2">
                        <h3 className="step-2-name">Shipping Details</h3>
                        <Form
                            onSubmit={formik.handleSubmit}>
                            <div className="checkout-shipping-wrapper">
                                <div className="checkout-fieldset row">
                                    <div className="checkout-field col-6">
                                        <Form.Group controlId="fullname">
                                            <Form.Label className={`label-input ${formik.touched.name && formik.errors.name ? 'error-label' : ''}`}>
                                                {formik.touched.name && formik.errors.name ? formik.errors.name : '* Full Name'}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="name"
                                                placeholder="Enter your full name"
                                                className="input-form"
                                                value={formik.values.name}
                                                onChange={formik.handleChange("name")}
                                                onBlur={formik.handleBlur("name")}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="checkout-field col-6">
                                        <Form.Group controlId="email">
                                            <Form.Label className={`label-input ${formik.touched.email && formik.errors.email ? 'error-label' : ''}`}>
                                                {formik.touched.email && formik.errors.email ? formik.errors.email : '* Email'}
                                            </Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email address"
                                                className="input-form"
                                                value={formik.values.email}
                                                onChange={formik.handleChange("email")}
                                                onBlur={formik.handleBlur("email")} />
                                        </Form.Group>
                                    </div>
                                </div>
                                <div className="checkout-fieldset row">
                                    <div className="checkout-field  col-6">
                                        <Form.Group controlId="address">
                                            <Form.Label className={`label-input ${formik.touched.address && formik.errors.address ? 'error-label' : ''}`}>
                                                {formik.touched.address && formik.errors.address ? formik.errors.address : '* Shipping Address'}
                                            </Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="address"
                                                placeholder="Enter full shipping address"
                                                className="input-form"
                                                value={formik.values.address}
                                                onChange={formik.handleChange("address")}
                                                onBlur={formik.handleBlur("address")}
                                            />
                                        </Form.Group>
                                    </div>

                                    <div className="checkout-field col-6">
                                        <Form.Group controlId="mobile">
                                            <Form.Label className={`label-input ${formik.touched.mobile && formik.errors.mobile ? 'error-label' : ''}`}>
                                                {formik.touched.mobile && formik.errors.mobile ? formik.errors.mobile : '* Mobile Number'}
                                            </Form.Label>
                                            <PhoneInput
                                                inputProps={{
                                                    required: true,
                                                }}
                                                country={'us'}
                                                placeholder="Your mobile number"
                                                name="mobile"
                                                inputClassName={`input-form ${formik.touched.mobile && formik.errors.mobile ? 'error-input' : ''}`}
                                                value={formik.values.mobile}
                                                onChange={(value) => {
                                                    formik.setFieldValue("mobile", value);
                                                }}
                                                onBlur={formik.handleBlur("mobile")}
                                            />
                                        </Form.Group>
                                    </div>

                                </div>
                                <div className="checkout-fieldset row">
                                    <div className="checkout-field">
                                        <Form.Group controlId="isInternational">
                                            <Form.Label className='label-input'>Shipping Option</Form.Label>
                                            <div className="checkout-checkbox-field">
                                                <input
                                                    id="isInternational"
                                                    type="checkbox"
                                                    value={internationalShipping}
                                                    onChange={() => {
                                                        setInternationalShipping(!internationalShipping);
                                                        formik.setFieldValue("shippingOption", !internationalShipping); // 更新shippingOption
                                                    }}
                                                    defaultChecked={internationalShipping}

                                                />
                                                <label htmlFor="isInternational">
                                                    <h5 className="flex-grow-1 m-0">&nbsp; International Shipping &nbsp;<span className="text-subtle">7-14 days</span></h5>
                                                    <h4 className="m-0">{internationalShipping ? `$${internationalShippingCost.toFixed(2)}` : "$0"}</h4>
                                                </label>
                                            </div>
                                        </Form.Group>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="checkout-total">
                                <div className="row">
                                    <div className="col-7"></div>
                                    <div className="col-3 checkout-total-name">International Shipping:  </div>
                                    <div className="col-2 checkout-total-amount">{internationalShipping ? "$50.00" : "$0"}</div>
                                </div>
                                <div className="row">
                                    <div className="col-7"></div>
                                    <div className="col-3 checkout-total-name">Subtotal:  </div>
                                    <div className="col-2 checkout-total-amount">
                                        {subtotal !== null ? `$${subtotal.toFixed(2)}` : "$0.00"}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-7"></div>
                                    <div className="col-3 checkout-total-name">Total: </div>
                                    <h2 className="col-2 fw-bold">
                                        {total.toFixed(2)}
                                    </h2>
                                </div>

                            </div>
                            <br />
                            <div className="checkout-next">
                                <Link to='/checkout/step1'>
                                    <Button className='button button-grey'>
                                        <span className='icon' role="img" ><svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg></span>
                                        &nbsp; Go Back</Button>
                                </Link>

                                <Button className='button' type='submit'  >
                                    Next Step &nbsp;
                                    <span className='icon' role="img" ><svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-right" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M869 487.8L491.2 159.9c-2.9-2.5-6.6-3.9-10.5-3.9h-88.5c-7.4 0-10.8 9.2-5.2 14l350.2 304H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h585.1L386.9 854c-5.6 4.9-2.2 14 5.2 14h91.5c1.9 0 3.8-.7 5.2-2L869 536.2a32.07 32.07 0 000-48.4z"></path></svg></span>
                                </Button>

                            </div>
                        </Form>
                    </div>
                </div >
            </main >
        </>
    )
}

export default CheckoutShipping
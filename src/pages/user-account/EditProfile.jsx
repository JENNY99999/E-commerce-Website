import React, { useState } from 'react'
import './user-account.css'

import Meta from '../../components/meta/Meta';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from 'formik';
import * as yup from 'yup';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import { updateUser } from "../../features/user/userSlice";
import { FiEdit } from "react-icons/fi";




const EditProfile = () => {


    const [edit, setEdit] = useState(true)
    const dispatch = useDispatch()
    const userState = useSelector((state) => state?.auth?.user)

    const profileSchema = yup.object({
        name: yup.string().required("Full name is required."),
        email: yup.string().email("Email is not valid.").required("Email is required."),
        mobile: yup.string().required("Mobile number is required."),
        // address: yup.string().required("Address is required."),
    });

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userState && userState?.name,
            email: userState && userState?.email,
            mobile: userState && userState?.mobile,
            // address: '',
        },
        validationSchema: profileSchema,
        onSubmit: (values) => {
            dispatch(updateUser(values))
            setEdit(true)
        }
    })


    return (
        <>
            <Meta title={'Edit Account | Salinaka'} />
            <main className='content'>
                <div
                    className="user-tab "
                    style={{ border: 'none' }}
                >
                    <h3 className="step-2-name">Edit Account Details</h3>

                    <div className="user-tab-content">
                        <div className="user-profile">
                            <div className="user-profile-block">
                                <div className="user-profile-banner">
                                    <div className="user-profile-banner-wrapper">
                                        <img alt="Banner" className="user-profile-banner-img" src="/images/accountbackground.jpg" />
                                    </div>
                                    <div className="user-profile-avatar-wrapper">
                                        <img alt="Avatar" className="user-profile-img" src="/images/profile.jpg" />
                                    </div>
                                    <div className="edit-icon-box">
                                        <FiEdit
                                            className="edit-icon"
                                            onClick={() => { setEdit(false) }} />
                                    </div>


                                </div>
                                <div className="edit-profile-box ">
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
                                        </div>
                                        <br />
                                        <br />
                                        <div className="checkout-next">
                                            <Link to='/account/account'>
                                                <Button className='button button-grey'>
                                                    <span className='icon' role="img" ><svg viewBox="64 64 896 896" focusable="false" data-icon="arrow-left" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M872 474H286.9l350.2-304c5.6-4.9 2.2-14-5.2-14h-88.5c-3.9 0-7.6 1.4-10.5 3.9L155 487.8a31.96 31.96 0 000 48.3L535.1 866c1.5 1.3 3.3 2 5.2 2h91.5c7.4 0 10.8-9.2 5.2-14L286.9 550H872c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path></svg></span>
                                                    &nbsp; Back To Profile</Button>
                                            </Link>

                                            <Button className='button' type='submit'>
                                                <span className='icon' role="img"  ><svg viewBox="64 64 896 896" focusable="false" data-icon="check" width="1em" height="1em" fill="currentColor" aria-hidden="true"><path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path></svg></span>
                                                &nbsp; Update Profile
                                            </Button>
                                        </div>
                                    </Form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

export default EditProfile
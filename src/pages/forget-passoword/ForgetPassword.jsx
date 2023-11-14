import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Meta from '../../components/meta/Meta';
import { Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { forgotPassword } from "../../features/user/userSlice";
import { useDispatch } from "react-redux";


const ForgetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is Required"),
        }),
        onSubmit: (values) => {
            dispatch(forgotPassword(values))
            navigate('/')
        },
    });
    return (
        <>
            <Meta title={'Forgot password | Salinaka'} />
            <main className='content'>

                <div className="auth-content">
                    <div className="auth">
                        <div className="auth-main">
                            <h3>We will send you an email to reset your password</h3>
                            <br />
                            <div className="auth-wrapper">
                                <Form onSubmit={formik.handleSubmit} >
                                    <Form.Group  >
                                        <Form.Label className={`label-input ${formik.touched.email && formik.errors.email ? 'error-label' : ''}`}>
                                            {formik.touched.email && formik.errors.email ? formik.errors.email : '* Email'}
                                        </Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="name@example.com"
                                            name="email"
                                            className="input-form"
                                            value={formik.values.email}
                                            onChange={formik.handleChange("email")}
                                            onBlur={formik.handleBlur("email")} />
                                    </Form.Group>
                                    <Button className='button-small button-border-gray mt-5 ' variant="light" type='submit' >Submit</Button>
                                    <Link to='/signin'>
                                        <Button className='button-small button-border-gray mt-5 mx-5' variant="light" type='submit'>Cancel</Button>
                                    </Link>
                                </Form>
                            </div>
                        </div>
                    </div>
                </div>
            </main >
        </>
    );
};

export default ForgetPassword
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Meta from '../../components/meta/Meta';
import { useLocation, Link, useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from "react-redux";
import { changePassword } from "../../features/user/userSlice";


const ResetPassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const getToken = location.pathname.split("/")[2];
    console.log(getToken);

    const formik = useFormik({
        initialValues: {
            password: "",
        },
        validationSchema: Yup.object({
            password: Yup.string().required("Password is required"),
        }),
        onSubmit: (values) => {
            dispatch(changePassword({ token: getToken, password: values.password }))
        },
    });
    return (
        <>
            <Meta title={'Reset password | Salinaka'} />
            <main className='content'>

                <div className="auth-content">
                    <div className="auth">
                        <div className="auth-main">
                            <h3>Reset Password </h3>
                            <br />
                            <div className="auth-wrapper">
                                <Form onSubmit={formik.handleSubmit} >
                                    <Form.Group>
                                        <Form.Label className={`label-input ${formik.touched.password && formik.errors.password ? 'error-label' : ''}`}>
                                            {formik.touched.password && formik.errors.password ? formik.errors.password : ''}
                                        </Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            name="password"
                                            className="input-form"
                                            value={formik.values.password}
                                            onChange={formik.handleChange("password")}
                                            onBlur={formik.handleBlur("password")}
                                        />
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

export default ResetPassword
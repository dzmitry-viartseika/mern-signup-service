import React, { useState }  from 'react';
import { Modal, Fade, Box, Typography, Backdrop } from '@mui/material';
import TheInputText from '../Elements/TextInput/TheInputText';
import TheImage from '../Elements/TheImage/TheImage';
import Button from '../Elements/Button/TheButton';
import TheAlert from '../Alerts/TheAlert';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import AuthService from '../../services/Auth/AuthService';
import { makeStyles } from "@material-ui/core/styles";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    p: 2,
    padding: '16px 31px 16px 16px',
    width: '500px',
};

const styleButton ={
    display: 'flex',
    justifyContent: 'flex-end',
};

const TheHeader = () => {
    const SigninSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
    });

    const [open, setOpen] = useState(false);
    const [openAlert, setOpenAlert] = useState(false);
    const [alertInfo, setAlertInfo] = useState({
        severity: '',
        alertTitle: '',
        text: '',
    })
    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const loginUser = async (data) => {
        try {
            const { email, password } = data;
            const response = await AuthService.login(email, password);
            console.log('response', response);
            if (response) {
                setAlertInfo({
                    severity: 'success',
                    text: 'Everything is alrgight',
                    alertTitle: 'Success',
                });
                setTimeout(() => {
                    setOpenAlert(false);
                }, 3000)
            }
            setOpen(false);
        } catch (e) {
            console.error(e);
            setOpenAlert(true);
            setAlertInfo({
                severity: 'error',
                text: 'Something is wrong',
                alertTitle: 'Error',
            })
            setTimeout(() => {
                setOpenAlert(false);
            }, 3000)
        }
    }

    return (
        <>
            <header className="landing-header">
                <div className="landing-container">
                    <div className="landing-header__wrapper">
                        <div className="landing-header__left">
                            <Link to={'/'}>
                                <div
                                    className="landing-header__logo">
                                    <img src={logo} alt=""/>
                                </div>
                            </Link>
                            {/*<TheImage name={'logo.png'}/>*/}
                        </div>
                        <div className="landing-header__right">
                            <Button
                                variant={'contained'}
                                onClick={handleOpen}
                                text={'Sign in'}
                            />
                            <Button
                                variant={'contained'}
                                text={'Sign up'}
                                onClick={handleOpen}
                            />
                        </div>
                    </div>
                </div>
            </header>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Formik
                            initialValues={
                                user
                            }
                            validationSchema={SigninSchema}
                            onSubmit={async (values) => {
                                await loginUser(values);
                            }}
                        >
                            {({
                                  values,
                                  errors,
                                  touched,
                                  handleChange,
                                  handleBlur,
                                  isValid,
                                  handleSubmit,
                                  dirty
                              }) => (
                                <div className={`form`}>
                                    <TheInputText
                                        id={'email-input'}
                                        label={'Email'}
                                        value={values.email}
                                        required={true}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        focused={true}
                                        error={touched.email && errors.email}
                                        autoFocus={true}
                                        name={`email`}
                                    />
                                    { touched.email && errors.email && <div> { errors.email } </div> }
                                    <TheInputText
                                        id={'email-input'}
                                        label={'Password'}
                                        value={values.password}
                                        required={true}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        focused={true}
                                        autoFocus={true}
                                        error={touched.password && errors.password}
                                        name={`password`}
                                    />
                                    { touched.password && errors.password && <div> { errors.password } </div> }
                                    <Box sx={styleButton}>
                                        <Button
                                            type={`submit`}
                                            variant={'contained'}
                                            onClick={loginUser}
                                            text={'Send'}
                                            onClick={handleSubmit}
                                            disabled={!isValid && !dirty && !values.email && !values.password}
                                        />
                                    </Box>
                                </div>
                            )}
                        </Formik>
                    </Box>
                </Fade>
            </Modal>
            {
                openAlert ?
                    <TheAlert
                        severity={alertInfo.severity}
                        alertTitle={alertInfo.alertTitle}
                        text={alertInfo.text}
                    />
                    : null }
        </>
    )
}

export default TheHeader;


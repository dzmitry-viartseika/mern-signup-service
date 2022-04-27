import React, { useState }  from 'react';
import { Modal, Fade, Box, Typography, Backdrop } from '@mui/material';
import TheInputText from '../Elements/TextInput/TheInputText';
import TheImage from '../Elements/TheImage/TheImage';
import Button from '../Elements/Button/TheButton';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import AuthService from '../../services/Auth/AuthService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


const TheHeader = () => {
    const [open, setOpen] = useState(false);
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

    const loginUser = async () => {
        try {
            const response = await AuthService.login(user.email, user.password);
            console.log('response', response);
            setOpen(false);
        } catch (e) {
            console.error(e);
        }
    }

    const handleChangeEmail = (e) => {
        setUser({
            ...user,
            email: e.target.value,
        });
    }

    const handleChangePassword = (e) => {
        setUser({
            ...user,
            password: e.target.value,
        });
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
                        <TheInputText
                            id={'email-input'}
                            label={'Email'}
                            value={user.email}
                            required={true}
                            onChange={handleChangeEmail}
                            focused={true}
                            autoFocus={true}
                        />
                        <TheInputText
                            id={'passport-input'}
                            label={'Password'}
                            type={'password'}
                            required={true}
                            value={user.password}
                            onChange={handleChangePassword}
                        />
                        <Button
                            variant={'contained'}
                            onClick={loginUser}
                            text={'Send'}
                        />
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default TheHeader;

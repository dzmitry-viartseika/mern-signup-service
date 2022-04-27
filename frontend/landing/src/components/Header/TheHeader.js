import React, { useState }  from 'react';
import { Button, Modal, Fade, Box, Typography, Backdrop } from '@mui/material';
import TheInputText from '../Elements/TheInputText';

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

    const loginUser = () => {
        console.log('user', user);
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
                            logo
                        </div>
                        <div className="landing-header__right">
                            <Button
                                variant="contained"
                                onClick={handleOpen}
                            >
                                Sign in
                            </Button>
                            <Button
                                variant="contained"
                            >
                                Sign up
                            </Button>
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
                            label={'Email'}
                            value={user.email}
                            required={true}
                            onChange={handleChangeEmail}
                            focused={true}
                            autoFocus={true}
                        />
                        <TheInputText
                            label={'Password'}
                            type={'password'}
                            required={true}
                            value={user.password}
                            onChange={handleChangePassword}
                        />
                        <Button
                            variant="contained"
                            onClick={loginUser}
                        >
                            Send
                        </Button>
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default TheHeader;

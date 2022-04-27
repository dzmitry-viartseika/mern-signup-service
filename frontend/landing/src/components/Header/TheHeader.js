import React, { useState }  from 'react';
import { Button, Modal, Fade, Box, Typography, Backdrop } from '@mui/material';
import TheInputText from '../Elements/TheInputText';
// import { Link } from 'react-router-dom';

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

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
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
                        />
                        <TheInputText
                            label={'Password'}
                            type={'password'}
                        />
                    </Box>
                </Fade>
            </Modal>
        </>
    )
}

export default TheHeader;

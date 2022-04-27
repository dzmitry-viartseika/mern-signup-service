import react from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const TheInputText = ({ label, type = 'text' }) => {
    return (
        <>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    label={label}
                    type={type}
                    variant="outlined"
                    fullWidth
                    id="fullWidth"
                />
            </Box>
        </>
    )
}

export default TheInputText;

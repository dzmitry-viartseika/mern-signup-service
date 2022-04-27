import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const TheInputText = ({ label, type = 'text', value, onChange, focused = false, autoFocus = false }) => {
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
                value={ value }
                <TextField
                    label={label}
                    type={type}
                    value={value}
                    variant="outlined"
                    fullWidth
                    id="fullWidth"
                    onChange={onChange}
                    focused={focused}
                    autoFocus={autoFocus}
                />
            </Box>
        </>
    )
}

export default TheInputText;

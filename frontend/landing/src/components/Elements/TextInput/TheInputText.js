import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const TheInputText = (
    {
        required = false,
        label,
        type = 'text',
        value,
        onChange,
        focused = false,
        autoFocus = false,
        id
    }) => {
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
                    id={id}
                    label={label}
                    required={required}
                    type={type}
                    value={value}
                    variant="outlined"
                    fullWidth
                    onChange={onChange}
                    focused={focused}
                    autoFocus={autoFocus}
                />
            </Box>
        </>
    )
}

export default TheInputText;

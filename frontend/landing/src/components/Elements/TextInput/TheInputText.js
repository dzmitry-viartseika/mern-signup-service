import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

const TheInputText = (
    {
        required = false,
        label,
        type = 'text',
        value,
        onChange,
        variant = 'outlined',
        focused = false,
        autoFocus = false,
        id,
        error,
        name
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
                    error={error}
                    name={name}
                    label={label}
                    required={required}
                    type={type}
                    value={value}
                    variant={variant}
                    onChange={onChange}
                    focused={focused}
                    autoFocus={autoFocus}
                />
            </Box>
        </>
    )
}

export default TheInputText;

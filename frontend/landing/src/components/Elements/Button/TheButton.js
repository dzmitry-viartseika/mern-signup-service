import { Button } from '@mui/material';

const TheButton = ({onClick, variant = 'contained', text, type, disabled, size, className}) => {
    return (
        <>
            <Button
                className={className}
                variant={variant}
                onClick={() => onClick()}
                type={type}
                size={size}
                disabled={disabled}
            >
                { text }
            </Button>
        </>
    )
}

export default TheButton;

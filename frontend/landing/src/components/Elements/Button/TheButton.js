import { Button } from '@mui/material';

const TheButton = ({onClick, variant = 'contained', text}) => {
    return (
        <>
            <Button
                variant={variant}
                onClick={() => onClick()}
            >
                { text }
            </Button>
        </>
    )
}

export default TheButton;

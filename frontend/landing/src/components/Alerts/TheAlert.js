import { Alert } from '@mui/material';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';


const TheAlert = ({severity, alertTitle, text}) => {
    return (
        <>
            <Stack sx={{ width: '100%' }} spacing={2}>
                <Alert severity={severity}>
                    <AlertTitle>
                        { alertTitle }
                    </AlertTitle>
                    { text }
                </Alert>
            </Stack>
        </>
    )
}

export default TheAlert;

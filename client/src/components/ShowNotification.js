import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

const ShowNotification = ({ open, text, severity, onClose }) => {
    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={onClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                style={{ marginTop: '50px' }}
            >
                <Alert severity={severity} onClose={onClose}>
                    {text}
                </Alert>
            </Snackbar>
        </>
    );
};

export default ShowNotification;

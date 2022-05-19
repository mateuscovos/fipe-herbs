import * as React from 'react';
import { Box, CircularProgress, Typography } from '@material-ui/core';

function Carregando() {
    return (
        <Box sx={{ width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
            <Typography position='absolute' marginTop='100px' >carregando...</Typography>
        </Box>
    );
}

export default Carregando
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function DrawerAppBar() {
  return (
    <div className=''>
      <Box className='container'>
        <CssBaseline />
        <AppBar component='nav'>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
            >
              Question Interview
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}

export default DrawerAppBar;

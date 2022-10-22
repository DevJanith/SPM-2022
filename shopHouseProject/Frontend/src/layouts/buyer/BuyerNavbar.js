import { AppBar, Box, IconButton, Stack, Toolbar, Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import { alpha, styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Iconify from '../../components/Iconify';
import { logout } from '../../pages/Project/UserManagement/Session';
import AccountPopover from './AccountPopover';
import "./BuyerNavbar.css";
import Searchbar from './Searchbar';

const DRAWER_WIDTH = 280;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 92;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up('1900px')]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up('1900px')]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func,
};

const GridItem = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  // ...theme.typography.body2,
  // padding: theme.spacing(1),
  // textAlign: 'center',
  // color: theme.palette.text.secondary,
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const commonStyles = {
  bgcolor: 'background.paper',
  borderColor: 'text.primary',
  m: 1,
  border: 5,
  width: '7rem',
  height: '7rem',
};


export default function DashboardNavbar({ onOpenSidebar }) {

  let navigation = useNavigate()
  let sessionStorage = window.sessionStorage.getItem("userId");
  const dispatch = useDispatch() 

  return (
    <RootStyle>
      <ToolbarStyle>
        <IconButton onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary', display: 'block' }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>

        <Searchbar />
        <Box sx={{ flexGrow: 1, padding: "2% 5% 1% 5%", backgroundColor: "white", borderRadius: "10px" }} >
          <div className='menu'>
            <div className='menuLogoContainer' onClick={() => { navigation(`/buyer/home`) }}>
              <div className='menuLogo' >Logo</div>
            </div>
            <div className='menuItemContainer'>
              <div className='menuItem' onClick={() => { navigation(`/buyer/home`) }}>Home</div>
            </div>
            <div className='menuItemContainer'>
              <div className='menuItem' onClick={() => { navigation(`/buyer/products`) }}>Products</div>
            </div>
            <div className='menuItemContainer'>
              <div className='menuItem' onClick={() => { navigation(`/buyer/contact-us`) }}>Contact Us</div>
            </div>
            {/* <div className='menuItemContainer'>
              <div className='menuItem' onClick={() => { navigation(`/buyer/about-us`) }}>About Us</div>
            </div> */}
            <div className='loginContainer'>
              {typeof sessionStorage == "undefined" || sessionStorage == null ?
                <>
                  <div className='login' onClick={() => { navigation(`/login`) }}>  <Button size="medium" variant='outlined' color='primary' fullWidth>Login</Button></div>
                </>
                :
                <>
                  <div className='login' onClick={() => {
                    dispatch({ type: "LOGOUT" });

                    navigation("/login");
                  }}>  <Button size="medium" variant='outlined' color='primary' fullWidth>Logout</Button></div>
                </>}
            </div>
          </div>
        </Box>
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {typeof sessionStorage == "undefined" || sessionStorage == null ?
            <>
            </>
            :
            <>
              <AccountPopover />
            </>
          }
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
}

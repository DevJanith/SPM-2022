import { Outlet, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  let navigate = useNavigate()
  console.log(window.location.pathname);
  return (
    <>
      <HeaderStyle>
        {/* <Logo /> */}
      </HeaderStyle>
      {window.location.pathname == "/" &&
        <>
          <Button onClick={() => { navigate(`/buyer/home`) }}>Home Page</Button>
        </>
      }
      <Outlet />
    </>
  );
}

import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const RegisterationLayout = () => {
  return (
    <Box display='flex' alignItems={'center'} justifyContent={'center'}>
      <Outlet />
    </Box>
  );
};

export default RegisterationLayout;

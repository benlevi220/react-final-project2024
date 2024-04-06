import { Box, Container, Stack } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';

const DashboardLayout = () => {
  return (
    <Stack width='inherit' height='inherit'>
      <NavBar />
      <Container maxWidth='xl' sx={{ flex: 1 }}>
        <Outlet />
      </Container>
      <Footer />
    </Stack>
  );
};

export default DashboardLayout;

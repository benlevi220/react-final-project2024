import { Stack, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Stack
      alignItems={'center'}
      p={'15px'}
      justifyContent={'center'}
      sx={{
        borderTop: theme => `1px solid ${theme.palette.divider}`,
        backgroundColor: '#fff',
      }}
    >
      <Typography variant='subtitle1'>
        CopyRight &copy; {new Date().getFullYear()}, Business Card. All Rights
        Reserved.
      </Typography>
    </Stack>
  );
};

export default Footer;

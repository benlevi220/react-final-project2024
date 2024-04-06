import { Box, styled } from '@mui/material';

export const GridContainer = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
  //   [theme.breakpoints.down('md')]: {
  //     gridTemplateColumns: 'repeat(auto-fill, minmax(360px, max-content))',
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     gridTemplateColumns: '1fr',
  //   },
  justifyContent: 'space-between',
  gap: '40px',
  // rowGap: '30px',
  // columnGap: '30px',
}));

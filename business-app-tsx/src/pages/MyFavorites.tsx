import React from 'react';
import { Stack, Typography } from '@mui/material';
import cardBg from '../assets/cardBg.png';
import BusinessCard from '../components/BusinessCard';
import { GridContainer } from '../utils/globalStyles';

const MyFavorites: React.FC = () => {
  return (
    <Stack my={3} spacing={3}>
      <section>
        <Typography variant='h2'>My Favorites</Typography>
      </section>
      <GridContainer>
        {[...Array(2)].map((_, index) => (
          <BusinessCard
            key={index}
            id={index.toString()} // Converted index to string for 'id' prop
            title={`Business Card ${index + 1}`}
            subTitle={`This is subheading of business ${index + 1}`}
            phone={'+91 9876543210'}
            address={`Address 123, City#${index + 1}22`}
            cardNumber={`457328${index + 1}`}
            image={cardBg}
          />
        ))}
      </GridContainer>
    </Stack>
  );
};

export default MyFavorites;

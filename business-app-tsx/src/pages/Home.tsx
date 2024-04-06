import { CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
// import cardBg from 'src/assets/cardBg.png';
import BusinessCard from '../components/BusinessCard';
import { useCards } from '../context/CardsContext';
import { GridContainer } from '../utils/globalStyles';

const Home: React.FC = () => {
  const { data, fetching, fetchCards } = useCards();

  console.log('data', data);

  useEffect(() => {
    if (fetching) {
      fetchCards();
    }
  }, [fetchCards, fetching]);

  return (
    <Stack my={3} spacing={3}>
      <section>
        <Typography variant='h2'>Business Cards</Typography>
        <Typography variant='h5' sx={{ fontWeight: 500 }}>
          Here you can find all business cards
        </Typography>
      </section>
      {fetching ? (
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          width={'100%'}
          height={'400px'}
        >
          <CircularProgress size={24} />
        </Stack>
      ) : (
        <GridContainer>
          {data && data.length > 0 ? (
            data.map(
              (
                el: any // Assuming 'data' is an array of objects with any type
              ) => (
                <BusinessCard
                  id={el._id}
                  key={el._id}
                  title={el.title}
                  subtitle={el.subtitle}
                  phone={el.phone}
                  address={el.address}
                  cardNumber={el.bizNumber}
                  image={el.image}
                  web={el.web}
                />
              )
            )
          ) : (
            <Typography variant='h6'>No Results Found</Typography>
          )}
        </GridContainer>
      )}
    </Stack>
  );
};

export default Home;

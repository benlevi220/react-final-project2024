import { Button, Stack, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BusinessCard from '../components/BusinessCard';
import { useAuth } from '../context/AuthContext';
import { GridContainer } from '../utils/globalStyles';

const MyCards: React.FC = () => {
  const { fetchMyCards, fetchingCards, myCards } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (fetchingCards) fetchMyCards();
  }, [fetchingCards, fetchMyCards]);

  console.log(myCards);

  return (
    <Stack my={3} spacing={3} height={'100%'}>
      <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <Typography variant='h2'>My Cards</Typography>
        <Button
          variant='contained'
          onClick={() => navigate('/my-cards/create')}
        >
          Add New Card
        </Button>
      </Stack>
      {myCards && myCards.length > 0 ? (
        <GridContainer>
          {myCards.map(el => (
            <BusinessCard
              key={el._id}
              id={el._id}
              title={el.title}
              subtitle={el.subtitle} // Corrected prop name to "subtitle"
              phone={el.phone}
              address={el.address}
              cardNumber={el.bizNumber} // Corrected prop name to "bizNumber"
              image={el.image}
              isPrivate={true}
            />
          ))}
        </GridContainer>
      ) : (
        <Stack alignItems={'center'} justifyContent={'center'} flex={2}>
          <Typography variant='subtitle1'>No Cards Found</Typography>
        </Stack>
      )}
    </Stack>
  );
};

export default MyCards;

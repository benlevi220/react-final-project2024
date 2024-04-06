import { Stack, Typography } from '@mui/material';
import { useState } from 'react';
import CardForm from '../components/CardForm';
import { useAuth } from '../context/AuthContext';

interface State {
  title: string;
  subtitle: string;
  phone: string;
  houseNumber: string;
  zip: string;
  street: string;
  city: string;
  country: string;
  email: string;
  web: string;
  imageUrl: string;
  imageAlt: string;
  description: string;
}

const CreateCard: React.FC = () => {
  const { createCard, loading } = useAuth();
  const [state] = useState<State>({
    title: '',
    subtitle: '',
    phone: '',
    houseNumber: '',
    zip: '',
    street: '',
    city: '',
    country: '',
    email: '',
    web: '',
    imageUrl: '',
    imageAlt: '',
    description: '',
  });

  const handleCreateCard = (values: State) => {
    let apiValues = {
      title: values.title,
      subtitle: values.subtitle,
      phone: values.phone,
      address: {
        houseNumber: values.houseNumber,
        zip: values.zip,
        street: values.street,
        city: values.city,
        country: values.country,
      },
      email: values.email,
      web: values.web,
      image: {
        url: values.imageUrl,
        alt: values.imageAlt,
      },
      description: values.description,
    };
    createCard(apiValues);
  };

  return (
    <Stack
      my={5}
      alignItems={'center'}
      mx='auto'
      width={'100%'}
      maxWidth='800px'
      bgcolor={'#fff'}
      p={'30px'}
    >
      <Typography variant='h5' mb={5}>
        Create Card
      </Typography>
      <CardForm
        title={state.title}
        subtitle={state.subtitle}
        phone={state.phone}
        houseNumber={state.houseNumber}
        zip={state.zip}
        street={state.street}
        city={state.city}
        country={state.country}
        email={state.email}
        web={state.web}
        imageUrl={state.imageUrl}
        imageAlt={state.imageAlt}
        description={state.description}
        handleSubmit={handleCreateCard}
        loading={loading}
      />
    </Stack>
  );
};

export default CreateCard;

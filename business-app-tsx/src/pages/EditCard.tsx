import { CircularProgress, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosInstance, { errorResponse } from '../api';
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

const EditCard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, updateCard } = useAuth();
  const [fetching, setFetching] = useState<boolean>(true);
  const [state, setState] = useState<State>({
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

  const handleUpdateCard = (values: State) => {
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
    updateCard(id, apiValues);
  };

  useEffect(() => {
    (async () => {
      setFetching(true);
      try {
        const resp = await axiosInstance.get(`/cards/${id}`);
        setState({
          title: resp.data.title,
          subtitle: resp.data.subtitle,
          phone: resp.data.phone,
          houseNumber: resp.data.address.houseNumber,
          zip: resp.data.address.zip,
          street: resp.data.address.street,
          city: resp.data.address.city,
          country: resp.data.address.country,
          email: resp.data.email,
          web: resp.data.web,
          imageUrl: resp.data.image.url,
          imageAlt: resp.data.image.alt,
          description: resp.data.description,
        });
      } catch (er) {
        toast.error(errorResponse(er));
        navigate('/home');
      } finally {
        setFetching(false);
      }
    })();
  }, [id, navigate, updateCard]);

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
        Edit Card
      </Typography>
      {fetching ? (
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          height='300px'
          width='100%'
        >
          <CircularProgress size={'2rem'} />
        </Stack>
      ) : (
        <CardForm
          title={state.title}
          subtitle={state.subtitle}
          phone={state.phone}
          zip={state.zip}
          houseNumber={state.houseNumber}
          street={state.street}
          city={state.city}
          country={state.country}
          email={state.email}
          isUpdate={true}
          web={state.web}
          imageUrl={state.imageUrl}
          imageAlt={state.imageAlt}
          description={state.description}
          handleSubmit={handleUpdateCard}
          loading={loading}
        />
      )}
    </Stack>
  );
};

export default EditCard;

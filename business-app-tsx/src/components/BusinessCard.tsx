import { FC } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LanguageIcon from '@mui/icons-material/Language';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Chip, IconButton, Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface Address {
  houseNumber?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
}

interface Image {
  url: string;
  alt: string;
}

interface BusinessCardProps {
  id?: string;
  title?: string;
  subtitle?: string;
  image?: Image;
  phone?: string;
  address?: Address;
  cardNumber?: string;
  web?: string;
  isPrivate?: boolean;
}

const makeAddress = (add: Address) => {
  return `${add?.houseNumber}, ${add.street}, ${add.city}, ${add.state}, ${add.zip}`;
};

const BusinessCard: FC<BusinessCardProps> = ({
  id,
  title,
  subtitle,
  image,
  phone,
  address,
  cardNumber,
  web,
  isPrivate = false,
}) => {
  const navigate = useNavigate();
  const { deleteCard } = useAuth();

  return (
    <Card width='inherit' sx={{ position: 'relative', maxWidth: '360px' }}>
      <CardMedia sx={{ height: 250 }} image={image?.url} title={image?.alt} />
      <CardContent>
        <Box position={'absolute'} top={15} left={15}>
          <Chip label={`#${cardNumber}`} color='primary' />
        </Box>
        {isPrivate && (
          <Stack
            direction={'row'}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              background: '#fff',
              borderRadius: '49px',
              px: 1,
            }}
          >
            <IconButton
              color='error'
              disableRipple
              onClick={() => {
                deleteCard(id, cardNumber);
              }}
            >
              <DeleteIcon fontSize='small' />
            </IconButton>
            <IconButton
              color='success'
              onClick={() => {
                navigate(`/my-cards/${id}`);
              }}
              disableRipple
            >
              <EditIcon fontSize='small' />
            </IconButton>
          </Stack>
        )}
        <Stack spacing={1}>
          <Stack mb={2}>
            <Typography variant='h5' align='center'>
              {title}
            </Typography>
            <Typography
              gutterBottom
              variant='subtitle2'
              color='text.secondary'
              align='center'
            >
              {subtitle}
            </Typography>
          </Stack>
          <Stack alignItems={'center'} spacing={1}>
            <Stack direction={'row'} alignItems={'flex-start'} spacing={1}>
              <LocationOnIcon fontSize='small' color='success' />
              <Typography variant='body2' color='success.main' align='center'>
                {makeAddress(address)}
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <LanguageIcon fontSize='small' color='warning' />
              <Typography variant='body2' color='warning.main'>
                {web}
              </Typography>
            </Stack>
            <Stack direction={'row'} alignItems={'center'} spacing={1}>
              <PhoneIcon fontSize='small' color='info' />
              <Typography variant='body2' color='info.main'>
                {phone}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

BusinessCard.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  image: PropTypes.shape({
    url: PropTypes.string,
    alt: PropTypes.string,
  }),
  phone: PropTypes.string,
  web: PropTypes.string,
  address: PropTypes.shape({
    houseNumber: PropTypes.string,
    street: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    zip: PropTypes.string,
  }),
  cardNumber: PropTypes.string,
  isPrivate: PropTypes.bool,
};

export default BusinessCard;

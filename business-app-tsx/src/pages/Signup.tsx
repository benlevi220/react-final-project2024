import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  Button,
  CircularProgress,
  Divider,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Logo from '../components/Logo';
import * as Yup from 'yup';

interface FormData {
  fullName: string;
  email: string;
  password: string;
  phone: string;
  address: {
    state: string;
    country: string;
    city: string;
    street: string;
    houseNumber: string;
    zip: string;
  };
  isBusiness: boolean;
}

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  const [loading, setLoading] = useState(false);

  const formik = useFormik<FormData>({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      phone: '',
      address: {
        state: '',
        country: '',
        city: '',
        street: '',
        houseNumber: '',
        zip: '',
      },
      isBusiness: true,
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required('Full Name is required!'),
      email: Yup.string()
        .email('Invalid Email Address!')
        .required('Email Address is required!'),
      password: Yup.string()
        .required('Password is required!')
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be less than 20 characters'),
      phone: Yup.string()
        .matches(/^\d{10}$/, 'Invalid Phone Number')
        .required('Phone Number is required!'),
      address: Yup.object().shape({
        state: Yup.string().required('State is required!'),
        country: Yup.string().required('Country is required!'),
        city: Yup.string().required('City is required!'),
        street: Yup.string().required('Street is required!'),
        houseNumber: Yup.string().required('House Number is required!'),
        zip: Yup.string().required('ZIP Code is required!'),
      }),
    }),
    onSubmit: values => {
      setLoading(true);
      const userData = {
        name: {
          first: values.fullName.split(' ')[0], // Assuming first name is before the space
          middle: '',
          last: values.fullName.split(' ')[1] || '', // Last name might not be present
        },
        phone: values.phone,
        email: values.email,
        password: values.password,
        image: {
          url: '',
          alt: '',
        },
        address: {
          state: values.address.state,
          country: values.address.country,
          city: values.address.city,
          street: values.address.street,
          houseNumber: parseInt(values.address.houseNumber), // Convert to number
          zip: parseInt(values.address.zip), // Convert to number
        },
        isBusiness: values.isBusiness,
      };

      axios
        .post(
          'https://monkfish-app-z9uza.ondigitalocean.app/bcard2/users',
          userData
        )
        .then(response => {
          toast.success('Signup successful!');
          console.log('Signup successful!', response.data);
          formik.resetForm();
          navigate('/login');
        })
        .catch(error => {
          console.error('Signup failed!', error);
          toast.error(`${error.response.data || 'Something went wrong'}`);
        })
        .finally(() => setLoading(false));
    },
  });

  return (
    <Stack
      spacing={5}
      bgcolor={'#fff'}
      borderRadius={'12px'}
      p='30px'
      width='100%'
      maxWidth='500px'
      mx='auto'
      alignItems={'center'}
      height='max-content'
    >
      <Stack alignItems='center'>
        <Logo />
        <Stack mt={1}>
          <Typography variant='h3' align='center' gutterBottom>
            Sign Up
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            Welcome Back! Please enter your details
          </Typography>
        </Stack>
      </Stack>
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        style={{ width: '100%', height: '100%' }}
      >
        <Stack spacing={1}>
          <Typography variant='body2' gutterBottom>
            Full Name
          </Typography>
          <OutlinedInput
            id='login-fullName'
            placeholder='Enter your full name here'
            fullWidth
            label=''
            name='fullName'
            value={formik.values.fullName}
            onChange={formik.handleChange}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
          />
          {formik.touched.fullName && formik.errors.fullName && (
            <Typography variant='body2' color='error'>
              {formik.errors.fullName}
            </Typography>
          )}
        </Stack>
        <Stack mt={2} spacing={1}>
          <Typography variant='body2' gutterBottom>
            Email
          </Typography>
          <OutlinedInput
            id='login-email'
            type={'email'}
            placeholder='Enter your email here'
            fullWidth
            label=''
            name='email'
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          {formik.touched.email && formik.errors.email && (
            <Typography variant='body2' color='error'>
              {formik.errors.email}
            </Typography>
          )}
        </Stack>
        <Stack mt={2} spacing={1}>
          <Typography variant='body2' gutterBottom>
            Password
          </Typography>
          <OutlinedInput
            id='login-password'
            type={showPassword ? 'text' : 'password'}
            name='password'
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            placeholder='Enter your password here'
            fullWidth
            endAdornment={
              <InputAdornment position='end'>
                <IconButton
                  aria-label='toggle password visibility'
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge='end'
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </IconButton>
              </InputAdornment>
            }
            label=''
          />
          {formik.touched.password && formik.errors.password && (
            <Typography variant='body2' color='error'>
              {formik.errors.password}
            </Typography>
          )}
        </Stack>
        <Stack mt={2} spacing={1}>
          <Typography variant='body2' gutterBottom>
            Phone
          </Typography>
          <OutlinedInput
            id='login-phone'
            placeholder='Enter your phone number here'
            fullWidth
            label=''
            name='phone'
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
          />
          {formik.touched.phone && formik.errors.phone && (
            <Typography variant='body2' color='error'>
              {formik.errors.phone}
            </Typography>
          )}
        </Stack>
        <Stack mt={2} spacing={1}>
          <Typography variant='body2' gutterBottom>
            Address
          </Typography>
          <Stack spacing={2}>
            <OutlinedInput
              id='login-state'
              placeholder='State'
              fullWidth
              label=''
              name='address.state'
              value={formik.values.address.state}
              onChange={formik.handleChange}
              error={
                formik.touched.address && Boolean(formik.errors.address?.state)
              }
            />
            <OutlinedInput
              id='login-country'
              placeholder='Country'
              fullWidth
              label=''
              name='address.country'
              value={formik.values.address.country}
              onChange={formik.handleChange}
              error={
                formik.touched.address &&
                Boolean(formik.errors.address?.country)
              }
            />
            <OutlinedInput
              id='login-city'
              placeholder='City'
              fullWidth
              label=''
              name='address.city'
              value={formik.values.address.city}
              onChange={formik.handleChange}
              error={
                formik.touched.address && Boolean(formik.errors.address?.city)
              }
            />
            <OutlinedInput
              id='login-street'
              placeholder='Street'
              fullWidth
              label=''
              name='address.street'
              value={formik.values.address.street}
              onChange={formik.handleChange}
              error={
                formik.touched.address && Boolean(formik.errors.address?.street)
              }
            />
            <OutlinedInput
              id='login-houseNumber'
              placeholder='House Number'
              fullWidth
              label=''
              name='address.houseNumber'
              value={formik.values.address.houseNumber}
              onChange={formik.handleChange}
              error={
                formik.touched.address &&
                Boolean(formik.errors.address?.houseNumber)
              }
            />
            <OutlinedInput
              id='login-zip'
              placeholder='ZIP Code'
              fullWidth
              label=''
              name='address.zip'
              value={formik.values.address.zip}
              onChange={formik.handleChange}
              error={
                formik.touched.address && Boolean(formik.errors.address?.zip)
              }
            />
          </Stack>
        </Stack>
        <FormControl fullWidth variant='outlined' sx={{ my: 3 }}>
          <InputLabel id='isBusiness-label'>Is Business Account?</InputLabel>
          <Select
            labelId='isBusiness-label'
            id='login-isBusiness'
            label='Is Business Account?'
            name='isBusiness'
            value={formik.values.isBusiness}
            onChange={formik.handleChange}
          >
            <MenuItem value={true}>Yes</MenuItem>
            <MenuItem value={false}>No</MenuItem>
          </Select>
        </FormControl>
        <Button
          type='submit'
          variant='contained'
          size='large'
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={18} /> : 'Sign Up'}
        </Button>
        <Divider sx={{ my: 3 }}>
          <Typography variant='caption' color='textSecondary'>
            OR
          </Typography>
        </Divider>
        <Stack
          direction='row'
          alignItems={'center'}
          justifyContent={'center'}
          spacing={0.5}
          sx={{
            '& a': {
              color: theme => theme.palette.primary.main,
            },
          }}
        >
          <Typography variant='body1'>Already have an account?</Typography>
          <Link to={'/login'}>
            <Typography variant='subtitle1' color='primary'>
              Sign In
            </Typography>
          </Link>
        </Stack>
      </form>
    </Stack>
  );
};

export default Signup;

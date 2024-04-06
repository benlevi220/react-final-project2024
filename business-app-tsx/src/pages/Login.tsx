import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stack,
  Typography,
  Button,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import axiosInstance, { errorResponse } from '../api';
import Logo from '../components/Logo';
import { useAuth } from '../context/AuthContext';
import * as Yup from 'yup';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => event.preventDefault();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .strict(true)
        .email('Invalid Email Address!')
        .required('Email Address is required!'),
      password: Yup.string()
        .required('Password is required!')
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be less than 20 characters'),
    }),
    onSubmit: async values => {
      try {
        setLoading(true);
        const response = await axiosInstance.post('/users/login', values);
        if (response.status === 200) {
          handleLogin();
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('bcard2', JSON.stringify(response.data));
          formik.resetForm();
          navigate('/dashboard');
        } else {
          toast.error(response.data.error);
        }
      } catch (error) {
        toast.error(errorResponse(error));
      } finally {
        setLoading(false);
      }
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
      height='max-content'
      mx='auto'
      alignItems={'center'}
    >
      <Stack alignItems='center'>
        <Logo />
        <Stack mt={1}>
          <Typography variant='h3' align='center' gutterBottom>
            Sign In
          </Typography>
          <Typography variant='body1' color='textSecondary'>
            Welcome Back! Please enter your details
          </Typography>
        </Stack>
      </Stack>
      <form
        autoComplete='off'
        onSubmit={formik.handleSubmit}
        style={{ width: '100%' }}
      >
        <Stack spacing={1}>
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
        <Stack mt={2} mb={4} spacing={1} width='100%'>
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
        <Button
          type='submit'
          variant='contained'
          size='large'
          fullWidth
          disabled={loading}
        >
          {loading ? <CircularProgress size={18} /> : 'Sign In'}
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
          <Typography variant='body1'>Don&apos;t have an account?</Typography>
          <Link to={'/signup'}>
            <Typography variant='subtitle1' color='primary'>
              Sign up
            </Typography>
          </Link>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;

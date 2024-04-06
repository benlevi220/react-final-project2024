import { FC } from 'react';
import styled from '@emotion/styled';
import UploadIcon from '@mui/icons-material/Upload';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material';
import { useFormik } from 'formik';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface CardFormProps {
  title?: string;
  subtitle?: string;
  phone?: string;
  houseNumber?: string;
  zip?: string;
  street?: string;
  city?: string;
  country?: string;
  handleSubmit: (values: any) => void;
  email?: string;
  isUpdate?: boolean;
  web?: string;
  imageUrl?: string;
  imageAlt?: string;
  description?: string;
  loading?: boolean;
}

const CardForm: FC<CardFormProps> = ({
  title,
  subtitle,
  phone,
  houseNumber,
  zip,
  street,
  city,
  country,
  handleSubmit,
  email,
  isUpdate,
  web,
  imageUrl,
  imageAlt,
  description,
  loading,
}) => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: title || '',
      subtitle: subtitle || '',
      phone: phone || '',
      houseNumber: houseNumber || '',
      city: city || '',
      country: country || '',
      zip: zip || '',
      attachment: null,
      email: email || '',
      web: web || '',
      street: street || '',
      imageUrl: imageUrl || '',
      imageAlt: imageAlt || '',
      description: description || '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('Email is required!'),
      title: Yup.string().required('Title is required!'),
      subtitle: Yup.string().required('Subtitle is required!'),
      phone: Yup.string().required('Phone is required!'),
      houseNumber: Yup.string().required('House Number is required!'),
      street: Yup.string().required('Street is required!'),
      city: Yup.string().required('City is required!'),
      country: Yup.string().required('Country is required!'),
      zip: Yup.string().required('Zip is required!'),
      web: Yup.string().url('Invalid URL').required('Website is required!'),
      imageUrl: Yup.string()
        .url('Invalid URL')
        .required('Image URL is required'),
      imageAlt: Yup.string().required('Image alt is required!'),
      description: Yup.string().required('Description is required!'),
    }),
    onSubmit: values => {
      handleSubmit(values);
    },
  });

  console.log('formik', formik);

  return (
    <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' gutterBottom>
            Title
          </Typography>
          <OutlinedInput
            id='login-title'
            placeholder='Enter card title here'
            fullWidth
            label=''
            name='title'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
          />
          {formik.touched.title && formik.errors.title && (
            <Typography variant='body2' color='error'>
              {formik.errors.title}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' gutterBottom>
            Subtitle
          </Typography>
          <OutlinedInput
            id='login-subTitle'
            placeholder='Enter card sub-title here'
            fullWidth
            label=''
            name='subtitle'
            value={formik.values.subtitle}
            onChange={formik.handleChange}
            error={formik.touched.subtitle && Boolean(formik.errors.subtitle)}
          />
          {formik.touched.subtitle && formik.errors.subtitle && (
            <Typography variant='body2' color='error'>
              {formik.errors.subtitle}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant='body2' gutterBottom>
            Description
          </Typography>
          <OutlinedInput
            id='login-description'
            placeholder='Enter card description here'
            fullWidth
            label=''
            name='description'
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            multiline
            rows={6}
          />
          {formik.touched.description && formik.errors.description && (
            <Typography variant='body2' color='error'>
              {formik.errors.description}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' gutterBottom>
            Email
          </Typography>
          <OutlinedInput
            id='login-email'
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' gutterBottom>
            Phone No
          </Typography>
          <OutlinedInput
            id='login-phone'
            placeholder='Enter your phone no here'
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
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' gutterBottom>
            Website
          </Typography>
          <OutlinedInput
            id='login-website'
            placeholder='Enter your website here'
            fullWidth
            label=''
            name='web'
            value={formik.values.web}
            onChange={formik.handleChange}
            error={formik.touched.web && Boolean(formik.errors.web)}
          />
          {formik.touched.web && formik.errors.web && (
            <Typography variant='body2' color='error'>
              {formik.errors.web}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' gutterBottom>
            House Number
          </Typography>
          <OutlinedInput
            id='login-address'
            placeholder='Enter your house number here'
            fullWidth
            label=''
            name='houseNumber'
            value={formik.values.houseNumber}
            onChange={formik.handleChange}
            error={
              formik.touched.houseNumber && Boolean(formik.errors.houseNumber)
            }
          />
          {formik.touched.houseNumber && formik.errors.houseNumber && (
            <Typography
              variant='
            body2'
              color='error'
            >
              {formik.errors.houseNumber}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' gutterBottom>
            Street
          </Typography>
          <OutlinedInput
            id='login-street'
            placeholder='Enter your street here'
            fullWidth
            label=''
            name='street'
            value={formik.values.street}
            onChange={formik.handleChange}
            error={formik.touched.street && Boolean(formik.errors.street)}
          />
          {formik.touched.street && formik.errors.street && (
            <Typography variant='body2' color='error'>
              {formik.errors.street}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' gutterBottom>
            City
          </Typography>
          <OutlinedInput
            id='login-city'
            placeholder='Enter your city here'
            fullWidth
            label=''
            name='city'
            value={formik.values.city}
            onChange={formik.handleChange}
            error={formik.touched.city && Boolean(formik.errors.city)}
          />
          {formik.touched.city && formik.errors.city && (
            <Typography variant='body2' color='error'>
              {formik.errors.city}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' gutterBottom>
            Country
          </Typography>
          <OutlinedInput
            id='login-country'
            placeholder='Enter your country here'
            fullWidth
            label=''
            name='country'
            value={formik.values.country}
            onChange={formik.handleChange}
            error={formik.touched.country && Boolean(formik.errors.country)}
          />
          {formik.touched.country && formik.errors.country && (
            <Typography variant='body2' color='error'>
              {formik.errors.country}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography variant='body2' gutterBottom>
            Zip Code
          </Typography>
          <OutlinedInput
            id='login-country'
            placeholder='Enter your country here'
            fullWidth
            label=''
            name='zip'
            value={formik.values.zip}
            onChange={formik.handleChange}
            error={formik.touched.zip && Boolean(formik.errors.zip)}
          />
          {formik.touched.zip && formik.errors.zip && (
            <Typography variant='body2' color='error'>
              {formik.errors.zip}
            </Typography>
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant='body2' gutterBottom>
            Card Image
          </Typography>
          <Stack
            direction='row'
            alignItems={'stretch'}
            spacing={1}
            width='100%'
          >
            <Box flex={2}>
              <OutlinedInput
                id='login-image'
                placeholder='image url'
                fullWidth
                label=''
                name='imageUrl'
                value={formik.values.imageUrl}
                onChange={formik.handleChange}
                error={
                  formik.touched.imageUrl && Boolean(formik.errors.imageUrl)
                }
              />
              {formik.touched.imageUrl && formik.errors.imageUrl && (
                <Typography variant='body2' color='error'>
                  {formik.errors.imageUrl}
                </Typography>
              )}
            </Box>
            <Box flex={1}>
              <OutlinedInput
                id='login-image'
                placeholder='image alt'
                fullWidth
                label=''
                name='imageAlt'
                value={formik.values.imageAlt}
                onChange={formik.handleChange}
                error={
                  formik.touched.imageAlt && Boolean(formik.errors.imageAlt)
                }
                style={{ flex: 1 }}
              />
              {formik.touched.imageAlt && formik.errors.imageAlt && (
                <Typography variant='body2' color='error'>
                  {formik.errors.imageAlt}
                </Typography>
              )}
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <Stack
        mt={5}
        direction={'row'}
        spacing={1}
        alignItems={'center'}
        width='100%'
        maxWidth='400px'
        mx={'auto'}
      >
        <Button
          size='large'
          variant='contained'
          color='secondary'
          sx={{ flex: 1 }}
          onClick={() => navigate('/my-cards')}
        >
          Cancel
        </Button>
        <Button
          size='large'
          variant='contained'
          type='submit'
          sx={{ flex: 1 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={20} />
          ) : isUpdate ? (
            'Update Card'
          ) : (
            'Create Card'
          )}
        </Button>
      </Stack>
    </form>
  );
};

CardForm.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  phone: PropTypes.string,
  zip: PropTypes.string,
  city: PropTypes.string,
  state: PropTypes.string, // This should probably be 'state' instead of 'street'
  country: PropTypes.string,
  street: PropTypes.string,
  web: PropTypes.string,
  houseNumber: PropTypes.string,
  email: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired, // Make handleSubmit required
  isUpdate: PropTypes.bool,
  imageUrl: PropTypes.string,
  imageAlt: PropTypes.string,
  description: PropTypes.string,
  loading: PropTypes.bool,
};

export default CardForm;

// /* eslint-disable no-unused-vars */
// import styled from '@emotion/styled';
// import UploadIcon from '@mui/icons-material/Upload';
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Grid,
//   OutlinedInput,
//   Stack,
//   Typography,
// } from '@mui/material';
// import { useFormik } from 'formik';
// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';

// const CardForm = ({
//   title,
//   subtitle,
//   phone,
//   houseNumber,
//   zip,
//   street,
//   city,
//   country,
//   handleSubmit,
//   email,
//   isUpdate,
//   web,
//   imageUrl,
//   imageAlt,
//   description,
//   loading,
// }) => {
//   const navigate = useNavigate();

//   const formik = useFormik({
//     initialValues: {
//       title,
//       subtitle,
//       phone,
//       houseNumber,
//       city,
//       country,
//       zip,
//       attachment: null,
//       email,
//       web,
//       street,
//       imageUrl,
//       imageAlt,
//       description,
//     },
//     validationSchema: Yup.object({
//       email: Yup.string().email().required('Email is required!'),
//       title: Yup.string().required('Title is required!'),
//       subtitle: Yup.string().required('Subtitle is required!'),
//       phone: Yup.string().required('Phone is required!'),
//       houseNumber: Yup.string().required('House Number is required!'),
//       street: Yup.string().required('Street is required!'),
//       city: Yup.string().required('City is required!'),
//       country: Yup.string().required('Country is required!'),
//       zip: Yup.string().required('Zip is required!'),
//       web: Yup.string().url('Invalid URL').required('Website is required!'),
//       imageUrl: Yup.string()
//         .url('Invalid URL')
//         .required('Image URL is required'),
//       imageAlt: Yup.string().required('Image alt is required!'),
//       description: Yup.string().required('Description is required!'),
//     }),
//     onSubmit: values => {
//       handleSubmit(values);
//     },
//   });

//   console.log('formik', formik);

//   return (
//     <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='body2' gutterBottom>
//             Title
//           </Typography>
//           <OutlinedInput
//             id='login-title'
//             placeholder='Enter card title here'
//             fullWidth
//             label=''
//             name='title'
//             value={formik.values.title}
//             onChange={formik.handleChange}
//             error={formik.touched.title && Boolean(formik.errors.title)}
//           />
//           {formik.touched.title && formik.errors.title && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.title}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='body2' gutterBottom>
//             Subtitle
//           </Typography>
//           <OutlinedInput
//             id='login-subTitle'
//             placeholder='Enter card sub-title here'
//             fullWidth
//             label=''
//             name='subtitle'
//             value={formik.values.subtitle}
//             onChange={formik.handleChange}
//             error={formik.touched.subtitle && Boolean(formik.errors.subtitle)}
//           />
//           {formik.touched.subtitle && formik.errors.subtitle && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.subtitle}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12}>
//           <Typography variant='body2' gutterBottom>
//             Description
//           </Typography>
//           <OutlinedInput
//             id='login-description'
//             placeholder='Enter card description here'
//             fullWidth
//             label=''
//             name='description'
//             value={formik.values.description}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.description && Boolean(formik.errors.description)
//             }
//             multiline
//             rows={6}
//           />
//           {formik.touched.description && formik.errors.description && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.description}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='body2' gutterBottom>
//             Email
//           </Typography>
//           <OutlinedInput
//             id='login-email'
//             placeholder='Enter your email here'
//             fullWidth
//             label=''
//             name='email'
//             value={formik.values.email}
//             onChange={formik.handleChange}
//             error={formik.touched.email && Boolean(formik.errors.email)}
//           />
//           {formik.touched.email && formik.errors.email && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.email}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='body2' gutterBottom>
//             Phone No
//           </Typography>
//           <OutlinedInput
//             id='login-phone'
//             placeholder='Enter your phone no here'
//             fullWidth
//             label=''
//             name='phone'
//             value={formik.values.phone}
//             onChange={formik.handleChange}
//             error={formik.touched.phone && Boolean(formik.errors.phone)}
//           />
//           {formik.touched.phone && formik.errors.phone && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.phone}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='body2' gutterBottom>
//             Website
//           </Typography>
//           <OutlinedInput
//             id='login-website'
//             placeholder='Enter your website here'
//             fullWidth
//             label=''
//             name='web'
//             value={formik.values.web}
//             onChange={formik.handleChange}
//             error={formik.touched.web && Boolean(formik.errors.web)}
//           />
//           {formik.touched.web && formik.errors.web && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.web}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='body2' gutterBottom>
//             House Number
//           </Typography>
//           <OutlinedInput
//             id='login-address'
//             placeholder='Enter your house number here'
//             fullWidth
//             label=''
//             name='houseNumber'
//             value={formik.values.houseNumber}
//             onChange={formik.handleChange}
//             error={
//               formik.touched.houseNumber && Boolean(formik.errors.houseNumber)
//             }
//           />
//           {formik.touched.houseNumber && formik.errors.houseNumber && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.houseNumber}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='body2' gutterBottom>
//             Street
//           </Typography>
//           <OutlinedInput
//             id='login-street'
//             placeholder='Enter your street here'
//             fullWidth
//             label=''
//             name='street'
//             value={formik.values.street}
//             onChange={formik.handleChange}
//             error={formik.touched.street && Boolean(formik.errors.street)}
//           />
//           {formik.touched.street && formik.errors.street && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.street}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='body2' gutterBottom>
//             City
//           </Typography>
//           <OutlinedInput
//             id='login-city'
//             placeholder='Enter your city here'
//             fullWidth
//             label=''
//             name='city'
//             value={formik.values.city}
//             onChange={formik.handleChange}
//             error={formik.touched.city && Boolean(formik.errors.city)}
//           />
//           {formik.touched.city && formik.errors.city && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.city}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='body2' gutterBottom>
//             Country
//           </Typography>
//           <OutlinedInput
//             id='login-country'
//             placeholder='Enter your country here'
//             fullWidth
//             label=''
//             name='country'
//             value={formik.values.country}
//             onChange={formik.handleChange}
//             error={formik.touched.country && Boolean(formik.errors.country)}
//           />
//           {formik.touched.country && formik.errors.country && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.country}
//             </Typography>
//           )}
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <Typography variant='body2' gutterBottom>
//             Zip Code
//           </Typography>
//           <OutlinedInput
//             id='login-country'
//             placeholder='Enter your country here'
//             fullWidth
//             label=''
//             name='zip'
//             value={formik.values.zip}
//             onChange={formik.handleChange}
//             error={formik.touched.zip && Boolean(formik.errors.zip)}
//           />
//           {formik.touched.zip && formik.errors.zip && (
//             <Typography variant='body2' color='error'>
//               {formik.errors.zip}
//             </Typography>
//           )}
//         </Grid>

//         <Grid item xs={12}>
//           <Typography variant='body2' gutterBottom>
//             Card Image
//           </Typography>
//           <Stack
//             direction='row'
//             alignItems={'stretch'}
//             spacing={1}
//             width='100%'
//           >
//             <Box flex={2}>
//               <OutlinedInput
//                 id='login-image'
//                 placeholder='image url'
//                 fullWidth
//                 label=''
//                 name='imageUrl'
//                 value={formik.values.imageUrl}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.imageUrl && Boolean(formik.errors.imageUrl)
//                 }
//               />
//               {formik.touched.imageUrl && formik.errors.imageUrl && (
//                 <Typography variant='body2' color='error'>
//                   {formik.errors.imageUrl}
//                 </Typography>
//               )}
//             </Box>
//             <Box flex={1}>
//               <OutlinedInput
//                 id='login-image'
//                 placeholder='image alt'
//                 fullWidth
//                 label=''
//                 name='imageAlt'
//                 value={formik.values.imageAlt}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.imageAlt && Boolean(formik.errors.imageAlt)
//                 }
//                 style={{ flex: 1 }}
//               />
//               {formik.touched.imageAlt && formik.errors.imageAlt && (
//                 <Typography variant='body2' color='error'>
//                   {formik.errors.imageAlt}
//                 </Typography>
//               )}
//             </Box>
//           </Stack>
//         </Grid>
//       </Grid>
//       <Stack
//         mt={5}
//         direction={'row'}
//         spacing={1}
//         alignItems={'center'}
//         width='100%'
//         maxWidth='400px'
//         mx={'auto'}
//       >
//         <Button
//           size='large'
//           variant='contained'
//           color='secondary'
//           sx={{ flex: 1 }}
//           onClick={() => navigate('/my-cards')}
//         >
//           Cancel
//         </Button>
//         <Button
//           size='large'
//           variant='contained'
//           type='submit'
//           sx={{ flex: 1 }}
//           disabled={loading}
//         >
//           {loading ? (
//             <CircularProgress size={20} />
//           ) : isUpdate ? (
//             'Update Card'
//           ) : (
//             'Create Card'
//           )}
//         </Button>
//       </Stack>
//     </form>
//   );
// };

// CardForm.propTypes = {
//   title: PropTypes.string,
//   subtitle: PropTypes.string,
//   phone: PropTypes.string,
//   zip: PropTypes.string,
//   city: PropTypes.string,
//   state: PropTypes.string,
//   country: PropTypes.string,
//   street: PropTypes.string,
//   web: PropTypes.string,
//   houseNumber: PropTypes.string,
//   email: PropTypes.string,
//   handleSubmit: PropTypes.func,
//   isUpdate: PropTypes.bool,
//   imageUrl: PropTypes.string,
//   imageAlt: PropTypes.string,
//   description: PropTypes.string,
//   loading: PropTypes.bool,
// };

// export default CardForm;

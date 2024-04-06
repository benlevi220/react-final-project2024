import { Avatar } from '@mui/material';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Logo = ({ width = '50px' }) => {
  return (
    <Link to={'/'}>
      <Avatar
        src={'/logo.png'}
        alt={'Business Card'}
        sx={{ width, height: 'fit-content' }}
      />
    </Link>
  );
};

Logo.propTypes = {
  width: PropTypes.string,
};

export default Logo;

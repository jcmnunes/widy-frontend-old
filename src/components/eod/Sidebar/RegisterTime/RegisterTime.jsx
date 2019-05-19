import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { IconTime } from '../../../../icons/Icons';
import { Button } from '../../../UI';
import { REGISTER_TIME } from '../../../modals/types';

const StyledInsertTime = styled.div`
  margin-top: 12px;
`;

const RegisterTime = ({ canRegisterTime, openModal }) => {
  const handleOnClick = () => openModal(REGISTER_TIME);

  return canRegisterTime ? (
    <StyledInsertTime>
      <Button iconBefore={<IconTime />} onClick={handleOnClick}>
        Register Time
      </Button>
    </StyledInsertTime>
  ) : null;
};

RegisterTime.propTypes = {
  canRegisterTime: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default RegisterTime;

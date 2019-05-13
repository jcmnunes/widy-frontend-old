import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styled from 'styled-components';
import EditableInput from '../../../UI/EditableInput';

const StyledSidebarHeader = styled.div`
  color: ${props => props.theme.neutral700};
  margin-bottom: 32px;
`;

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const SidebarHeader = ({ selectedTask, selectedDay, updateTask }) => {
  const updateTaskTitle = title => {
    const payload = { title };
    updateTask(selectedTask.id, payload);
  };

  return (
    <StyledSidebarHeader>
      <TopBar>
        <div>{selectedDay ? moment(selectedDay.day).format('ddd DD MMM YYYY') : ''}</div>
      </TopBar>
      <EditableInput
        initialValue={selectedTask ? selectedTask.title : ''}
        action={updateTaskTitle}
      />
    </StyledSidebarHeader>
  );
};

SidebarHeader.defaultProps = {
  selectedDay: '',
};

SidebarHeader.propTypes = {
  selectedTask: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectedDay: PropTypes.shape({
    day: PropTypes.string.isRequired,
  }),
  updateTask: PropTypes.func.isRequired,
};

export default SidebarHeader;

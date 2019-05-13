import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import SidebarHeader from './SidebarHeader';
import NotesEditor from './NotesEditor';
import Pomodoro from '../Pomodoro';
import { Button } from '../../UI';
import { Heading2 } from '../../UI/Typography';
import { IconLaunch } from '../../../icons/Icons';
import { IllustrationTodoList } from '../../../icons/Illustrations';
import { LAUNCH_TASK } from '../../modals/types';

const StyledSidebar = styled.div`
  background: ${props => props.theme.yellow050};
  padding: 32px;

  @media (min-width: ${props => props.theme.bp_xlarge}) {
    padding: 48px;
  }
`;

const StyledHeading = styled.h2`
  margin-bottom: 12px;
  color: ${props => props.theme.neutral700};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 48px;
`;

const Title = styled.h2`
  font-size: 16px;
  color: ${props => props.theme.neutral400};
  margin-top: 24px;
`;

const Sidebar = ({ selectedTaskId, isSelectedTaskInPlan, openModal, theme }) => {
  const handleLaunchClick = () => {
    openModal(LAUNCH_TASK);
  };

  const renderLaunchIcon = () => (
    <IconLaunch primaryColor={theme.neutral600} secondaryColor={theme.neutral300} />
  );

  return (
    <StyledSidebar>
      {selectedTaskId ? (
        <>
          <SidebarHeader />
          <StyledHeading>Notes:</StyledHeading>
          <NotesEditor />
          <Heading2>Time Management</Heading2>
          {isSelectedTaskInPlan ? (
            <Button iconBefore={renderLaunchIcon()} onClick={handleLaunchClick}>
              Launch task
            </Button>
          ) : (
            <Pomodoro />
          )}
        </>
      ) : (
        <EmptyState>
          <IllustrationTodoList />
          <Title>Select a task to see more info here</Title>
        </EmptyState>
      )}
    </StyledSidebar>
  );
};

Sidebar.propTypes = {
  selectedTaskId: PropTypes.string.isRequired,
  isSelectedTaskInPlan: PropTypes.bool.isRequired,
  openModal: PropTypes.func.isRequired,
  theme: PropTypes.shape({
    [PropTypes.string]: PropTypes.string,
  }).isRequired,
};

export default withTheme(Sidebar);

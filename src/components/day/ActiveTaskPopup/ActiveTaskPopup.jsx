import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Checkbox, Tooltip } from '@binarycapsule/ui-capsules';
import { Heading2 } from '../../common/Typography';
import settings from '../../../helpers/settings';
import { getCurrentPomodoroInfo } from '../../../helpers/pomodoro';
import {
  Header,
  StopButton,
  StyledIconStop,
  StyledPopup,
  Time,
  Units,
} from './ActiveTaskPopup.styles';
import Icon from '../../../icons/Icon';
import { StyledTask, TaskTitle } from '../Board/Task/Task.styles';

const { pomodoro } = settings();

const ActiveTaskPopup = ({
  activeTask,
  selectedDayId,
  storeSelectedDay,
  getDay,
  stopTask,
  updateTask,
}) => {
  const renderTime = () => {
    const { time, start } = activeTask;
    const newTime = time + moment().diff(start, 'seconds');
    const { inBreak, elapsedTime } = getCurrentPomodoroInfo(newTime);
    if (inBreak) return `${elapsedTime} / ${pomodoro.shortBreak}`;
    return `${elapsedTime} / ${pomodoro.length}`;
  };

  const handlePlayButtonClick = e => {
    e.stopPropagation();
    stopTask();
  };

  const handleTaskClick = () => {
    const { dayId } = activeTask;
    storeSelectedDay(dayId);
    getDay(dayId);
  };

  const handleCheckClick = e => e.stopPropagation();

  const handleCheckChange = () => {
    const { taskId, sectionId, dayId } = activeTask;
    stopTask();
    updateTask(taskId, { completed: true, start: null }, { sectionId, dayId });
  };

  return selectedDayId && activeTask.dayId && selectedDayId !== activeTask.dayId ? (
    <StyledPopup data-test="active-task-popup">
      <Header>
        <Heading2>Working on:</Heading2>
        <Time data-test="time-indicator">
          {renderTime()} <Units>min</Units>
        </Time>
      </Header>
      <StyledTask
        isActive
        isSelected
        isCompleted={false}
        isInBreak={activeTask.inBreak}
        onClick={handleTaskClick}
      >
        <Tooltip placement="top" tooltip="Complete the task">
          <Checkbox
            size="large"
            checked={false}
            onChange={handleCheckChange}
            onClick={handleCheckClick}
            style={{ display: 'block' }}
          />
        </Tooltip>
        <TaskTitle>{activeTask.title}</TaskTitle>
        <Tooltip placement="top" tooltip="Stop the task">
          <StopButton onClick={handlePlayButtonClick}>
            <StyledIconStop icon={Icon.STOP} isInBreak={activeTask.inBreak} />
          </StopButton>
        </Tooltip>
      </StyledTask>
    </StyledPopup>
  ) : null;
};

ActiveTaskPopup.propTypes = {
  activeTask: PropTypes.shape({
    taskId: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    sectionId: PropTypes.string.isRequired,
    dayId: PropTypes.string.isRequired,
    inBreak: PropTypes.bool.isRequired,
    time: PropTypes.number.isRequired,
    start: PropTypes.string,
  }).isRequired,
  selectedDayId: PropTypes.string.isRequired,
  storeSelectedDay: PropTypes.func.isRequired,
  getDay: PropTypes.func.isRequired,
  stopTask: PropTypes.func.isRequired,
  updateTask: PropTypes.func.isRequired,
};

export default ActiveTaskPopup;
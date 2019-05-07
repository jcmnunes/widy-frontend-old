import React from 'react';
import { shallow } from 'enzyme';

import ActiveTaskPopup from './ActiveTaskPopup';
import fixture from './ActiveTaskPopup.fixture';
import { findByTestAttr } from '../../../helpers/testUtils';

jest.mock('../../../helpers/settings', () => () => ({
  pomodoro: {
    length: 25,
    shortBreak: 5,
  },
}));

// const TestRenderer = require('react-test-renderer');

const defaultProps = {
  ...fixture,
  storeSelectedDay: jest.fn(),
  getDay: jest.fn(),
  storeSelectedTaskId: jest.fn(),
  storeSelectedSectionId: jest.fn(),
};

/**
 * Factory function to create a ShallowWrapper for the ActiveTaskPopup component.
 * @function setup
 * @param {object} props - Component props specific to this setup.
 * @returns {ShallowWrapper}
 */
const setup = (props = {}) => {
  const setupProps = { ...defaultProps, ...props };
  return shallow(<ActiveTaskPopup {...setupProps} />);
};

describe('ActiveTaskPopup', () => {
  describe('selected day does not contains the active task', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup();
    });

    it('should render with no errors', () => {
      const component = findByTestAttr(wrapper, 'active-task-popup');
      expect(component.length).toBe(1);
    });

    it('should render the time indicator', () => {
      const component = findByTestAttr(wrapper, 'time-indicator');
      expect(component.length).toBe(1);
    });

    it('should render the time indicator', () => {
      const component = findByTestAttr(wrapper, 'time-indicator');
      expect(component.length).toBe(1);
    });

    it('should render the active task', () => {
      const component = findByTestAttr(wrapper, 'task');
      expect(component.length).toBe(1);
    });

    it('should select the active task day when clicking on it', () => {
      const component = findByTestAttr(wrapper, 'task');
      component.simulate('click');
      expect(defaultProps.storeSelectedDay).toHaveBeenCalledWith(fixture.activeTask.dayId);
      expect(defaultProps.getDay).toHaveBeenCalledWith(fixture.activeTask.dayId);
    });

    it('should render the correct time (task is active)', () => {
      const newProps = { activeTask: { ...defaultProps.activeTask, time: 2 * 60 } };
      wrapper = setup(newProps);
      const timeIndicator = findByTestAttr(wrapper, 'time-indicator');
      expect(timeIndicator.text()).toBe('2 : 00 / 25 min');
    });

    it('should render the correct time (task is inBreak)', () => {
      const newProps = { activeTask: { ...defaultProps.activeTask, time: 28 * 60 } };
      wrapper = setup(newProps);
      const timeIndicator = findByTestAttr(wrapper, 'time-indicator');
      expect(timeIndicator.text()).toBe('3 : 00 / 5 min');
    });
  });

  describe('selected day contains the active task', () => {
    let wrapper;
    const newProps = {
      selectedDayId: fixture.activeTask.dayId,
    };
    beforeEach(() => {
      wrapper = setup(newProps);
    });

    it('should not render the popup if current selected day contains the active task', () => {
      const component = findByTestAttr(wrapper, 'active-task-popup');
      expect(component.length).toBe(0);
    });
  });
});
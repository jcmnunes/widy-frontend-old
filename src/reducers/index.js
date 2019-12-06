import { combineReducers } from 'redux';
import auth from './auth/authReducer';
import modals from './modals';
import days from './days/daysReducer';
import sections from './sections/sectionsReducer';
import tasks from './tasks/tasksReducer';
import activeTask from './activeTask/activeTaskReducer';

const rootReducer = combineReducers({
  auth,
  modals,
  days,
  sections,
  tasks,
  activeTask,
});

export default rootReducer;

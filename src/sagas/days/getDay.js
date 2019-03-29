import { call, put, takeLatest } from 'redux-saga/effects';
import { getDay } from '../../api/days';
import * as types from '../../actions/days/types';

const normalize = data => {
  const normalized = {
    sections: {
      day: data.day,
      byId: {},
      order: [],
    },
    tasks: {
      byId: {},
    },
  };
  data.sections.forEach(({ title, tasks, _id: id }) => {
    const tasksArray = tasks.map(task => task._id);
    normalized.sections.byId[id] = { title, tasks: tasksArray };
    normalized.sections.order.push(id);
    tasks.forEach(({ title, _id: id }) => {
      normalized.tasks.byId[id] = { title };
    });
  });

  return normalized;
};

export function* getDaySaga(action) {
  try {
    const { data } = yield call(getDay, action.payload);
    const { sections, tasks } = normalize(data);

    yield put({ type: types.GET_DAY_SUCCESS, sections, tasks });
  } catch (error) {
    yield put({ type: types.GET_DAY_FAILURE, error });
  }
}

export default function* watchGetDay() {
  yield takeLatest(types.GET_DAY_REQUEST, getDaySaga);
}

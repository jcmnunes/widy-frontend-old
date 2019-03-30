import * as types from '../../actions/days/types';
import initialState from './initialState';

export default (state = initialState, action) => {
  switch (action.type) {
    case types.STORE_SELECTED_DAY:
      return { ...state, selected: action.payload };
    case types.GET_DAYS_REQUEST:
      return { ...state, loading: true };
    case types.GET_DAYS_SUCCESS:
      return { ...state, loading: false, byId: action.byId, order: action.order };
    case types.GET_DAYS_FAILURE:
      return { ...state, loading: false };
    case types.CREATE_DAY_REQUEST:
      return { ...state, createDayLoading: true };
    case types.CREATE_DAY_SUCCESS:
      return {
        ...state,
        createDayLoading: false,
        selected: action.day._id,
        order: [action.day._id, ...state.order],
        byId: { ...state.byId, [action.day._id]: action.day },
      };
    case types.CREATE_DAY_FAILURE:
      return { ...state, createDayLoading: false };
    default:
      return state;
  }
};
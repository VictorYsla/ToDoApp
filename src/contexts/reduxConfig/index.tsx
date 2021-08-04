import { AnyAction, CombinedState, combineReducers } from 'redux';
import tasks, { addTask } from './reducers/tasks';
import doneTasks, { addDoneTask } from './reducers/doneTasks';

type stateProps =
  | CombinedState<{ tasks: { tasks: any }; doneTasks: { doneTasks: any } }>
  | undefined;

const appReducer = combineReducers({
  tasks,
  doneTasks,
});

export default (state: stateProps, action: AnyAction) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const actions = {
  addTask,
  addDoneTask,
};

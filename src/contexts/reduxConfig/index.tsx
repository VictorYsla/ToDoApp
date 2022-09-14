import { CombinedState, combineReducers } from 'redux';
import pendingTasks, { addPendingTask } from './reducers/pendingTasks';
import doneTasks, { addDoneTask } from './reducers/doneTasks';
import { taskProps } from '../../common/types';
import { actionStateProps } from '../types';

type stateProps = CombinedState<{
  pendingTasks: { pendingTasks: taskProps };
  doneTasks: { doneTasks: taskProps };
}>;

const appReducer = combineReducers({
  pendingTasks,
  doneTasks,
});

export default (state: stateProps, action: actionStateProps) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const actions = {
  addPendingTask,
  addDoneTask,
};

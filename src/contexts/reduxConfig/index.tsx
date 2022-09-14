import { CombinedState, combineReducers } from 'redux';
import tasks, { addTask } from './reducers/tasks';
import doneTasks, { addDoneTask } from './reducers/doneTasks';
import { taskProps } from '../../common/types';
import { actionStateProps } from '../types';

type stateProps = CombinedState<{
  tasks: { tasks: taskProps };
  doneTasks: { doneTasks: taskProps };
}>;

const appReducer = combineReducers({
  tasks,
  doneTasks,
});

export default (state: stateProps, action: actionStateProps) => {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

export const actions = {
  addTask,
  addDoneTask,
};

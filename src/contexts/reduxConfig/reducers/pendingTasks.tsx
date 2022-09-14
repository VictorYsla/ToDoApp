import { taskProps } from '../../../common/types';
import { actionStateProps } from '../../types';

export const ADD_PENDING_TASK = 'ADD_PENDING_TASK';

type addPendingTaskProps = taskProps[];

export const addPendingTask = (pendingTasks: addPendingTaskProps) => ({
  type: ADD_PENDING_TASK,
  pendingTasks,
});

const initialState: { pendingTasks: taskProps[] } = {
  pendingTasks: [],
};

export default (state = initialState, action: actionStateProps) => {
  const { pendingTasks } = action;
  switch (action.type) {
    case ADD_PENDING_TASK:
      return {
        ...state,
        pendingTasks,
      };
    default:
      return state;
  }
};

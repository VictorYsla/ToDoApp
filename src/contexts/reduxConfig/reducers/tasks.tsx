import { taskProps } from '../../../common/types';
import { actionStateProps } from '../../types';

export const ADD_TASK = 'ADD_TASK';

type addTaskProps = taskProps[];

export const addTask = (tasks: addTaskProps) => ({
  type: ADD_TASK,
  tasks,
});

const initialState: { tasks: taskProps[] } = {
  tasks: [],
};

export default (state = initialState, action: actionStateProps) => {
  const { tasks } = action;
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks,
      };
    default:
      return state;
  }
};

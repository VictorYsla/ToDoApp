import { taskProps } from '../../../common/types';
import { actionStateProps } from '../../types';
export const DONE = 'DONE';

type addDoneTask = taskProps[];

export const addDoneTask = (doneTasks: addDoneTask) => ({
  type: DONE,
  doneTasks,
});

const initialState: { doneTasks: taskProps[] } = {
  doneTasks: [],
};

export default (state = initialState, action: actionStateProps) => {
  const { doneTasks } = action;
  switch (action.type) {
    case DONE:
      return {
        ...state,
        doneTasks,
      };
    default:
      return state;
  }
};

import { AnyAction } from 'redux';
export const DONE = 'DONE';

type addDoneTask = [
  ...any[],
  {
    create: number;
    title: string;
    deadLine: number;
    startTime: number;
    endtime: number;
    remind: number;
    repeat: string;
    color: string;
  },
];

export const addDoneTask = (doneTasks: addDoneTask) => ({
  type: DONE,
  doneTasks,
});

const initialState = {
  doneTasks: [],
};

export default (state = initialState, action: AnyAction) => {
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

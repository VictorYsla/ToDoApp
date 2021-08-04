import { AnyAction } from 'redux';
export const ADD_TASK = 'ADD_TASK';

type addTaskProps =
  | [
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
    ]
  | never[];

export const addTask = (tasks: addTaskProps) => ({
  type: ADD_TASK,
  tasks,
});

const initialState = {
  tasks: [],
};

export default (state = initialState, action: AnyAction) => {
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

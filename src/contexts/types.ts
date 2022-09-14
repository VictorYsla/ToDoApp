import { taskProps } from '../common/types';

export type actionStateProps = {
  doneTasks: taskProps;
  pendingTasks: taskProps;
  type: string;
};

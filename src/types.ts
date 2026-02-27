export interface Task {
  id: string;
  action: string;
  execute_at: number;
  status: string;
  remaining_seconds: number;
}

export type ActionType = 'shutdown' | 'restart' | 'sleep' | 'hibernate' | 'lock';

export interface TaskFormData {
  action: ActionType;
  timeType: 'absolute' | 'relative';
  absoluteDate: string;
  absoluteTime: string;
  relativeValue: number;
  relativeUnit: 'minutes' | 'hours';
}

import { format, addMinutes, addHours } from 'date-fns';

export function formatDateTime(timestamp: number): string {
  return format(new Date(timestamp * 1000), 'yyyy-MM-dd HH:mm:ss');
}

export function formatRemainingTime(seconds: number): string {
  if (seconds <= 0) return '已到期';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}小时${minutes}分钟${secs}秒`;
  } else if (minutes > 0) {
    return `${minutes}分钟${secs}秒`;
  } else {
    return `${secs}秒`;
  }
}

export function getActionLabel(action: string): string {
  const labels: Record<string, string> = {
    shutdown: '关机',
    restart: '重启',
    sleep: '睡眠',
    hibernate: '休眠',
    lock: '锁定',
  };
  return labels[action] || action;
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'text-primary-700 dark:text-primary-300 bg-primary-100 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-700',
    executing: 'text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700',
    completed: 'text-green-700 dark:text-green-300 bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700',
    cancelled: 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700',
  };
  return colors[status] || 'text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700';
}

export function getStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: '待执行',
    executing: '执行中',
    completed: '已完成',
    cancelled: '已取消',
  };
  return labels[status] || status;
}

export function calculateExecuteTime(
  timeType: 'absolute' | 'relative',
  absoluteDate: string,
  absoluteTime: string,
  relativeValue: number,
  relativeUnit: 'minutes' | 'hours'
): number {
  if (timeType === 'absolute') {
    const dateTime = new Date(`${absoluteDate}T${absoluteTime}`);
    return Math.floor(dateTime.getTime() / 1000);
  } else {
    const now = new Date();
    const future = relativeUnit === 'hours' 
      ? addHours(now, relativeValue)
      : addMinutes(now, relativeValue);
    return Math.floor(future.getTime() / 1000);
  }
}

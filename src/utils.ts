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
    pending: 'text-blue-600 bg-blue-50',
    executing: 'text-orange-600 bg-orange-50',
    completed: 'text-green-600 bg-green-50',
    cancelled: 'text-gray-600 bg-gray-50',
  };
  return colors[status] || 'text-gray-600 bg-gray-50';
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

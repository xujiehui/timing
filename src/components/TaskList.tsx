import { Task } from '../types';
import { useStore } from '../store';
import { formatDateTime, formatRemainingTime, getActionLabel, getStatusColor, getStatusLabel } from '../utils';
import { X, Clock, Calendar, Timer } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const { cancelTask } = useStore();

  const handleCancel = async (taskId: string) => {
    if (confirm('确定要取消这个任务吗？')) {
      await cancelTask(taskId);
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center py-16 animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 dark:bg-primary-900/30 mb-4">
          <Clock className="text-primary-600 dark:text-primary-400" size={40} />
        </div>
        <p className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-2">
          暂无任务
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-500">
          请在上方创建一个新的定时任务
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          className="group flex items-center justify-between p-5 bg-white/50 dark:bg-gray-700/30 border-2 border-gray-200/50 dark:border-gray-600/50 rounded-xl hover:border-primary-300 dark:hover:border-primary-600 hover:shadow-soft-lg transition-all duration-200 animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="px-3 py-1.5 bg-gradient-primary rounded-lg">
                <span className="text-base font-bold text-white">
                  {getActionLabel(task.action)}
                </span>
              </div>
              <span
                className={`px-3 py-1 text-xs font-semibold rounded-lg ${getStatusColor(task.status)}`}
              >
                {getStatusLabel(task.status)}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                <Calendar size={16} className="text-primary-500" />
                <span>执行时间：<span className="font-medium text-gray-800 dark:text-gray-200">{formatDateTime(task.execute_at)}</span></span>
              </div>
              {task.status === 'pending' && (
                <div className="flex items-center gap-2 text-sm">
                  <Timer size={16} className="text-primary-500 animate-pulse-soft" />
                  <span className="text-gray-600 dark:text-gray-400">剩余时间：</span>
                  <span className="font-bold text-lg text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/30 px-3 py-1 rounded-lg">
                    {formatRemainingTime(task.remaining_seconds)}
                  </span>
                </div>
              )}
            </div>
          </div>
          {task.status === 'pending' && (
            <button
              onClick={() => handleCancel(task.id)}
              className="ml-4 p-3 text-red-600 dark:text-red-400 hover:text-white hover:bg-red-500 dark:hover:bg-red-600 rounded-xl transition-all duration-200 hover:scale-110 active:scale-95 shadow-soft hover:shadow-lg"
              title="取消任务"
            >
              <X size={20} />
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

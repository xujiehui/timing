import { Task } from '../types';
import { useStore } from '../store';
import { formatDateTime, formatRemainingTime, getActionLabel, getStatusColor, getStatusLabel } from '../utils';
import { X } from 'lucide-react';

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
      <div className="text-center py-12 text-gray-500 dark:text-gray-400">
        暂无任务，请创建一个新任务
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">
                {getActionLabel(task.action)}任务
              </span>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(task.status)}`}
              >
                {getStatusLabel(task.status)}
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <div>执行时间：{formatDateTime(task.execute_at)}</div>
              {task.status === 'pending' && (
                <div className="mt-1">
                  剩余时间：<span className="font-medium text-blue-600 dark:text-blue-400">
                    {formatRemainingTime(task.remaining_seconds)}
                  </span>
                </div>
              )}
            </div>
          </div>
          {task.status === 'pending' && (
            <button
              onClick={() => handleCancel(task.id)}
              className="ml-4 p-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
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

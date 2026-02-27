import { useState } from 'react';
import { useStore } from '../store';
import { TaskFormData, ActionType } from '../types';
import { calculateExecuteTime } from '../utils';
import { Power, RotateCw, Moon, HardDrive, Lock } from 'lucide-react';

const actionOptions: { value: ActionType; label: string; icon: any }[] = [
  { value: 'shutdown', label: '关机', icon: Power },
  { value: 'restart', label: '重启', icon: RotateCw },
  { value: 'sleep', label: '睡眠', icon: Moon },
  { value: 'hibernate', label: '休眠', icon: HardDrive },
  { value: 'lock', label: '锁定', icon: Lock },
];

export default function TaskForm() {
  const { createTask } = useStore();
  const [formData, setFormData] = useState<TaskFormData>({
    action: 'shutdown',
    timeType: 'relative',
    absoluteDate: new Date().toISOString().split('T')[0],
    absoluteTime: '23:00',
    relativeValue: 30,
    relativeUnit: 'minutes',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const executeAt = calculateExecuteTime(
        formData.timeType,
        formData.absoluteDate,
        formData.absoluteTime,
        formData.relativeValue,
        formData.relativeUnit
      );

      await createTask(formData.action, executeAt);
      
      // 重置表单
      setFormData({
        action: 'shutdown',
        timeType: 'relative',
        absoluteDate: new Date().toISOString().split('T')[0],
        absoluteTime: '23:00',
        relativeValue: 30,
        relativeUnit: 'minutes',
      });
    } catch (error) {
      console.error('创建任务失败:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 操作类型选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          选择操作类型：
        </label>
        <div className="grid grid-cols-5 gap-3">
          {actionOptions.map((option) => {
            const Icon = option.icon;
            const isSelected = formData.action === option.value;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => setFormData({ ...formData, action: option.value })}
                className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon size={24} className="mb-2" />
                <span className="text-sm font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 时间类型选择 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          设置时间：
        </label>
        <div className="flex gap-4 mb-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="absolute"
              checked={formData.timeType === 'absolute'}
              onChange={(e) => setFormData({ ...formData, timeType: e.target.value as 'absolute' | 'relative' })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">绝对时间</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="relative"
              checked={formData.timeType === 'relative'}
              onChange={(e) => setFormData({ ...formData, timeType: e.target.value as 'absolute' | 'relative' })}
              className="mr-2"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">相对时间</span>
          </label>
        </div>

        {formData.timeType === 'absolute' ? (
          <div className="flex gap-4">
            <input
              type="date"
              value={formData.absoluteDate}
              onChange={(e) => setFormData({ ...formData, absoluteDate: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <input
              type="time"
              value={formData.absoluteTime}
              onChange={(e) => setFormData({ ...formData, absoluteTime: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        ) : (
          <div className="flex gap-4 items-center">
            <input
              type="number"
              min="1"
              value={formData.relativeValue}
              onChange={(e) => setFormData({ ...formData, relativeValue: parseInt(e.target.value) || 1 })}
              className="w-24 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <select
              value={formData.relativeUnit}
              onChange={(e) => setFormData({ ...formData, relativeUnit: e.target.value as 'minutes' | 'hours' })}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="minutes">分钟后</option>
              <option value="hours">小时后</option>
            </select>
          </div>
        )}
      </div>

      {/* 提交按钮 */}
      <button
        type="submit"
        disabled={loading}
        className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
      >
        {loading ? '创建中...' : '创建任务'}
      </button>
    </form>
  );
}

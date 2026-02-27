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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 操作类型选择 */}
      <div>
        <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">
          选择操作类型
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
                className={`group flex flex-col items-center justify-center p-5 rounded-xl border-2 transition-all duration-200 hover:scale-105 ${
                  isSelected
                    ? 'border-primary-500 bg-gradient-primary text-white shadow-primary'
                    : 'border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }`}
              >
                <Icon 
                  size={28} 
                  className={`mb-2 transition-transform duration-200 ${isSelected ? 'scale-110' : 'group-hover:scale-110'}`} 
                />
                <span className="text-sm font-semibold">{option.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 时间类型选择 */}
      <div>
        <label className="block text-base font-semibold text-gray-800 dark:text-gray-200 mb-4">
          设置时间
        </label>
        <div className="flex gap-4 mb-5">
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              value="absolute"
              checked={formData.timeType === 'absolute'}
              onChange={(e) => setFormData({ ...formData, timeType: e.target.value as 'absolute' | 'relative' })}
              className="mr-2 w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-2 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              绝对时间
            </span>
          </label>
          <label className="flex items-center cursor-pointer group">
            <input
              type="radio"
              value="relative"
              checked={formData.timeType === 'relative'}
              onChange={(e) => setFormData({ ...formData, timeType: e.target.value as 'absolute' | 'relative' })}
              className="mr-2 w-4 h-4 text-primary-600 focus:ring-primary-500 focus:ring-2 cursor-pointer"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              相对时间
            </span>
          </label>
        </div>

        {formData.timeType === 'absolute' ? (
          <div className="flex gap-4">
            <input
              type="date"
              value={formData.absoluteDate}
              onChange={(e) => setFormData({ ...formData, absoluteDate: e.target.value })}
              className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-soft"
              required
            />
            <input
              type="time"
              value={formData.absoluteTime}
              onChange={(e) => setFormData({ ...formData, absoluteTime: e.target.value })}
              className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-soft"
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
              className="w-28 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-soft text-center font-semibold"
              required
            />
            <select
              value={formData.relativeUnit}
              onChange={(e) => setFormData({ ...formData, relativeUnit: e.target.value as 'minutes' | 'hours' })}
              className="flex-1 px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 shadow-soft font-medium"
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
        className="w-full px-6 py-4 bg-gradient-primary hover:bg-gradient-primary-hover disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-all duration-200 shadow-primary hover:shadow-primary-lg hover:scale-[1.02] active:scale-[0.98] disabled:hover:scale-100"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            创建中...
          </span>
        ) : (
          '创建任务'
        )}
      </button>
    </form>
  );
}
